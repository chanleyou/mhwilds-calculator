import type { BuffGroup, Weapon } from "@/types";

const DBGroup: Weapon[] = ["Dual Blades"];
const BowGroup: Weapon[] = ["Bow"];
const LightGroup: Weapon[] = ["Dual Blades", "Bow"];
const HeavyGroup: Weapon[] = ["Great Sword", "Hunting Horn"];
const BowgunGroup: Weapon[] = ["Light Bowgun", "Heavy Bowgun"];
const OthersGroup: Weapon[] = [
  "Sword and Shield",
  "Long Sword",
  "Hammer",
  "Switch Axe",
  "Charge Blade",
  "Insect Glaive",
  "Lance",
  "Gunlance",
];
// const NonBowgunGroup: Weapon[] = [
//   "Bow",
//   "Charge Blade",
//   "Dual Blades",
//   "Great Sword",
//   "Gunlance",
//   "Hammer",
//   "Hunting Horn",
//   "Insect Glaive",
//   "Lance",
//   "Long Sword",
//   "Switch Axe",
//   "Sword and Shield",
// ];

export const WeaponSkills: Record<string, BuffGroup> = {
  AttackBoost: {
    name: "Attack Boost",
    levels: [
      { name: "Attack Boost 1", attack: 3 },
      { name: "Attack Boost 2", attack: 5 },
      { name: "Attack Boost 3", attack: 7 },
      { name: "Attack Boost 4", attack: 8, attackMul: 1.02 },
      { name: "Attack Boost 5", attack: 9, attackMul: 1.04 },
    ],
  },
  ChargeMaster: {
    name: "Charge Master",
    levels: [
      {
        name: "Charge Master 1",
        meleeChargeEleMul: 1.15,
        rangedChargeEleMul: 1.05,
      },
      {
        name: "Charge Master 2",
        meleeChargeEleMul: 1.2,
        rangedChargeEleMul: 1.1,
      },
      {
        name: "Charge Master 3",
        meleeChargeEleMul: 1.25,
        rangedChargeEleMul: 1.15,
      },
    ],
  },
  Artillery: {
    name: "Artillery",
    levels: [
      {
        name: "Artillery 1",
        artilleryEle: 3,
        artilleryShellAttackMul: 1.05,
        artilleryAmmoAttackMul: 1.1,
      },
      {
        name: "Artillery 2",
        artilleryEle: 6,
        artilleryShellAttackMul: 1.1,
        artilleryAmmoAttackMul: 1.2,
      },
      {
        name: "Artillery 3",
        artilleryEle: 9,
        artilleryShellAttackMul: 1.15,
        artilleryAmmoAttackMul: 1.3,
      },
    ],
  },
  CriticalBoost: {
    name: "Critical Boost",
    levels: [
      { name: "Critical Boost 1", criticalBoost: 1.28 },
      { name: "Critical Boost 2", criticalBoost: 1.31 },
      { name: "Critical Boost 3", criticalBoost: 1.34 },
      { name: "Critical Boost 4", criticalBoost: 1.37 },
      { name: "Critical Boost 5", criticalBoost: 1.4 },
    ],
  },
  CriticalDraw: {
    name: "Critical Draw",
    levels: [
      { name: "Critical Draw 1", affinity: 50 },
      { name: "Critical Draw 2", affinity: 75 },
      { name: "Critical Draw 3", affinity: 100 },
    ],
  },
  CriticalElementLight: {
    name: "Critical Element",
    weapons: [
      "Long Sword",
      "Switch Axe",
      "Sword and Shield",
      "Dual Blades",
      "Lance",
      "Gunlance",
      "Charge Blade",
      "Insect Glaive",
      "Light Bowgun",
      "Bow",
    ],
    levels: [
      { name: "Critical Element 1", criticalElement: 1.05 },
      { name: "Critical Element 2", criticalElement: 1.1 },
      { name: "Critical Element 3", criticalElement: 1.15 },
    ],
  },
  CriticalElementHeavy: {
    name: "Critical Element",
    weapons: ["Great Sword", "Hunting Horn", "Hammer", "Heavy Bowgun"],
    levels: [
      { name: "Critical Element 1", criticalElement: 1.07 },
      { name: "Critical Element 2", criticalElement: 1.14 },
      { name: "Critical Element 3", criticalElement: 1.21 },
    ],
  },
  CriticalEye: {
    name: "Critical Eye",
    levels: [
      { name: "Critical Eye 1", affinity: 4 },
      { name: "Critical Eye 2", affinity: 8 },
      { name: "Critical Eye 3", affinity: 12 },
      { name: "Critical Eye 4", affinity: 16 },
      { name: "Critical Eye 5", affinity: 20 },
    ],
  },
  ElementAttack: {
    name: "Element Attack",
    levels: [
      { name: "Element Attack 1", element: 40 },
      { name: "Element Attack 2", element: 50, elementMul: 1.1 },
      { name: "Element Attack 3", element: 60, elementMul: 1.2 },
    ],
  },
  NormalShots: {
    name: "Normal Shots",
    levels: [{ name: "Normal Shots 1", normalShotsRawMul: 1.05 }],
  },
  OffensiveGuard: {
    name: "Offensive Guard",
    levels: [
      { name: "Offensive Guard 1", attackMul: 1.05 },
      { name: "Offensive Guard 2", attackMul: 1.1 },
      { name: "Offensive Guard 3", attackMul: 1.15 },
    ],
  },
  OpeningShot: {
    name: "Opening Shot",
    levels: [
      {
        name: "Opening Shot 1",
        attack: 5,
        bowgunOffset: true,
        elementMul: 1.1,
      },
      {
        name: "Opening Shot 2",
        attack: 10,
        bowgunOffset: true,
        elementMul: 1.1,
      },
      {
        name: "Opening Shot 3",
        attack: 15,
        bowgunOffset: true,
        elementMul: 1.1,
      },
    ],
  },
  PiercingShots: {
    name: "Piercing Shots",
    levels: [{ name: "Piercing Shots 1", piercingShotsRawMul: 1.05 }],
  },
  RapidFireUp: {
    name: "Rapid Fire Up",
    levels: [{ name: "Rapid Fire Up 1", rapidFireMul: 1.05 }],
  },
  SpecialAmmoBoost: {
    name: "Special Ammo Boost",
    levels: [
      { name: "Special Ammo Boost 1", specialAmmoBoostRawMul: 1.1 },
      { name: "Special Ammo Boost 2", specialAmmoBoostRawMul: 1.2 },
    ],
  },
  SpreadPowerShots: {
    name: "Spread/Power Shots",
    levels: [{ name: "Spread/Power Shots 1", spreadPowerShotsRawMul: 1.05 }],
  },
  TetradShot: {
    name: "Tetrad Shot",
    levels: [
      { name: "Tetrad Shot 1", affinity: 8 },
      {
        name: "Tetrad Shot 1 Attack",
        affinity: 8,
        attack: 3,
        bowgunOffset: true,
        elementMul: 1.05,
      },
      { name: "Tetrad Shot 2", affinity: 10 },
      {
        name: "Tetrad Shot 2 Attack",
        affinity: 10,
        attack: 6,
        bowgunOffset: true,
        elementMul: 1.05,
      },
      { name: "Tetrad Shot 3", affinity: 12 },
      {
        name: "Tetrad Shot 3 Attack",
        affinity: 12,
        attack: 10,
        bowgunOffset: true,
        elementMul: 1.05,
      },
    ],
  },
};

