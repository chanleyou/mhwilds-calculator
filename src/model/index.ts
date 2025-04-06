import { produce } from "immer";
import { getSharpness, getSharpnessEle, getSharpnessRaw } from "@/data";
import {
  Attack,
  Buff,
  BuffValues,
  ElementType,
  MeleeWeapon,
  RawType,
  StatusType,
  Target,
  Weapon,
  isBowgunElementAmmo,
} from "@/types";

export const sum = (...args: (number | undefined | false)[]) => {
  return args.reduce<number>(
    (sum, a) => (a !== undefined && a !== false ? sum + a : sum),
    0,
  );
};

export const mul = (...args: (number | undefined | false)[]) => {
  return args.reduce<number>(
    (sum, a) => (a !== undefined && a !== false ? sum * a : sum),
    1,
  );
};

export const _round = (value: number, places = 1) => {
  const p = 10 ** places;
  return Number((Math.round(value * p) / p).toFixed(places));
};

export const round = (value: number, places = 1) => {
  return _round(_round(value, places + 5), places); // hacky way to fix javascript rounding errors
};

export const dmg = (n: number) => {
  if (n > 0 && n < 1) return 1;
  return round(n);
};

export const calculate = (
  base: number,
  multipliers: (number | undefined | false)[] = [],
  bonuses: (number | undefined | false)[] = [],
): number => {
  return round(base * mul(...multipliers) + sum(...bonuses));
};

const get = (
  k: keyof Omit<BuffValues, "bowgunOffset">,
  n: number,
  b?: BuffValues,
) => {
  return b ? (b[k] ?? n) : n;
};

const getAttack = (b?: BuffValues) => get("attack", 0, b);
const getAttackMul = (b?: BuffValues) => get("attackMul", 1, b);
const getAffinity = (b?: BuffValues) => get("affinity", 0, b);
const getElement = (b?: BuffValues) => get("element", 0, b);
const getElementMul = (b?: BuffValues) => get("elementMul", 1, b);
const getStatus = (b?: BuffValues) => get("status", 0, b);
const getStatusMul = (b?: BuffValues) => get("statusMul", 1, b);

export const calculateAffinity = ({
  affinity,
  buffs = {},
  target,
  rawType,
}: {
  affinity: number;
  buffs?: Record<string, Buff>;
  target: Target;
  rawType: RawType;
}) => {
  const bonuses: (number | undefined)[] = [];

  Object.values(buffs).forEach((b) => {
    if (buffs.Frenzy) bonuses.push(b?.frenzy?.affinity);
    if (buffs.Wet) bonuses.push(b?.wet?.affinity);
    if (buffs.Bubbleblight) bonuses.push(b?.bubbleblight?.affinity);
  });

  const n = sum(
    affinity,
    ...Object.values(buffs).map((b) =>
      sum(
        getAffinity(b),
        target[rawType] >= 45 ? getAffinity(b.weakness) : 0,
        target.wound ? getAffinity(b.wound) : 0,
      ),
    ),
    ...bonuses,
  );

  return n > 0 ? Math.min(n, 100) : Math.max(n, -100);
};

export const calculateAverage = (
  hit: number,
  crit: number,
  affinity: number,
) => {
  const a = Math.abs(affinity) / 100;
  const avg = crit * a + (1 - a) * hit;
  return round(avg, 2);
};

export const calculateAttack = (
  base: number,
  buffs: Record<string, Buff | undefined>,
  multipliers: (number | undefined | false)[] = [],
  bonuses: (number | undefined | false)[] = [],
) => {
  Object.values(buffs).forEach((b) => {
    if (buffs.Frenzy) {
      multipliers.push(b?.frenzy?.attackMul);
      bonuses.push(b?.frenzy?.attack);
    }
    if (buffs.Burst) {
      bonuses.push(b?.burst?.attack);
    }
  });

  return calculate(
    base,
    [...Object.values(buffs).map(getAttackMul), ...multipliers],
    [...Object.values(buffs).map(getAttack), ...bonuses],
  );
};

