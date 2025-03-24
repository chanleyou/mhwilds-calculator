import { ArtianType, BuffGroup, Sharpness, Shelling } from "@/types";
import { ArmorSkills, GroupSkills, WeaponSkills } from "./skills";

export const WeaponTypes = [
  "Sword and Shield",
  "Dual Blades",
  "Great Sword",
  "Long Sword",
  "Hammer",
  "Hunting Horn",
  "Lance",
  "Gunlance",
  "Switch Axe",
  "Charge Blade",
  "Insect Glaive",
  "Light Bowgun",
  "Heavy Bowgun",
  "Bow",
] as const;

export const Sharpnesses = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "White",
  "Purple",
  "Ranged",
] as const;

export const SharpnessRaw: { [K in Sharpness]: number } = {
  Red: 0.5,
  Orange: 0.75,
  Yellow: 1,
  Green: 1.05,
  Blue: 1.2,
  White: 1.32,
  Purple: 1.39,
  Ranged: 1,
} as const;

export const SharpnessEle: { [K in Sharpness]: number } = {
  Red: 0.25,
  Orange: 0.5,
  Yellow: 0.75,
  Green: 1,
  Blue: 1.0625,
  White: 1.15,
  Purple: 1.25,
  Ranged: 1,
} as const;

export const getSharpness = (n?: number[]): Sharpness => {
  if (!n) return "Ranged";
  let index = 0;
  for (let i = 1; i < n.length; i++) {
    if (n[i] > 0) index = i;
    else break;
  }

  const s = Sharpnesses[index];
  return s;
};
export const getSharpnessRaw = (n?: number[]) => SharpnessRaw[getSharpness(n)];
export const getSharpnessEle = (n?: number[]) => SharpnessEle[getSharpness(n)];

export const WeaponBuffs: Record<string, BuffGroup> = {
  BowCoating: {
    name: "Coating",
    weapons: ["Bow"],
    levels: [
      { name: "Power Coating", coatingRawMul: 1.3, rawMul: 1.3 },
      { name: "Close Range Coating", coatingRawMul: 1.4, rawMul: 1.3 },
    ],
  },
  ChargeBladeShieldElement: {
    name: "Shield: Element Boost",
    weapons: ["Charge Blade"],
    levels: [
      {
        name: "Shield: Element Boost",
        cbShieldElement: true,
        axeRawMul: 1.1,
        impactPhialMul: 1.2,
        elePhialMul: 1.3,
      },
    ],
  },
  DualBladesDemonBoost: {
    name: "Demon Boost",
    weapons: ["Dual Blades"],
    levels: [
      { name: "Demon Boost", attackMul: 1.2, demonBoost: true, eleMul: 1.2 },
    ],
  },
  HornSelfImprovement: {
    name: "Self-Improvement",
    weapons: ["Hunting Horn"],
    levels: [{ name: "Self-Improvement", attackMul: 1.2 }],
  },
  KinsectExtracts: {
    name: "Extracts",
    weapons: ["Insect Glaive"],
    levels: [
      { name: "Red + White", attackMul: 1.1 },
      { name: "Red + White + Yellow", attackMul: 1.15 },
    ],
  },
  SpiritGauge: {
    name: "Spirit Gauge",
    weapons: ["Long Sword"],
    levels: [
      { name: "White", attackMul: 1.025 },
      { name: "Yellow", attackMul: 1.05 },
      { name: "Red", attackMul: 1.1 },
    ],
  },
  SwitchAxePhial: {
    name: "Phial Type",
    weapons: ["Switch Axe"],
    levels: [
      { name: "Power Phial", saPhial: "Power" },
      { name: "Element Phial", saPhial: "Element" },
    ],
  },
  SwitchAxePowerAxe: {
    name: "Power Axe",
    weapons: ["Switch Axe"],
    levels: [{ name: "Power Axe", powerAxe: true }],
  },
};

export const Buffs: Record<string, BuffGroup> = {
  Powercharm: {
    name: "Powercharm",
    levels: [{ name: "Powercharm", attack: 6 }],
  },
  Frenzy: {
    name: "Overcame Frenzy",
    levels: [{ name: "Overcame Frenzy", affinity: 15 }],
  },
  DemonPowder: {
    name: "Demon Powder",
    levels: [{ name: "Demon Powder", attack: 10 }],
  },
};

export const FieldBuffs: Record<string, BuffGroup> = {
  Food: {
    name: "Food",
    levels: [
      { name: "Food Attack +2", attack: 2 },
      { name: "Food Attack +5", attack: 5 },
    ],
  },
  Demondrug: {
    name: "Demondrug",
    levels: [
      { name: "Demondrug", attack: 5 },
      { name: "Mega Demondrug", attack: 7 },
    ],
  },
  MightSeedPill: {
    name: "Might Seed / Pill",
    levels: [
      { name: "Might Seed", attack: 10 },
      { name: "Might Pill", attack: 25 },
    ],
  },
  CorruptedMantle: {
    name: "Corrupted Mantle",
    levels: [{ name: "Corrupted Mantle", attackMul: 1.1, affinity: 30 }],
  },
};

export const HuntingHornBuffs: Record<string, BuffGroup> = {
  HornAttackUp: {
    name: "Attack Up",
    levels: [
      { name: "Attack Up (S)", attackMul: 1.05 },
      { name: "Attack Up (L)", attackMul: 1.1 },
    ],
  },
  HornElementUp: {
    name: "Elem Attack Boost",
    levels: [{ name: "Elem Attack Up", elementMul: 1.1 }],
  },
  HornAffinityUp: {
    name: "Affinity Up",
    levels: [{ name: "Affinity Up", affinity: 15 }],
  },
  HornEchoBubble: {
    name: "Echo Bubble",
    levels: [{ name: "Attack & Affinity Up", attackMul: 1.1, affinity: 25 }],
  },
};

// TODO: make TypeScript complain if two buffs share a key
export const CombinedBuffs: Record<string, BuffGroup> = {
  ...Buffs,
  ...WeaponBuffs,
  ...WeaponSkills,
  ...ArmorSkills,
  ...GroupSkills,
  ...FieldBuffs,
  ...HuntingHornBuffs,
};

export const ArtianTypeToGunlanceShellType: {
  [K in ArtianType]: Shelling["type"];
} = {
  ["Non-Element"]: "Normal",
  Fire: "Normal",
  Water: "Long",
  Thunder: "Long",
  Dragon: "Long",
  Ice: "Normal",
  Poison: "Wide",
  Paralysis: "Wide",
  Sleep: "Normal",
  Blast: "Wide",
} as const;