export const ArmorSkills: Record<string, BuffGroup> = {
  AdrenalineRush: {
    name: "Adrenaline Rush",
    levels: [
      { name: "Adrenaline Rush 1", attack: 10 },
      { name: "Adrenaline Rush 2", attack: 15 },
      { name: "Adrenaline Rush 3", attack: 20 },
      { name: "Adrenaline Rush 4", attack: 25 },
      { name: "Adrenaline Rush 5", attack: 30 },
    ],
  },
  Agitator: {
    name: "Agitator",
    levels: [
      { name: "Agitator 1", attack: 4, affinity: 3 },
      { name: "Agitator 2", attack: 8, affinity: 5 },
      { name: "Agitator 3", attack: 12, affinity: 7 },
      { name: "Agitator 4", attack: 16, affinity: 10 },
      { name: "Agitator 5", attack: 20, affinity: 15 },
    ],
  },
  Ambush: {
    name: "Ambush",
    levels: [
      { name: "Ambush 1", attackMul: 1.05 },
      { name: "Ambush 2", attackMul: 1.1 },
      { name: "Ambush 3", attackMul: 1.15 },
    ],
  },
  Antivirus: {
    name: "Antivirus",
    levels: [
      { name: "Antivirus 1", frenzy: { affinity: 3 } },
      { name: "Antivirus 2", frenzy: { affinity: 6 } },
      { name: "Antivirus 3", frenzy: { affinity: 10 } },
    ],
  },
  BurstDB: {
    name: "Burst",
    weapons: DBGroup,
    levels: [
      { name: "Burst 1", attack: 8, element: 40 },
      { name: "Burst 2", attack: 10, element: 60 },
      { name: "Burst 3", attack: 12, element: 80 },
      { name: "Burst 4", attack: 15, element: 100 },
      { name: "Burst 5", attack: 18, element: 120 },
    ],
  },
  BurstBow: {
    name: "Burst",
    weapons: BowGroup,
    levels: [
      { name: "Burst 1", attack: 6, element: 40 },
      { name: "Burst 2", attack: 7, element: 60 },
      { name: "Burst 3", attack: 8, element: 80 },
      { name: "Burst 4", attack: 9, element: 100 },
      { name: "Burst 5", attack: 10, element: 120 },
    ],
  },
  BurstBowgun: {
    name: "Burst",
    weapons: BowgunGroup,
    levels: [
      { name: "Burst 1", attack: 6 },
      { name: "Burst 2", attack: 7 },
      { name: "Burst 3", attack: 8 },
      { name: "Burst 4", attack: 9 },
      { name: "Burst 5", attack: 10 },
    ],
  },
  BurstHeavy: {
    name: "Burst",
    weapons: HeavyGroup,
    levels: [
      { name: "Burst 1", attack: 10, element: 80 },
      { name: "Burst 2", attack: 12, element: 100 },
      { name: "Burst 3", attack: 14, element: 120 },
      { name: "Burst 4", attack: 16, element: 160 },
      { name: "Burst 5", attack: 18, element: 200 },
    ],
  },
  BurstOthers: {
    name: "Burst",
    weapons: OthersGroup,
    levels: [
      { name: "Burst 1", attack: 8, element: 60 },
      { name: "Burst 2", attack: 10, element: 80 },
      { name: "Burst 3", attack: 12, element: 100 },
      { name: "Burst 4", attack: 15, element: 120 },
      { name: "Burst 5", attack: 18, element: 140 },
    ],
  },
  CoalescenceLight: {
    name: "Coalescence",
    weapons: [
      "Long Sword",
      "Dual Blades",
      "Sword and Shield",
      "Lance",
      "Insect Glaive",
      "Bow",
    ],
    levels: [
      { name: "Coalescence 1", elementMul: 1.05 },
      { name: "Coalescence 2", elementMul: 1.1 },
      { name: "Coalescence 3", elementMul: 1.15 },
    ],
  },
  CoalescenceHeavy: {
    name: "Coalescence",
    weapons: [
      "Great Sword",
      "Hammer",
      "Hunting Horn",
      "Gunlance",
      "Switch Axe",
      "Charge Blade",
      "Light Bowgun",
      "Heavy Bowgun",
    ],
    levels: [
      { name: "Coalescence 1", elementMul: 1.1 },
      { name: "Coalescence 2", elementMul: 1.2 },
      { name: "Coalescence 3", elementMul: 1.3 },
    ],
  },
  ConvertElement: {
    name: "Convert Element",
    levels: [
      { name: "Convert Element 1", element: 80 },
      { name: "Convert Element 2", element: 120 },
      { name: "Convert Element 3", element: 180 },
    ],
  },
  Counterstrike: {
    name: "Counterstrike",
    levels: [
      { name: "Counterstrike 1", attack: 10 },
      { name: "Counterstrike 2", attack: 15 },
      { name: "Counterstrike 3", attack: 25 },
    ],
  },
  ElementalAbsorptionLight: {
    name: "Elemental Absorption",
    weapons: LightGroup,
    levels: [
      { name: "Elemental Absorption 1", element: 30 },
      { name: "Elemental Absorption 1+", element: 40 },
      { name: "Elemental Absorption 1++", element: 50 },
      { name: "Elemental Absorption 2", element: 40 },
      { name: "Elemental Absorption 2+", element: 50 },
      { name: "Elemental Absorption 2++", element: 60 },
      { name: "Elemental Absorption 3", element: 50 },
      { name: "Elemental Absorption 3+", element: 60 },
      { name: "Elemental Absorption 3++", element: 70 },
    ],
  },
  ElementalAbsorptionHeavy: {
    name: "Elemental Absorption",
    weapons: HeavyGroup,
    levels: [
      { name: "Elemental Absorption 1", element: 50 },
      { name: "Elemental Absorption 1+", element: 60 },
      { name: "Elemental Absorption 1++", element: 70 },
      { name: "Elemental Absorption 2", element: 80 },
      { name: "Elemental Absorption 2+", element: 90 },
      { name: "Elemental Absorption 2++", element: 100 },
      { name: "Elemental Absorption 3", element: 100 },
      { name: "Elemental Absorption 3+", element: 110 },
      { name: "Elemental Absorption 3++", element: 120 },
    ],
  },
  ElementalAbsorptionOthers: {
    name: "Elemental Absorption",
    weapons: [...OthersGroup, ...BowgunGroup],
    levels: [
      { name: "Elemental Absorption 1", element: 40 },
      { name: "Elemental Absorption 1+", element: 50 },
      { name: "Elemental Absorption 1++", element: 60 },
      { name: "Elemental Absorption 2", element: 50 },
      { name: "Elemental Absorption 2+", element: 60 },
      { name: "Elemental Absorption 2++", element: 70 },
      { name: "Elemental Absorption 3", element: 60 },
      { name: "Elemental Absorption 3+", element: 70 },
      { name: "Elemental Absorption 3++", element: 80 },
    ],
  },
  Foray: {
    name: "Foray",
    levels: [
      { name: "Foray 1", attack: 6 },
      { name: "Foray 2", attack: 8, affinity: 5 },
      { name: "Foray 3", attack: 10, affinity: 10 },
      { name: "Foray 4", attack: 12, affinity: 15 },
      { name: "Foray 5", attack: 15, affinity: 20 },
    ],
  },
  Heroics: {
    name: "Heroics",
    levels: [
      { name: "Heroics 1" },
      { name: "Heroics 2", attackMul: 1.05 },
      { name: "Heroics 3", attackMul: 1.05 },
      { name: "Heroics 4", attackMul: 1.1 },
      { name: "Heroics 5", attackMul: 1.3 },
    ],
  },
  LatentPower: {
    name: "Latent Power",
    levels: [
      { name: "Latent Power 1", affinity: 10 },
      { name: "Latent Power 2", affinity: 20 },
      { name: "Latent Power 3", affinity: 30 },
      { name: "Latent Power 4", affinity: 40 },
      { name: "Latent Power 5", affinity: 50 },
    ],
  },
  MaximumMight: {
    name: "Maximum Might",
    levels: [
      { name: "Maximum Might 1", affinity: 10 },
      { name: "Maximum Might 2", affinity: 20 },
      { name: "Maximum Might 3", affinity: 30 },
    ],
  },
  PeakPerformance: {
    name: "Peak Performance",
    levels: [
      { name: "Peak Performance 1", attack: 3 },
      { name: "Peak Performance 2", attack: 6 },
      { name: "Peak Performance 3", attack: 10 },
      { name: "Peak Performance 4", attack: 15 },
      { name: "Peak Performance 5", attack: 20 },
    ],
  },
  Resentment: {
    name: "Resentment",
    levels: [
      { name: "Resentment 1", attack: 5 },
      { name: "Resentment 2", attack: 10 },
      { name: "Resentment 3", attack: 15 },
      { name: "Resentment 4", attack: 20 },
      { name: "Resentment 5", attack: 25 },
    ],
  },
  WeaknessExploit: {
    name: "Weakness Exploit",
    levels: [
      {
        name: "Weakness Exploit 1",
        weakness: { affinity: 5 },
        wound: { affinity: 3 },
      },
      {
        name: "Weakness Exploit 2",
        weakness: { affinity: 10 },
        wound: { affinity: 5 },
      },
      {
        name: "Weakness Exploit 3",
        weakness: { affinity: 15 },
        wound: { affinity: 10 },
      },
      {
        name: "Weakness Exploit 4",
        weakness: { affinity: 20 },
        wound: { affinity: 15 },
      },
      {
        name: "Weakness Exploit 5",
        weakness: { affinity: 30 },
        wound: { affinity: 20 },
      },
    ],
  },
};

