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
  bowgunOffset?: boolean;
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
  tetrad?: BuffValues;
};

export type BuffGroup = {
  name: string;
  toggle?: boolean;
  description?: string;
  weapons?: Weapon[];
  levels: Buff[];
};

export type SkillGroup = {
  toggle?: boolean;
  description?: string;
  levels: Record<number, Buff>;
};

export type WeaponGroup = {
  weapons: Weapon[];
  levels: Record<number, Buff>;
};

export type SkillWeaponGroup = {
  toggle?: boolean;
  description?: string;
  groups: WeaponGroup[];
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

export const isSkillGroup = (
  s: SkillGroup | SkillWeaponGroup,
): s is SkillGroup => {
  return "levels" in s;
};

export const getSkillLevels = (s: SkillGroup | SkillWeaponGroup) => {
  return "levels" in s ? s.levels : s.groups[0].levels;
};

// TODO
export type Skill = string;
export type ArmorType = "Helm" | "Body" | "Arms" | "Waist" | "Legs";

export type SlotLevel = 0 | 1 | 2 | 3 | 4;

export type SkillRecord = Record<Skill, 1 | 2 | 3 | 4>;

export type Armor = {
  id: number;
  type: ArmorType;
  name: string;
  skills: SkillRecord;
  slots: [SlotLevel, SlotLevel, SlotLevel];
  groupSkill?: Skill;
  seriesSkill?: Skill;
};

export type Decoration = {
  id: string | number;
  name: string;
  level: 1 | 2 | 3 | 4;
  skills: SkillRecord;
  type: "Weapon" | "Equipment";
};

export type Charm = {
  id: string | number;
  name: string;
  skills: SkillRecord;
};

export type Slots = [Decoration?, Decoration?, Decoration?];

export const ComboModeOptions = ["Dynamic", "Snapshot"] as const;
export type ComboModeOption = (typeof ComboModeOptions)[number];