export const calculateElement = (
  base: number | undefined,
  type: ElementType,
  buffs: Record<string, Buff | undefined>,
  multipliers: (number | undefined | false)[] = [],
  bonuses: number[] = [],
  saElementPhial?: boolean,
) => {
  if (!base) return 0;

  buffs = produce(buffs, (d) => {
    Object.entries(d).forEach(([k, v]) => {
      if (!v || (v.elementType && v.elementType !== type)) delete d[k];
    });
  });

  if (buffs.Frenzy) {
    Object.values(buffs).forEach((b) => {
      multipliers.push(b?.frenzy?.elementMul);
    });
  }

  let cap = Math.max(base + 350, base * 1.9);
  if (saElementPhial) cap += base * 0.45;

  return Math.min(
    cap,
    calculate(
      base,
      [...Object.values(buffs).map(getElementMul), ...multipliers],
      [...Object.values(buffs).map(getElement), ...bonuses],
    ),
  );
};

export const calculateStatus = (
  base: number | undefined,
  type: StatusType,
  buffs: Record<string, Buff | undefined>,
  multipliers: (number | undefined | false)[] = [],
  bonuses: number[] = [],
) => {
  if (!base) return 0;

  buffs = produce(buffs, (d) => {
    Object.entries(d).forEach(([k, v]) => {
      if (!v || v.statusType !== type) delete d[k];
    });
  });

  return calculate(
    base,
    [...Object.values(buffs).map(getStatusMul), ...multipliers],
    [...Object.values(buffs).map(getStatus), ...bonuses],
  );
};

export const calculateRawHit = (
  weapon: Weapon,
  eBuffs: Record<string, Buff | undefined>,
  atk: Attack,
  hitzone: Target,
) => {
  if (atk.fixedRaw) return atk.fixedRaw;

  const buffs = { ...eBuffs };

  const rawType = atk.rawType ?? "Slash";

  const multipliers = [];
  const bonuses = [];
  if (atk.saType === "Axe" && buffs.SwitchAxePowerAxe?.powerAxe) {
    bonuses.push(10);
  }
  if (atk.saType === "Sword" && weapon.phial === "Power") {
    multipliers.push(1.17);
  }

  if (atk.morph && buffs["Rapid Morph"]) {
    multipliers.push(buffs["Rapid Morph"].morphAttackMul);
  }

  if (hitzone[rawType] < 45 && !atk.ignoreHzv) {
    multipliers.push(buffs["Mind's Eye"]?.rawMul);
  }

  if (buffs.Bludgeoner) {
    const { sharpnesses, bludgeonerAttackMul } = buffs.Bludgeoner;
    if (sharpnesses?.some((s) => s === getSharpness(weapon.sharpness))) {
      multipliers.push(bludgeonerAttackMul);
    }
  }

  if (atk.airborne) {
    multipliers.push(buffs.Airborne?.airAttackMul);
  }
  if (atk.noExtract) {
    delete buffs.KinsectExtracts;
  }
  if (atk.shelling) {
    multipliers.push(buffs.Artillery?.artilleryShellAttackMul);
  }
  if (atk.artilleryAmmo) {
    multipliers.push(buffs.Artillery?.artilleryAmmoAttackMul);
  }

  const attack = calculateAttack(weapon.attack, buffs, multipliers, bonuses);

  return mul(
    attack,
    atk.mv / 100,
    atk.ignoreHzv ? 1 : hitzone[rawType] / 100,
    atk.rawMul ?? 1,
    atk.ignoreSharpness ? 1 : getSharpnessRaw(weapon.sharpness),
    !atk.ignoreCoating && buffs.BowCoating?.rawMul,
    atk.spreadPowerShot && buffs["Spread/Power Shots"]?.rawMul,
    atk.specialAmmo && buffs["Special Ammo Boost"]?.rawMul,
    atk.normalShot && buffs["Normal Shots"]?.rawMul,
    atk.rapidFire && buffs["Rapid Fire Up"]?.rawMul,
    atk.piercingShot && buffs["Piercing Shots"]?.rawMul,
    atk.cbAxe && buffs.ChargeBladeShieldElement?.axeRawMul,
    atk.cbPhial && buffs.ChargeBladeShieldElement?.impactPhialMul,
  );
};

