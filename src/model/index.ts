import { produce } from "immer";
import {
  SharpnessEle,
  SharpnessRaw,
  getSharpnessEle,
  getSharpnessRaw,
} from "@/data";
import {
  Attack,
  Buff,
  BuffValues,
  ComputedStore,
  ElementType,
  MeleeWeapon,
  RawType,
  StatusType,
  Target,
  Weapon,
  isBowgunElementAmmo,
} from "@/types";

export const sum = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a ? sum + a : sum), 0);
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
  bonuses: number[] = [],
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

// TODO: refactor to insert buffs based on attack
export const calculateAttack = ({
  attack,
  buffs = {},
  frenzy,
}: {
  attack: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
}) => {
  return calculate(
    attack,
    Object.values(buffs).map(getAttackMul),
    Object.values(buffs).map((b) => {
      return sum(getAttack(b), frenzy ? getAttack(b.frenzy) : 0);
    }),
  );
};

export const calculateElement = ({
  element,
  buffs = {},
  frenzy,
  saElementPhial,
}: {
  element: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
  saElementPhial?: boolean;
}) => {
  if (element === 0) return 0;
  let cap = Math.max(element + 350, element * 1.9);
  if (saElementPhial) cap += element * 0.45;

  return Math.min(
    calculate(
      element,
      Object.values(buffs).map((b) => {
        return mul(getElementMul(b), frenzy ? getElementMul(b.frenzy) : 1);
      }),
      Object.values(buffs).map(getElement),
    ),
    cap,
  );
};

export const calculateBowgunElement = ({
  element,
  buffs = {},
  frenzy,
}: {
  element: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
}): { base: number; bonus: number } => {
  const base = calculate(
    element,
    Object.values(buffs).map((b) => {
      return mul(getElementMul(b), frenzy ? getElementMul(b.frenzy) : 1);
    }),
    [],
  );

  const bonus = calculate(0, [], Object.values(buffs).map(getElement));

  return { base, bonus };
};

export const calculateAffinity = ({
  affinity,
  buffs = {},
  frenzy,
  rawHzv = 0,
  isWound,
}: {
  affinity: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
  rawHzv?: number;
  isWound?: boolean;
}) => {
  const n = sum(
    affinity,
    ...Object.values(buffs).map((b) =>
      sum(
        getAffinity(b),
        frenzy ? getAffinity(b.frenzy) : 0,
        rawHzv >= 45 ? getAffinity(b.weakness) : 0,
        isWound ? getAffinity(b.wound) : 0,
      ),
    ),
  );

  return n > 0 ? Math.min(n, 100) : Math.max(n, -100);
};

export const calculateAffinityTwo = ({
  affinity,
  buffs = {},
  frenzy,
  target,
  rawType,
}: {
  affinity: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
  target: Target;
  rawType: RawType;
}) => {
  const n = sum(
    affinity,
    ...Object.values(buffs).map((b) =>
      sum(
        getAffinity(b),
        frenzy ? getAffinity(b.frenzy) : 0,
        target[rawType] >= 45 ? getAffinity(b.weakness) : 0,
        target.wound ? getAffinity(b.wound) : 0,
      ),
    ),
  );

  return n > 0 ? Math.min(n, 100) : Math.max(n, -100);
};

type RawHitParams = Attack &
  Partial<ComputedStore> & {
    rawHzv: number;
  };
export const calculateRawHit = ({
  attack = 0,
  uiAttack = attack,
  swordAttack = uiAttack,
  artilleryShellAttack = uiAttack,
  artilleryAmmoAttack = uiAttack,
  mv,
  ignoreHzv,
  rawHzv,
  ignoreSharpness,
  sharpness = "Ranged",
  rawMul,
  saType,
  cbAxe,
  cbPhial,
  cbShieldElement,
  coatingRawMul,
  shelling,
  powerAxe,
  ignoreCoating,
  normalShot,
  normalShotsRawMul,
  piercingShot,
  piercingShotsRawMul,
  spreadPowerShot,
  spreadPowerShotsRawMul,
  specialAmmo,
  artilleryAmmo,
  specialAmmoBoostRawMul,
  rapidFire,
  rapidFireMul,
}: RawHitParams) => {
  if (saType === "Sword") uiAttack = swordAttack;
  else if (saType === "Axe" && powerAxe) uiAttack += 10;
  else if (shelling) uiAttack = artilleryShellAttack;
  else if (artilleryAmmo) uiAttack = artilleryAmmoAttack;

  return mul(
    uiAttack,
    mv / 100,
    ignoreHzv ? 1 : rawHzv / 100,
    ignoreSharpness ? 1 : SharpnessRaw[sharpness],
    rawMul,
    !ignoreCoating && coatingRawMul ? coatingRawMul : 1,
    spreadPowerShot ? spreadPowerShotsRawMul : 1,
    specialAmmo ? specialAmmoBoostRawMul : 1,
    normalShot ? normalShotsRawMul : 1,
    piercingShot ? piercingShotsRawMul : 1,
    cbShieldElement && cbPhial ? 1.2 : 1,
    cbShieldElement && cbAxe ? 1.1 : 1,
    rapidFire ? rapidFireMul : 1,
  );
};

