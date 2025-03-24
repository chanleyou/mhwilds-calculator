import type {
  Buff,
  BuffGroup,
  GroupSkill,
  SeriesSkill,
  Skill,
  SkillTwo,
  SkillWeaponGroup,
  WeaponType,
} from "@/types";

const DBGroup: WeaponType[] = ["Dual Blades"];
const BowGroup: WeaponType[] = ["Bow"];
const LightGroup: WeaponType[] = ["Dual Blades", "Bow"];
const HeavyGroup: WeaponType[] = ["Great Sword", "Hunting Horn"];
const BowgunGroup: WeaponType[] = ["Light Bowgun", "Heavy Bowgun"];
const OthersGroup: WeaponType[] = [
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

const skill = (n: number) => ({
  levels: Array.from(Array(n).keys()).reduce(
    (acc, i) => {
      acc[i + 1] = {};
      return acc;
    },
    {} as Record<number, Buff>,
  ),
});

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
    levels: [{ name: "Piercing Shots 1", rawMul: 1.05 }],
  },
  RapidFireUp: {
    name: "Rapid Fire Up",
    levels: [{ name: "Rapid Fire Up 1", rawMul: 1.05 }],
  },
  SpecialAmmoBoost: {
    name: "Special Ammo Boost",
    levels: [
      { name: "Special Ammo Boost 1", rawMul: 1.1 },
      { name: "Special Ammo Boost 2", rawMul: 1.2 },
    ],
  },
  SpreadPowerShots: {
    name: "Spread/Power Shots",
    levels: [{ name: "Spread/Power Shots 1", rawMul: 1.05 }],
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

export const GroupSkills: Record<string, BuffGroup> = {
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

export const UnsupportedWeaponSkills: Record<Skill, SkillTwo> = {
  ["Airborne"]: skill(1),
  ["Ballistics"]: skill(3),
  ["Blast Functionality"]: skill(1),
  ["Bludgeoner"]: skill(3),
  ["Charge Up"]: skill(1),
  ["Critical Status"]: skill(3),
  ["Exhaust Functionality"]: skill(1),
  ["Focus"]: skill(3),
  ["Guard"]: skill(3),
  ["Guard Up"]: skill(3),
  ["Horn Maestro"]: skill(2),
  ["Load Shells"]: skill(2),
  ["Master's Touch"]: skill(1),
  ["Mind's Eye"]: skill(3),
  ["Para Functionality"]: skill(1),
  ["Poison Duration Up"]: skill(1),
  ["Poison Functionality"]: skill(1),
  ["Power Prolonger"]: skill(3),
  ["Protective Polish"]: skill(3),
  ["Rapid Morph"]: skill(3),
  ["Razor Sharp"]: skill(3),
  ["Sleep Functionality"]: skill(1),
  ["Slugger"]: skill(3),
  ["Speed Sharpening"]: skill(2),
  ["Stamina Thief"]: skill(3),
};

export const WeaponSkillsTwo: Record<Skill, SkillTwo | SkillWeaponGroup> = {
  ...UnsupportedWeaponSkills,
  ["Artillery"]: {
    levels: {
      1: {
        name: "Artillery 1",
        artilleryEle: 3,
        artilleryShellAttackMul: 1.05,
        artilleryAmmoAttackMul: 1.1,
      },
      2: {
        name: "Artillery 2",
        artilleryEle: 6,
        artilleryShellAttackMul: 1.1,
        artilleryAmmoAttackMul: 1.2,
      },
      3: {
        name: "Artillery 3",
        artilleryEle: 9,
        artilleryShellAttackMul: 1.15,
        artilleryAmmoAttackMul: 1.3,
      },
    },
  },
  ["Attack Boost"]: {
    levels: {
      1: { name: "Attack Boost 1", attack: 3 },
      2: { name: "Attack Boost 2", attack: 5 },
      3: { name: "Attack Boost 3", attack: 7 },
      4: { name: "Attack Boost 4", attack: 8, attackMul: 1.02 },
      5: { name: "Attack Boost 5", attack: 9, attackMul: 1.04 },
    },
  },
  ["Blast Attack"]: {
    levels: {
      1: { name: "Blast Attack 1", statusType: "Blast", status: 40 },
      2: {
        name: "Blast Attack 2",
        statusType: "Blast",
        status: 50,
        statusMul: 1.1,
      },
      3: {
        name: "Blast Attack 3",
        statusType: "Blast",
        status: 60,
        statusMul: 1.2,
      },
    },
  },
  ["Charge Master"]: {
    groups: [
      {
        weapons: ["Bow"],
        levels: {
          1: { chargeEleMul: 1.05 },
          2: { chargeEleMul: 1.1 },
          3: { chargeEleMul: 1.15 },
        },
      },
      {
        weapons: [
          "Charge Blade",
          "Dual Blades",
          "Great Sword",
          "Gunlance",
          "Hammer",
          "Heavy Bowgun",
          "Hunting Horn",
          "Insect Glaive",
          "Lance",
          "Light Bowgun",
          "Long Sword",
          "Switch Axe",
          "Sword and Shield",
        ],
        levels: {
          1: { chargeEleMul: 1.15 },
          2: { chargeEleMul: 1.2 },
          3: { chargeEleMul: 1.25 },
        },
      },
    ],
  },
  ["Critical Boost"]: {
    levels: {
      1: { name: "Critical Boost 1", criticalBoost: 1.28 },
      2: { name: "Critical Boost 2", criticalBoost: 1.31 },
      3: { name: "Critical Boost 3", criticalBoost: 1.34 },
      4: { name: "Critical Boost 4", criticalBoost: 1.37 },
      5: { name: "Critical Boost 5", criticalBoost: 1.4 },
    },
  },
  ["Critical Draw"]: {
    toggle: true,
    levels: {
      1: { name: "Critical Draw 1", affinity: 50 },
      2: { name: "Critical Draw 2", affinity: 75 },
      3: { name: "Critical Draw 3", affinity: 100 },
    },
  },
  ["Critical Element"]: {
    groups: [
      {
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
        levels: {
          1: { name: "Critical Element 1", criticalElement: 1.05 },
          2: { name: "Critical Element 2", criticalElement: 1.1 },
          3: { name: "Critical Element 3", criticalElement: 1.15 },
        },
      },
      {
        weapons: ["Great Sword", "Hunting Horn", "Hammer", "Heavy Bowgun"],
        levels: {
          1: { name: "Critical Element 1", criticalElement: 1.07 },
          2: { name: "Critical Element 2", criticalElement: 1.14 },
          3: { name: "Critical Element 3", criticalElement: 1.21 },
        },
      },
    ],
  },
  ["Critical Eye"]: {
    levels: {
      1: { name: "Critical Eye 1", affinity: 4 },
      2: { name: "Critical Eye 2", affinity: 8 },
      3: { name: "Critical Eye 3", affinity: 12 },
      4: { name: "Critical Eye 4", affinity: 16 },
      5: { name: "Critical Eye 5", affinity: 20 },
    },
  },
  ["Dragon Attack"]: {
    levels: {
      1: { name: "Dragon Attack 1", elementType: "Dragon", element: 40 },
      2: {
        name: "Dragon Attack 2",
        elementType: "Dragon",
        element: 50,
        elementMul: 1.1,
      },
      3: {
        name: "Dragon Attack 3",
        elementType: "Dragon",
        element: 60,
        elementMul: 1.2,
      },
    },
  },
  ["Fire Attack"]: {
    levels: {
      1: { name: "Fire Attack 1", elementType: "Fire", element: 40 },
      2: {
        name: "Fire Attack 2",
        elementType: "Fire",
        element: 50,
        elementMul: 1.1,
      },
      3: {
        name: "Fire Attack 3",
        elementType: "Fire",
        element: 60,
        elementMul: 1.2,
      },
    },
  },
  ["Handicraft"]: {
    levels: {
      1: { name: "Handicraft 1", handicraft: 10 },
      2: { name: "Handicraft 2", handicraft: 20 },
      3: { name: "Handicraft 3", handicraft: 30 },
      4: { name: "Handicraft 4", handicraft: 40 },
      5: { name: "Handicraft 5", handicraft: 50 },
    },
  },
  ["Ice Attack"]: {
    levels: {
      1: { name: "Element Attack 1", elementType: "Ice", element: 40 },
      2: {
        name: "Element Attack 2",
        elementType: "Ice",
        element: 50,
        elementMul: 1.1,
      },
      3: {
        name: "Element Attack 3",
        elementType: "Ice",
        element: 60,
        elementMul: 1.2,
      },
    },
  },
  ["Normal Shots"]: {
    levels: {
      1: { name: "Normal Shots 1", rawMul: 1.05 },
    },
  },
  ["Offensive Guard"]: {
    toggle: true,
    levels: {
      1: { name: "Offensive Guard 1", attackMul: 1.05 },
      2: { name: "Offensive Guard 2", attackMul: 1.1 },
      3: { name: "Offensive Guard 3", attackMul: 1.15 },
    },
  },
  ["Opening Shot"]: {
    toggle: true,
    levels: {
      1: {
        name: "Opening Shot 1",
        attack: 5,
        bowgunOffset: true,
        elementMul: 1.1,
      },
      2: {
        name: "Opening Shot 2",
        attack: 10,
        bowgunOffset: true,
        elementMul: 1.1,
      },
      3: {
        name: "Opening Shot 3",
        attack: 15,
        bowgunOffset: true,
        elementMul: 1.1,
      },
    },
  },
  ["Paralysis Attack"]: {
    levels: {
      1: { name: "Paralysis Attack 1", statusType: "Paralysis", status: 40 },
      2: {
        name: "Paralysis Attack 2",
        statusType: "Paralysis",
        status: 50,
        statusMul: 1.1,
      },
      3: {
        name: "Paralysis Attack 3",
        statusType: "Paralysis",
        status: 60,
        statusMul: 1.2,
      },
    },
  },
  ["Piercing Shots"]: {
    levels: {
      1: { name: "Piercing Shots 1", rawMul: 1.05 },
    },
  },
  ["Poison Attack"]: {
    levels: {
      1: { name: "Poison Attack 1", statusType: "Poison", status: 40 },
      2: {
        name: "Poison Attack 2",
        statusType: "Poison",
        status: 50,
        statusMul: 1.1,
      },
      3: {
        name: "Poison Attack 3",
        statusType: "Poison",
        status: 60,
        statusMul: 1.2,
      },
    },
  },
  ["Punishing Draw"]: {
    toggle: true,
    levels: {
      1: { attack: 3 },
      2: { attack: 5 },
      3: { attack: 7 },
    },
  },
  ["Rapid Fire Up"]: {
    levels: {
      1: { name: "Rapid Fire Up 1", rawMul: 1.05 },
    },
  },
  ["Sleep Attack"]: {
    levels: {
      1: { name: "Sleep Attack 1", statusType: "Sleep", status: 40 },
      2: {
        name: "Sleep Attack 2",
        statusType: "Sleep",
        status: 50,
        statusMul: 1.1,
      },
      3: {
        name: "Sleep Attack 3",
        statusType: "Sleep",
        status: 60,
        statusMul: 1.2,
      },
    },
  },
  ["Special Ammo Boost"]: {
    levels: {
      1: { name: "Special Ammo Boost 1", rawMul: 1.1 },
      2: { name: "Special Ammo Boost 2", rawMul: 1.2 },
    },
  },
  ["Spread/Power Shots"]: {
    levels: {
      1: { name: "Spread/Power Shots 1", rawMul: 1.05 },
    },
  },
  ["Tetrad Shot"]: {
    levels: {
      1: {
        name: "Tetrad Shot 1",
        tetrad: {
          affinity: 8,
          attack: 3,
          bowgunOffset: true,
          elementMul: 1.05,
        },
      },
      2: {
        name: "Tetrad Shot 2",
        tetrad: {
          affinity: 10,
          attack: 6,
          bowgunOffset: true,
          elementMul: 1.05,
        },
      },
      3: {
        name: "Tetrad Shot 3",
        tetrad: {
          affinity: 12,
          attack: 10,
          bowgunOffset: true,
          elementMul: 1.05,
        },
      },
    },
  },
  ["Thunder Attack"]: {
    levels: {
      1: { name: "Thunder Attack 1", elementType: "Thunder", element: 40 },
      2: {
        name: "Thunder Attack 2",
        elementType: "Thunder",
        element: 50,
        elementMul: 1.1,
      },
      3: {
        name: "Thunder Attack 3",
        elementType: "Thunder",
        element: 60,
        elementMul: 1.2,
      },
    },
  },
  ["Water Attack"]: {
    levels: {
      1: { name: "Water Attack 1", elementType: "Water", element: 40 },
      2: {
        name: "Water Attack 2",
        elementType: "Water",
        element: 50,
        elementMul: 1.1,
      },
      3: {
        name: "Water Attack 3",
        elementType: "Water",
        element: 60,
        elementMul: 1.2,
      },
    },
  },
};

export const UnsupportedArmorSkills: Record<Skill, SkillTwo> = {
  ["Adaptability"]: skill(2),
  ["Aquatic/Oilsilt Mobility"]: skill(2),
  ["Bind Resistance"]: skill(3),
  ["Blast Resistance"]: skill(3),
  ["Bleeding Resistance"]: skill(3),
  ["Blindsider"]: skill(1),
  ["Blight Resistance"]: skill(3),
  ["Bombardier"]: skill(3),
  ["Botanist"]: skill(4),
  ["Cliffhanger"]: skill(1),
  ["Constitution"]: skill(5),
  ["Defense Boost"]: skill(3),
  ["Divine Blessing"]: skill(3),
  ["Dragon Resistance"]: skill(3),
  ["Earplugs"]: skill(3),
  ["Entomologist"]: skill(1),
  ["Evade Extender"]: skill(3),
  ["Evade Window"]: skill(5),
  ["Fire Resistance"]: skill(3),
  ["Flayer"]: skill(5),
  ["Flinch Free"]: skill(3),
  ["Free Meal"]: skill(3),
  ["Geologist"]: skill(3),
  ["Hunger Resistance"]: skill(3),
  ["Ice Resistance"]: skill(3),
  ["Intimidator"]: skill(3),
  ["Iron Skin"]: skill(3),
  ["Item Prolonger"]: skill(3),
  ["Jump Master"]: skill(1),
  ["Leap of Faith"]: skill(1),
  ["Marathon Runner"]: skill(3),
  ["Mushroomancer"]: skill(3),
  ["Outdoorsman"]: skill(1),
  ["Palico Rally"]: skill(5),
  ["Paralysis Resistance"]: skill(3),
  ["Partbreaker"]: skill(3),
  ["Poison Resistance"]: skill(3),
  ["Quick Sheathe"]: skill(3),
  ["Recovery Speed"]: skill(3),
  ["Recovery Up"]: skill(3),
  ["Self-Improvement"]: skill(1),
  ["Shock Absorber"]: skill(1),
  ["Sleep Resistance"]: skill(3),
  ["Speed Eating"]: skill(3),
  ["Stamina Surge"]: skill(3),
  ["Stench Resistance"]: skill(2),
  ["Stun Resistance"]: skill(3),
  ["Survival Expert"]: skill(3),
  ["Thunder Resistance"]: skill(3),
  ["Tool Specialist"]: skill(5),
  ["Tremor Resistance"]: skill(3),
  ["Water Resistance"]: skill(3),
  ["Wide-Range"]: skill(5),
  ["Windproof"]: skill(3),
};

export const ArmorSkillsTwo: Record<Skill, SkillTwo | SkillWeaponGroup> = {
  ...UnsupportedArmorSkills,
  ["Adrenaline Rush"]: {
    toggle: true,
    levels: {
      1: { name: "Adrenaline Rush 1", attack: 10 },
      2: { name: "Adrenaline Rush 2", attack: 15 },
      3: { name: "Adrenaline Rush 3", attack: 20 },
      4: { name: "Adrenaline Rush 4", attack: 25 },
      5: { name: "Adrenaline Rush 5", attack: 30 },
    },
  },
  Agitator: {
    toggle: true,
    levels: {
      1: { name: "Agitator 1", attack: 4, affinity: 3 },
      2: { name: "Agitator 2", attack: 8, affinity: 5 },
      3: { name: "Agitator 3", attack: 12, affinity: 7 },
      4: { name: "Agitator 4", attack: 16, affinity: 10 },
      5: { name: "Agitator 5", attack: 20, affinity: 15 },
    },
  },
  Ambush: {
    toggle: true,
    levels: {
      1: { name: "Ambush 1", attackMul: 1.05 },
      2: { name: "Ambush 2", attackMul: 1.1 },
      3: { name: "Ambush 3", attackMul: 1.15 },
    },
  },
  Antivirus: {
    levels: {
      1: { name: "Antivirus 1", frenzy: { affinity: 3 } },
      2: { name: "Antivirus 2", frenzy: { affinity: 6 } },
      3: { name: "Antivirus 3", frenzy: { affinity: 10 } },
    },
  },
  Burst: {
    toggle: true,
    groups: [
      {
        weapons: ["Dual Blades"],
        levels: {
          1: { name: "Burst 1", attack: 8, element: 40 },
          2: { name: "Burst 2", attack: 10, element: 60 },
          3: { name: "Burst 3", attack: 12, element: 80 },
          4: { name: "Burst 4", attack: 15, element: 100 },
          5: { name: "Burst 5", attack: 18, element: 120 },
        },
      },
      {
        weapons: ["Bow"],
        levels: {
          1: { name: "Burst 1", attack: 6, element: 40 },
          2: { name: "Burst 2", attack: 7, element: 60 },
          3: { name: "Burst 3", attack: 8, element: 80 },
          4: { name: "Burst 4", attack: 9, element: 100 },
          5: { name: "Burst 5", attack: 10, element: 120 },
        },
      },
      {
        weapons: BowgunGroup,
        levels: {
          1: { name: "Burst 1", attack: 6 },
          2: { name: "Burst 2", attack: 7 },
          3: { name: "Burst 3", attack: 8 },
          4: { name: "Burst 4", attack: 9 },
          5: { name: "Burst 5", attack: 10 },
        },
      },
      {
        weapons: HeavyGroup,
        levels: {
          1: { name: "Burst 1", attack: 10, element: 80 },
          2: { name: "Burst 2", attack: 12, element: 100 },
          3: { name: "Burst 3", attack: 14, element: 120 },
          4: { name: "Burst 4", attack: 16, element: 160 },
          5: { name: "Burst 5", attack: 18, element: 200 },
        },
      },
      {
        weapons: OthersGroup,
        levels: {
          1: { name: "Burst 1", attack: 8, element: 60 },
          2: { name: "Burst 2", attack: 10, element: 80 },
          3: { name: "Burst 3", attack: 12, element: 100 },
          4: { name: "Burst 4", attack: 15, element: 120 },
          5: { name: "Burst 5", attack: 18, element: 140 },
        },
      },
    ],
  },
  Coalescence: {
    toggle: true,
    groups: [
      {
        weapons: [
          "Long Sword",
          "Dual Blades",
          "Sword and Shield",
          "Lance",
          "Insect Glaive",
          "Bow",
        ],
        levels: {
          1: { name: "Coalescence 1", statusMul: 1.05, elementMul: 1.05 },
          2: { name: "Coalescence 2", statusMul: 1.1, elementMul: 1.1 },
          3: { name: "Coalescence 3", statusMul: 1.15, elementMul: 1.15 },
        },
      },
      {
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
        levels: {
          1: { name: "Coalescence 1", statusMul: 1.05, elementMul: 1.05 },
          2: { name: "Coalescence 2", statusMul: 1.1, elementMul: 1.1 },
          3: { name: "Coalescence 3", statusMul: 1.15, elementMul: 1.15 },
        },
      },
    ],
  },
  ["Convert Element"]: {
    toggle: true,
    levels: {
      1: { name: "Convert Element 1", elementType: "Dragon", element: 80 },
      2: { name: "Convert Element 2", elementType: "Dragon", element: 120 },
      3: { name: "Convert Element 3", elementType: "Dragon", element: 180 },
    },
  },
  Counterstrike: {
    toggle: true,
    levels: {
      1: { name: "Counterstrike 1", attack: 10 },
      2: { name: "Counterstrike 2", attack: 15 },
      3: { name: "Counterstrike 3", attack: 25 },
    },
  },
  ["Elemental Absorption"]: {
    toggle: true,
    groups: [
      {
        weapons: LightGroup,
        levels: {
          1: { name: "Elemental Absorption 1", element: 30 },
          2: { name: "Elemental Absorption 2", element: 40 },
          3: { name: "Elemental Absorption 3", element: 50 },
        },
      },
      {
        weapons: HeavyGroup,
        levels: {
          1: { name: "Elemental Absorption 1", element: 50 },
          2: { name: "Elemental Absorption 2", element: 80 },
          3: { name: "Elemental Absorption 3", element: 100 },
        },
      },
      {
        weapons: [...OthersGroup, ...BowgunGroup],
        levels: {
          1: { name: "Elemental Absorption 1", element: 40 },
          2: { name: "Elemental Absorption 2", element: 50 },
          3: { name: "Elemental Absorption 3", element: 60 },
        },
      },
    ],
  },
  Foray: {
    toggle: true,
    levels: {
      1: { name: "Foray 1", attack: 6 },
      2: { name: "Foray 2", attack: 8, affinity: 5 },
      3: { name: "Foray 3", attack: 10, affinity: 10 },
      4: { name: "Foray 4", attack: 12, affinity: 15 },
      5: { name: "Foray 5", attack: 15, affinity: 20 },
    },
  },
  Heroics: {
    toggle: true,
    levels: {
      1: { name: "Heroics 1" },
      2: { name: "Heroics 2", attackMul: 1.05 },
      3: { name: "Heroics 3", attackMul: 1.05 },
      4: { name: "Heroics 4", attackMul: 1.1 },
      5: { name: "Heroics 5", attackMul: 1.3 },
    },
  },
  ["Latent Power"]: {
    toggle: true,
    levels: {
      1: { name: "Latent Power 1", affinity: 10 },
      2: { name: "Latent Power 2", affinity: 20 },
      3: { name: "Latent Power 3", affinity: 30 },
      4: { name: "Latent Power 4", affinity: 40 },
      5: { name: "Latent Power 5", affinity: 50 },
    },
  },
  ["Maximum Might"]: {
    toggle: true,
    levels: {
      1: { name: "Maximum Might 1", affinity: 10 },
      2: { name: "Maximum Might 2", affinity: 20 },
      3: { name: "Maximum Might 3", affinity: 30 },
    },
  },
  Resentment: {
    toggle: true,
    levels: {
      1: { name: "Resentment 1", attack: 5 },
      2: { name: "Resentment 2", attack: 10 },
      3: { name: "Resentment 3", attack: 15 },
      4: { name: "Resentment 4", attack: 20 },
      5: { name: "Resentment 5", attack: 25 },
    },
  },
  ["Weakness Exploit"]: {
    levels: {
      1: {
        name: "Weakness Exploit 1",
        weakness: { affinity: 5 },
        wound: { affinity: 3 },
      },
      2: {
        name: "Weakness Exploit 2",
        weakness: { affinity: 10 },
        wound: { affinity: 5 },
      },
      3: {
        name: "Weakness Exploit 3",
        weakness: { affinity: 15 },
        wound: { affinity: 10 },
      },
      4: {
        name: "Weakness Exploit 4",
        weakness: { affinity: 20 },
        wound: { affinity: 15 },
      },
      5: {
        name: "Weakness Exploit 5",
        weakness: { affinity: 30 },
        wound: { affinity: 20 },
      },
    },
  },
};

export const GroupSkillsTwo: Record<Skill, GroupSkill> = {
  ["Alluring Pelt"]: { levels: { 3: { name: "Diversion" } } },
  ["Buttery Leathercraft"]: {
    toggle: true,
    levels: { 3: { name: "Affinity Sliding", affinity: 30 } },
  },
  ["Flexible Leathercraft"]: { levels: { 3: { name: "Hunter Gatherer" } } },
  ["Fortifying Pelt"]: { levels: { 3: { name: "Fortify" } } },
  ["Guardian's Protection"]: { levels: { 3: { name: "Ward of Wyveria" } } },
  ["Guardian's Pulse"]: { levels: { 3: { name: "Wylk Burst" } } },
  ["Imparted Wisdom"]: { levels: { 3: { name: "Forager's Luck" } } },
  ["Lord's Favor"]: {
    toggle: true,
    levels: { 3: { name: "Inspiration", attack: 10 } },
  },
  ["Lord's Fury"]: {
    toggle: true,
    levels: { 3: { name: "Resuscitate ", attack: 10 } },
  },
  ["Neopteron Alert"]: { levels: { 3: { name: "Honey Hunter" } } },
  ["Neopteron Camouflage"]: { levels: { 3: { name: "Fleetfoot" } } },
  ["Scale Layering"]: { levels: { 3: { name: "Adrenaline" } } },
  ["Scaling Prowess"]: { levels: { 3: { name: "Master Mounter" } } },
};

export const SeriesSkillsTwo: Record<Skill, SeriesSkill> = {
  ["Arkveld's Hunger"]: {
    levels: {
      2: { name: "Hasten Recovery I" },
      4: { name: "Hasten Recovery II" },
    },
  },
  ["Blangonga's Spirit"]: {
    toggle: true,
    levels: {
      2: { name: "War Cry I", attack: 10 },
      4: { name: "War Cry II", attack: 20 },
    },
  },
  ["Doshaguma's Might"]: {
    toggle: true,
    levels: {
      2: { name: "Powerhouse I", attack: 10 },
      4: { name: "Powerhouse II", attack: 25 },
    },
  },
  ["Ebony Odogaron's Power"]: {
    toggle: true,
    levels: {
      2: { name: "Burst Boost I", attack: 3 },
      4: { name: "Burst Boost II", attack: 10 },
    },
  },
  ["Fulgur Anjanath's Will"]: {
    levels: { 2: { name: "Second Wind I" }, 4: { name: "Second Wind II" } },
  },
  ["Gore Magala's Tyranny"]: {
    levels: {
      2: { name: "Black Eclipse I" },
      4: { name: "Black Eclipse II", attack: 10, frenzy: { attack: 5 } },
    },
  },
  ["Gravios's Protection"]: {
    levels: {
      2: { name: "Flawless Armor I" },
      4: { name: "Flawless Armor II" },
    },
  },
  ["Guardian Arkveld's Vitality"]: {
    levels: { 2: { name: "Decimator I" }, 4: { name: "Decimator II" } },
  },
  ["Jin Dahaad's Revolt"]: {
    toggle: true,
    levels: {
      2: { name: "Binding Counter I", attack: 25 },
      4: { name: "Binding Counter II", attack: 50 },
    },
  },
  ["Nu Udra's Mutiny"]: { levels: { 2: {}, 4: {} } },
  ["Rathalos's Flare"]: {
    levels: { 2: { name: "Scorcher I" }, 4: { name: "Scorcher II" } },
  },
  ["Rey Dau's Voltage"]: {
    levels: {
      2: { name: "Thunderous Roar I" },
      4: { name: "Thunderous Roar II" },
    },
  },
  ["Uth Duna's Cover"]: {
    levels: {
      2: { name: "Protective Veil I" },
      4: { name: "Protective Veil II" },
    },
  },
  ["Xu Wu's Vigor"]: {
    toggle: true,
    levels: {
      2: { name: "Protein Fiend I", attack: 15 },
      4: { name: "Protein Fiend II", attack: 25 },
    },
  },
};

export const GroupAndSeriesSkills = {
  ...GroupSkillsTwo,
  ...SeriesSkillsTwo,
};

export const WeaponArmorSkills = {
  ...WeaponSkillsTwo,
  ...ArmorSkillsTwo,
};

export const CombinedSkillsTwo = {
  ...WeaponSkillsTwo,
  ...ArmorSkillsTwo,
  ...GroupSkillsTwo,
  ...SeriesSkillsTwo,
};
