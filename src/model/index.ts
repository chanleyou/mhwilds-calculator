import { sharpnessEle, sharpnessRaw } from "@/data";
import { Attack, Buff, BuffValues, ComputedStore, isBowgun } from "@/types";

export const sum = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a ? sum + a : sum), 0);
};

export const mul = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a !== undefined ? sum * a : sum), 1);
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
  multipliers: number[] = [],
  bonuses: number[] = [],
): number => {
  return round(base * mul(...multipliers) + sum(...bonuses));
};

const get = (k: keyof BuffValues, n: number, b?: BuffValues) => {
  return b ? (b[k] ?? n) : n;
};

const getAttack = (b?: BuffValues) => get("attack", 0, b);
const getAttackMul = (b?: BuffValues) => get("attackMul", 1, b);
const getAffinity = (b?: BuffValues) => get("affinity", 0, b);
const getElement = (b?: BuffValues) => get("element", 0, b);
const getElementMul = (b?: BuffValues) => get("elementMul", 1, b);

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

type RawHitParams = Attack &
  Partial<ComputedStore> & {
    rawHzv: number;
  };
export const calculateRawHit = ({
  weapon,
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
  attack = 0, // TODO: refactor to remove ambiguity with uiAttack?
  uiAttack = attack,
  artilleryShellAttack = uiAttack,
  artilleryAmmoAttack = uiAttack,
  shelling,
  swordAttack = uiAttack,
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
    ignoreSharpness ? 1 : sharpnessRaw[sharpness],
    rawMul,
    weapon === "Bow" && !ignoreCoating && coatingRawMul ? coatingRawMul : 1,
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
  weapon,
  uiElement,
  sharpness = "Ranged",
  eleHzv,
  ignoreSharpness,
  fixedEle,
  rawEle = 0,
  eleMul,
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

  if (isBowgun(weapon) && rawEle) {
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
    ignoreSharpness ? 1 : sharpnessEle[sharpness],
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
