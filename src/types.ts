import { Sharpnesses, WeaponTypes } from "@/data";
import { InitialStore, useGetters } from "@/store/store";

export const RawTypes = ["Slash", "Blunt", "Shot"] as const;
export type RawType = (typeof RawTypes)[number];

export const ElementTypes = [
  "Dragon",
  "Fire",
  "Ice",
  "Thunder",
  "Water",
] as const;
export type ElementType = (typeof ElementTypes)[number];

export const StatusTypes = ["Blast", "Paralysis", "Poison", "Sleep"] as const;
export type StatusType = (typeof StatusTypes)[number];

export const isElementType = (t?: string): t is ElementType => {
  return ElementTypes.includes(t as ElementType);
};

export const isStatusType = (t?: string): t is StatusType => {
  return StatusTypes.includes(t as StatusType);
};

export type SwitchAxePhialType =
  | "Dragon"
  | "Element"
  | "Exhaust"
  | "Paralysis"
  | "Poison"
  | "Power";

export type ChargeBladePhialType = "Impact" | "Element";

export type WeaponSharpness = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type Handicraft = [number, number, number, number];

export type Shelling = {
  type: "Normal" | "Wide" | "Long";
  level: number;
};

export const AmmoTypes = [
  "Normal",
  "Pierce",
  "Spread",
  "Slicing",
  "Sticky",
  "Cluster",
  "Thunder",
  "Flaming",
  "Water",
  "Freeze",
  "Dragon",
  "Wyvern",
] as const;
export type AmmoType = (typeof AmmoTypes)[number];

export const BowCoatings = [
  "Power",
  "Close-range",
  "Pierce",
  "Exhaust",
  "Blast",
  "Poison",
  "Paralysis",
  "Sleep",
] as const;
export type BowCoating = (typeof BowCoatings)[number];

export type BowgunAmmo = {
  levels: number[];
  rapidFire?: boolean;
};

export type BowgunAmmoLevels = Partial<Record<AmmoType, BowgunAmmo>>;

export interface IWeapon extends Equip {
  type: WeaponType;
  rarity?: number;
  attack: number;
  affinity: number;
  element?: { type: ElementType; value: number };
  status?: { type: StatusType; value: number };
  statusType?: StatusType;
  sharpness?: WeaponSharpness;
  handicraft?: Handicraft;
  slots: [SlotLevel, SlotLevel, SlotLevel];
  artian?: { element: number; status: number }; // if 3 matching
  phial?: SwitchAxePhialType | ChargeBladePhialType;
  shelling?: Shelling;
  ammo?: BowgunAmmoLevels;
  coatings?: BowCoating[];
  songs?: HuntingHornSong[];
}

export const HuntingHornSongs = [
  "Attack Up (S)",
  "Attack Up (L)",
  "Health Recovery (S)",
  "Health Rec. (M) + Antidote",
  "Health Recovery (L)",
  "Recovery Speed (S)",
  "Recovery Speed (L)",
  "Stamina Use Reduced (L)",
  "Defense Up (S)",
  "Defense Up (L)",
  "Attack/Defense Up (S)",
  "Elem Attack Boost",
  "Status Attack Up",
  "Earplugs (S)",
  "Earplugs (L)",
  "Affinity Up/Health Recovery",
  "Aquatic/Oilsilt Mobility",
  "Envir. Damage Negated",
  "Knockback Negated",
  "All Ailments Negated",
  "Divine Protection",
  "Fire Res(L)",
  "Ice Res (L)",
  "Thunder Res (L)",
  "Water Res (L)",
  "Dragon Res (L)",
  "Tremors Negated",
  "Paralysis Negated",
  "Blight Negated",
  "Stun Negated",
  "Wind Pressure Negated",
  "All Wind Pressure Negated",
  "Extend All Melodies",
  "Restore Sharpness",
  "Sonic Waves",
  "Sonic Barrier",
  "Echo Wave (Blunt)",
  "Echo Wave (Slash)",
  "Echo Wave (Fire)",
  "Echo Wave (Ice)",
  "Echo Wave (Thunder)",
  "Echo Wave (Water)",
  "Echo Wave (Dragon)",
  "Echo Wave (Blast)",
  "Echo Wave (Paralysis)",
  "Echo Wave (Poison)",
  "Echo Wave (Sleep)",
  "Offset Melody",
  "Resounding Melody",
  "Melody of Life",
] as const;

type HuntingHornSong = (typeof HuntingHornSongs)[number];

export interface MeleeWeapon extends IWeapon {
  sharpness: WeaponSharpness;
  handicraft: Handicraft;
}

export type Bow = IWeapon & { type: "Bow"; coatings: BowCoating[] };
export type Bowgun = IWeapon & {
  type: "Light Bowgun" | "Heavy Bowgun";
  ammo: BowgunAmmoLevels;
};

export type ChargeBlade = MeleeWeapon & { phial: ChargeBladePhialType };
export type Gunlance = MeleeWeapon & { shelling: Shelling };
export type SwitchAxe = MeleeWeapon & { phial: SwitchAxePhialType };
export type HuntingHorn = MeleeWeapon & { songs: HuntingHornSong[] };

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
  status?: number;
  statusMul?: number;
  bowgunOffset?: boolean;
};

