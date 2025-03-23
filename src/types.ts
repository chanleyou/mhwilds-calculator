import { Sharpnesses, WeaponTypes } from "@/data";
import { InitialStore, useGetters } from "./store";

export type ElementType = "Dragon" | "Fire" | "Ice" | "Thunder" | "Water";
export type StatusType = "Blast" | "Paralysis" | "Poison" | "Sleep";

export type SwitchAxePhialType =
  | "Dragon"
  | "Element"
  | "Exhaust"
  | "Paralysis"
  | "Poison"
  | "Power";

export type ChargeBladePhialType = "Impact" | "Element";

export interface IWeapon extends Equip {
  type: WeaponType;
  name: string;
  rarity?: number;
  attack: number;
  affinity: number;
  element: number;
  elementType?: ElementType;
  status?: number;
  statusType?: StatusType;
  sharpness?: number[];
  handicraft?: number[];
  slots: [SlotLevel, SlotLevel, SlotLevel];
  artian?: boolean;
  phial?: SwitchAxePhialType | ChargeBladePhialType;
}

export interface MeleeWeapon extends IWeapon {
  sharpness: number[];
  handicraft: number[];
}

export type Bow = IWeapon & { type: "Bow" };
export type Bowgun = IWeapon & { type: "Light Bowgun" | "Heavy Bowgun" };

export type ChargeBlade = MeleeWeapon & { phial: ChargeBladePhialType };
export type Gunlance = MeleeWeapon & {
  shellType: "Normal" | "Wide" | "Long";
  shellLevel: number;
};
export type SwitchAxe = MeleeWeapon & {
  phial: SwitchAxePhialType;
};

export type Weapon =
  | Bow
  | Bowgun
  | ChargeBlade
  | Gunlance
  | SwitchAxe
  | MeleeWeapon;

export type WeaponType = (typeof WeaponTypes)[number];
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
  normalShotsRawMul?: number; // TODO: deprecate these
  piercingShotsRawMul?: number;
  spreadPowerShotsRawMul?: number;
  specialAmmoBoostRawMul?: number;
  artilleryAmmoAttackMul?: number;
  rapidFireMul?: number;
  demonBoost?: boolean;
  tetrad?: BuffValues;
  handicraft?: number;
  rawMul?: number;
  eleMul?: number;
  axeRawMul?: number;
  impactPhialMul?: number;
  elePhialMul?: number;
  chargeEleMul?: number;
};

export type BuffGroup = {
  name: string;
  toggle?: boolean;
  description?: string;
  weapons?: WeaponType[];
  levels: Buff[];
};

export type SkillGroup = {
  toggle?: boolean;
  description?: string;
  levels: Record<number, Buff>;
};

export type WeaponGroup = {
  weapons: WeaponType[];
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

export const isRanged = (weapon?: WeaponType) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};

export const isBowgun = (weapon?: WeaponType) => {
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

export interface Equip {
  skills: Record<Skill, number>;
}

export type Armor = Equip & {
  id: number;
  type: ArmorType;
  name: string;
  slots: [SlotLevel, SlotLevel, SlotLevel];
  groupSkill?: Skill;
  seriesSkill?: Skill;
};

export type Decoration = Equip & {
  id: string | number;
  name: string;
  level: 1 | 2 | 3 | 4;
  type: "Weapon" | "Equipment";
};

export type Charm = Equip & {
  id: string | number;
  name: string;
};

export type Slots = [Decoration?, Decoration?, Decoration?];

export const ComboModeOptions = ["Dynamic", "Snapshot"] as const;
export type ComboModeOption = (typeof ComboModeOptions)[number];

export type Target = {
  rawHzv: number;
  eleHzv: number;
  wound: boolean;
};

export type BuffName = string;
export type Flag = "TetradAttack" | "TetradAffinity";