export const calculateEleHit = (
  weapon: Weapon,
  buffs: Record<string, Buff | undefined>,
  atk: Attack,
  hitzone: Target,
) => {
  const elementType = atk.elementType ?? weapon.element?.type;
  if (!elementType) return 0;

  let eleHzv = hitzone[elementType];
  eleHzv = atk.eleHzvCap ? Math.min(eleHzv, atk.eleHzvCap) : eleHzv;
  eleHzv = eleHzv / 100;

  if (atk.fixedEle) {
    const bonusEle = atk.shelling ? (buffs.Artillery?.artilleryEle ?? 0) : 0;
    return mul(sum(atk.fixedEle, bonusEle), eleHzv);
  }

  const multipliers = [];

  if (atk.saType === "Sword" && weapon.phial === "Element") {
    multipliers.push(1.45);
  }

  if (atk.saType === "Axe" && weapon.phial === "Dragon") {
    return 0;
  }

  if (atk.charge) {
    multipliers.push(buffs["Charge Master"]?.eleMul);
  }

  if (isBowgunElementAmmo(atk)) {
    const bowgunOffset = Object.values(buffs).reduce((acc, b) => {
      if (b?.bowgunOffset) return acc + (b.attack ?? 0);
      return acc;
    }, 0);

    const bowgunAttack = calculateAttack(
      weapon.attack,
      buffs,
      [],
      [-bowgunOffset],
    );
    const value = mul(
      bowgunAttack,
      atk.rawEle / 10,
      atk.rapidFire && buffs["Rapid Fire Up"]?.rawMul,
    );

    weapon = {
      ...weapon,
      element: { value, type: atk.elementType },
    };
  }

  if (!weapon.element) return 0;

  const uiElement = calculateElement(
    weapon.element.value,
    weapon.element.type,
    buffs,
    multipliers,
  );

  return mul(
    uiElement,
    0.1,
    eleHzv,
    atk.eleMul ?? 1,
    atk.ignoreSharpness ? 1 : getSharpnessEle(weapon.sharpness),
    // atk.charge && buffs["Charge Master"]?.eleMul,
    buffs.DualBladesDemonBoost?.eleMul,
    atk.cbPhial && buffs.ChargeBladeShieldElement?.elePhialMul,
  );
};

export const calculateHit = (
  weapon: Weapon,
  buffs: Record<string, Buff>,
  atk: Attack,
  target: Target,
) => {
  const r = calculateRawHit(weapon, buffs, atk, target);
  const e = calculateEleHit(weapon, buffs, atk, target);
  return round(dmg(r) + dmg(e));
};

export const calculateCrit = (
  weapon: Weapon,
  buffs: Record<string, Buff>,
  atk: Attack,
  target: Target,
  critMulti: number,
  eleCritMulti: number,
) => {
  const r = calculateRawHit(weapon, buffs, atk, target);
  const e = calculateEleHit(weapon, buffs, atk, target);
  return round(dmg(r * critMulti) + dmg(e * eleCritMulti));
};

export const calculateHandicraft = (weapon: MeleeWeapon, level: number) => {
  let points = level * 10;

  const w = produce(weapon, (d) => {
    let baseIndex = d.sharpness.reduce<number>(
      (acc, n, i) => (n > 0 ? i : acc),
      0,
    );
    let bonusIndex = 0;

    while (points > 0) {
      if (bonusIndex > 3) break;
      const limit = d.handicraft[bonusIndex];

      const bonus = points > limit ? limit : points;

      d.sharpness[baseIndex] += bonus;
      points -= bonus;

      if (bonus == limit) {
        baseIndex += 1;
        bonusIndex += 1;
      }
    }
  });

  return w.sharpness;
};