export type Buff = BuffValues & {
  name?: string;
  description?: string;
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
  elementType?: ElementType;
  statusType?: StatusType;
  airAttackMul?: number;
  airAttackMulHalf?: number;
};

export type BuffGroup = {
  name: string;
  toggle?: boolean;
  description?: string;
  weapons?: WeaponType[];
  levels: Buff[];
};

export type SkillTwo = {
  toggle?: boolean;
  description?: string;
  levels: Record<number, Buff>;
};

export type GroupSkill = {
  toggle?: boolean;
  description?: string;
  levels: { [3]: Buff };
};

export type SeriesSkill = {
  toggle?: boolean;
  description?: string;
  levels: { [2]: Buff; [4]: Buff };
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

export interface IAttack {
  name: string;
  mv: number;
  rawMul?: number;
  eleMul?: number;
  fixedEle?: number;
  fixedRaw?: number;
  eleHzvCap?: number;
  rawEle?: number;
  rawType?: RawType; // optional, default to Slash
  elementType?: ElementType;
  ignoreHzv?: boolean; // only applies to raw hitzone
  cantCrit?: boolean;
  ignoreSharpness?: boolean;
  cbAxe?: boolean;
  cbPhial?: boolean;
  saType?: "Sword" | "Axe"; // Switch Axe mode
  charge?: boolean; // Charge Master
  ignoreCoating?: boolean; // ignore Bow Coating
  hits?: number;
  shelling?: Partial<Shelling>;
  normalShot?: boolean;
  piercingShot?: boolean;
  spreadPowerShot?: boolean;
  specialAmmo?: boolean;
  artilleryAmmo?: boolean;
  rapidFire?: boolean;
  airborne?: boolean; // TODO
  noExtract?: boolean;
  ammo?: {
    type: AmmoType;
    level: number;
  };
  melody?: boolean;
}

export type BowgunElementAmmo = IAttack & {
  rawEle: number;
  elementType: ElementType;
};

export type Attack = BowgunElementAmmo | IAttack;

export const isBowgunElementAmmo = (
  attack: Attack,
): attack is BowgunElementAmmo => {
  return "rawEle" in attack && "elementType" in attack;
};

export type ComputedStore = InitialStore & ReturnType<typeof useGetters>;

export type DynamicAttack = IAttack & {
  count: number;
};

export type SnapshotAttack = {
  name: string;
  hit: number;
  crit: number;
  avg: number;
  cantCrit?: boolean;
  count: number;
};

export const isRanged = (weapon?: WeaponType) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};

export const isBowgun = (weapon?: WeaponType) => {
  return weapon === "Light Bowgun" || weapon === "Heavy Bowgun";
};

export const isWeaponBowgun = (weapon?: Weapon): weapon is Bowgun => {
  return isBowgun(weapon?.type) && "ammo" in weapon;
};

export const isSkillGroup = (s: SkillTwo | SkillWeaponGroup): s is SkillTwo => {
  return "levels" in s;
};

export const getSkillLevels = (s: SkillTwo | SkillWeaponGroup) => {
  return "levels" in s ? s.levels : s.groups[0].levels;
};

// TODO
export type Skill = string;
export type ArmorType = "Helm" | "Body" | "Arms" | "Waist" | "Legs";

export type SlotLevel = 0 | 1 | 2 | 3 | 4;

export interface Equip {
  name: string;
  skills: Record<Skill, number>;
}

export type Armor = Equip & {
  id: number;
  type: ArmorType;
  slots: [SlotLevel, SlotLevel, SlotLevel];
  groupSkill?: Skill;
  seriesSkill?: Skill;
};

export type Decoration = Equip & {
  id: string | number;
  level: 1 | 2 | 3 | 4;
  type: "Weapon" | "Equipment";
};

export type Charm = Equip & {
  id: string | number;
};

export type Slots = [Decoration?, Decoration?, Decoration?];

export const ComboModeOptions = ["Dynamic", "Snapshot"] as const;
export type ComboModeOption = (typeof ComboModeOptions)[number];

export type BuffName = string;
export type Flag = "TetradAttack" | "TetradAffinity";

export const isMeleeWeapon = (weapon: Weapon): weapon is MeleeWeapon => {
  return "sharpness" in weapon && "handicraft" in weapon;
};

export const isGunlance = (weapon: Weapon): weapon is Gunlance => {
  return "shelling" in weapon;
};

export const ArtianTypeOptions = [
  "No Element",
  ...ElementTypes,
  ...StatusTypes,
] as const;
export type ArtianType = (typeof ArtianTypeOptions)[number];

export const ArtianInfusionOptions = ["Attack", "Affinity"] as const;
export type ArtianInfusion = (typeof ArtianInfusionOptions)[number];

export const ArtianUpgradeOptions = [
  "Attack",
  "Affinity",
  "Element",
  "Sharpness",
  "Ammo",
] as const;
export type ArtianUpgrade = (typeof ArtianUpgradeOptions)[number];

export type Artian = {
  element: ArtianType;
  infusions: [ArtianInfusion?, ArtianInfusion?, ArtianInfusion?];
  upgrades: [
    ArtianUpgrade?,
    ArtianUpgrade?,
    ArtianUpgrade?,
    ArtianUpgrade?,
    ArtianUpgrade?,
  ];
};

export type Target = { wound: boolean } & Hitzone;

export type Hitzone = Record<RawType | ElementType, number>;
