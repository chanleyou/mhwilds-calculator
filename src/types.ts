import { Sharpnesses, Weapons } from "@/data";

export type Weapon = (typeof Weapons)[number];
export type Sharpness = (typeof Sharpnesses)[number];

export type BuffValues = {
  attack?: number;
  attackMul?: number;
  affinity?: number;
  element?: number;
  elementMul?: number;
};

export type Buff = BuffValues & {
  name?: string;
  criticalBoost?: number;
  criticalElement?: number;
  frenzy?: BuffValues;
  weakness?: BuffValues;
  wound?: BuffValues;
  saPowerPhial?: boolean;
  saElementPhial?: boolean;
  meleeChargeEleMul?: number;
  rangedChargeEleMul?: number;
  coatingRawMul?: number;
};

export type BuffGroup = {
  name: string;
  description?: string;
  weapons?: Weapon[];
  levels: Buff[];
};

export type WeaponFlags = {
  saPowerPhial?: boolean;
  saElementPhial?: boolean;
};

export type Attack = {
  name?: string;
  mv: number;
  rawMul?: number;
  eleMul?: number;
  fixedEle?: number;
  rawEle?: number;
  ignoreHzv?: boolean;
  cantCrit?: boolean;
  ignoreSharpness?: boolean;
  sword?: boolean; // Switch Axe Phial
  charge?: boolean; // Charge Master
  total?: boolean;
  hits?: number;
};

export const isRanged = (weapon: Weapon) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};

export const isBowgun = (weapon: Weapon) => {
  return weapon === "Light Bowgun" || weapon === "Heavy Bowgun";
};
