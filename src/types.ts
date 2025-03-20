import { Sharpnesses, Weapons } from "@/data";
import { InitialStore, useGetters } from "./store";

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
  cbShieldElement?: boolean;
  saPhial?: "Power" | "Element";
  powerAxe?: boolean;
  meleeChargeEleMul?: number;
  rangedChargeEleMul?: number;
  coatingRawMul?: number;
  artilleryShellAttackMul?: number; // base attack multiplier
  artilleryEle?: number; // bonus fixed fire damage
  normalShotsRawMul?: number;
  piercingShotsRawMul?: number;
  spreadPowerShotsRawMul?: number;
  specialAmmoBoostRawMul?: number;
  artilleryAmmoAttackMul?: number;
  rapidFireMul?: number;
  demonBoost?: boolean;
  bowgunOffset?: boolean;
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
  name: string;
  mv: number;
  rawMul?: number;
  eleMul?: number;
  fixedEle?: number;
  eleHzvCap?: number;
  rawEle?: number;
  ignoreHzv?: boolean; // only applies to raw hitzone
  cantCrit?: boolean;
  ignoreSharpness?: boolean;
  cbAxe?: boolean;
  cbPhial?: boolean;
  saType?: "Sword" | "Axe"; // Switch Axe mode
  charge?: boolean; // Charge Master
  ignoreCoating?: boolean; // ignore Bow Coating
  total?: boolean;
  hits?: number;
  shelling?: boolean;
  normalShot?: boolean;
  piercingShot?: boolean;
  spreadPowerShot?: boolean;
  specialAmmo?: boolean;
  artilleryAmmo?: boolean;
  rapidFire?: boolean;
  airborne?: boolean; // TODO
};

export type ComputedStore = InitialStore & ReturnType<typeof useGetters>;

export type SnapshotAttack = {
  name: string;
  hit: number;
  crit: number;
  avg: number;
  cantCrit?: boolean;
};

export const isRanged = (weapon?: Weapon) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};

export const isBowgun = (weapon?: Weapon) => {
  return weapon === "Light Bowgun" || weapon === "Heavy Bowgun";
};