export const SetSkills: Record<string, BuffGroup> = {
  DoshagumasMight: {
    name: "Doshaguma's Might",
    levels: [
      { name: "Powerhouse I", attack: 10 },
      { name: "Powerhouse II", attack: 25 },
    ],
  },
  EbonyOdogaronsPower: {
    name: "Ebony Odogaron's Power",
    levels: [
      { name: "Burst Boost I", attack: 3 },
      { name: "Burst Boost II", attack: 10 },
    ],
  },
  GoreMagalasTyranny: {
    name: "Gore Magala's Tyranny",
    levels: [
      { name: "Black Eclipse I" },
      { name: "Black Eclipse II", attack: 10, frenzy: { attack: 5 } },
    ],
  },
  JinDahaadsRevolt: {
    name: "Jin Dahaad's Revolt",
    levels: [
      { name: "Binding Counter I", attack: 25 },
      { name: "Binding Counter II", attack: 50 },
    ],
  },
  LordsFury: {
    name: "Lord's Fury",
    levels: [{ name: "Lords Fury I", attack: 10 }],
  },
  XuWusVigor: {
    name: "Xu Wu's Vigor",
    levels: [
      { name: "Protein Fiend I", attack: 15 },
      { name: "Protein Fiend II", attack: 25 },
    ],
  },
};