type EleHitParams = Attack &
  Partial<ComputedStore> & {
    eleHzv: number;
  };
export const calculateEleHit = ({
  uiElement,
  sharpness = "Ranged",
  eleHzv,
  ignoreSharpness,
  fixedEle,
  rawEle = 0,
  eleMul = 1,
  charge,
  chargeEleMul = 1,
  shelling,
  artilleryEle = 0,
  eleHzvCap,
  cbShieldElement,
  cbPhial,
  demonBoost,
  bowgunElement = { base: 0, bonus: 0 },
  saType,
  swordElement,
  rapidFire,
  rapidFireMul = 1,
}: EleHitParams) => {
  eleHzv = (eleHzvCap ? Math.min(eleHzv, eleHzvCap) : eleHzv) / 100;

  if (fixedEle) {
    const bonusEle = Math.min(shelling ? artilleryEle : 0, fixedEle);
    const e = sum(fixedEle, bonusEle);
    return mul(e, eleHzv);
  }

  if (rawEle) {
    const { base, bonus } = bowgunElement;
    uiElement = calculate(
      base,
      [rawEle / 10, rapidFire ? rapidFireMul : 1],
      [bonus],
    );
  }
  if (saType === "Sword" && swordElement) uiElement = swordElement;

  return mul(
    uiElement,
    0.1,
    eleHzv,
    ignoreSharpness ? 1 : SharpnessEle[sharpness],
    eleMul,
    charge ? chargeEleMul : 1,
    cbShieldElement && cbPhial ? 1.3 : 1,
    demonBoost ? 1.2 : 1,
  );
};

type HitParams = RawHitParams & EleHitParams;
export const calculateHit = (params: HitParams) => {
  const r = calculateRawHit(params);
  const e = calculateEleHit(params);
  return round(dmg(r) + dmg(e));
};

type CritParams = HitParams & {
  critMulti: number;
  eleCritMulti: number;
};
export const calculateCrit = (params: CritParams) => {
  const { critMulti, eleCritMulti } = params;
  const r = calculateRawHit(params);
  const e = calculateEleHit(params);
  return round(dmg(r * critMulti) + dmg(e * eleCritMulti));
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

export const calculateAttackTwo = (
  base: number,
  buffs: Record<string, Buff | undefined>,
  multipliers: (number | undefined | false)[] = [],
  bonuses: number[] = [],
) => {
  return calculate(
    base,
    [...Object.values(buffs).map(getAttackMul), ...multipliers],
    [...Object.values(buffs).map(getAttack), ...bonuses],
  );
};

export const calculateElementTwo = (
  base: number | undefined,
  type: ElementType,
  buffs: Record<string, Buff | undefined>,
  multipliers: (number | undefined | false)[] = [],
  bonuses: number[] = [],
  saElementPhial?: boolean,
) => {
  if (!base) return 0;
  let cap = Math.max(base + 350, base * 1.9);
  if (saElementPhial) cap += base * 0.45;

  buffs = produce(buffs, (d) => {
    Object.entries(d).forEach(([k, v]) => {
      if (!v || (v.elementType && v.elementType !== type)) delete d[k];
    });
  });

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

export const calculateRawHitTwo = (
  weapon: Weapon,
  buffs: Record<string, Buff | undefined>,
  atk: Attack,
  hitzone: Target,
) => {
  if (atk.fixedRaw) return atk.fixedRaw;

  const multipliers = [];
  const bonuses = [];
  if (atk.saType === "Axe" && buffs.SwitchAxePowerAxe?.powerAxe) {
    bonuses.push(10);
  }
  if (atk.saType === "Sword" && weapon.phial === "Power") {
    multipliers.push(1.17);
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

  const attack = calculateAttackTwo(weapon.attack, buffs, multipliers, bonuses);

  const rawType = atk.rawType ?? "Slash";

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

export const calculateEleHitTwo = (
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

  if (isBowgunElementAmmo(atk)) {
    const bowgunOffset = Object.values(buffs).reduce((acc, b) => {
      if (b?.bowgunOffset) return acc + (b.attack ?? 0);
      return acc;
    }, 0);

    const bowgunAttack = calculateAttackTwo(
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

  const uiElement = calculateElementTwo(
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
    atk.charge && buffs["Charge Master"]?.eleMul,
    buffs.DualBladesDemonBoost?.eleMul,
    atk.cbPhial && buffs.ChargeBladeShieldElement?.elePhialMul,
  );
};

export const calculateHitTwo = (
  weapon: Weapon,
  buffs: Record<string, Buff>,
  atk: Attack,
  target: Target,
) => {
  const r = calculateRawHitTwo(weapon, buffs, atk, target);
  const e = calculateEleHitTwo(weapon, buffs, atk, target);
  return round(dmg(r) + dmg(e));
};

export const calculateCritTwo = (
  weapon: Weapon,
  buffs: Record<string, Buff>,
  atk: Attack,
  target: Target,
  critMulti: number,
  eleCritMulti: number,
) => {
  const r = calculateRawHitTwo(weapon, buffs, atk, target);
  const e = calculateEleHitTwo(weapon, buffs, atk, target);
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
