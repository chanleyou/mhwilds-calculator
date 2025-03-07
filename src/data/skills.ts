import type { BuffGroup } from ".";

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
  CriticalElement: {
    name: "Critical Element",
    levels: [
      { name: "Critical Element 1", criticalElement: 1.05 },
      { name: "Critical Element 2", criticalElement: 1.1 },
      { name: "Critical Element 3", criticalElement: 1.15 },
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
  OffensiveGuard: {
    name: "Offensive Guard",
    levels: [
      { name: "Offensive Guard 1", attackMul: 1.05 },
      { name: "Offensive Guard 2", attackMul: 1.1 },
      { name: "Offensive Guard 3", attackMul: 1.15 },
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
    description:
      "Increases attack power and affinity when large monsters become enraged.",
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
    description:
      "Temporarily increases damage to large monsters with a successful Sneak Attack.",
    levels: [
      { name: "Ambush 1", attackMul: 1.05 },
      { name: "Ambush 2", attackMul: 1.1 },
      { name: "Ambush 3", attackMul: 1.15 },
    ],
  },
  Antivirus: {
    name: "Antivirus",
    description:
      "Once infected, makes it easier to overcome the Frenzy and increases affinity if cured.",
    levels: [
      { name: "Antivirus 1", frenzy: { affinity: 3 } },
      { name: "Antivirus 2", frenzy: { affinity: 6 } },
      { name: "Antivirus 3", frenzy: { affinity: 10 } },
    ],
  },
  BurstDB: {
    name: "Burst (Dual Blades)",
    levels: [
      { name: "Burst 1", attack: 8, element: 40 },
      { name: "Burst 2", attack: 10, element: 60 },
      { name: "Burst 3", attack: 12, element: 80 },
      { name: "Burst 4", attack: 15, element: 100 },
      { name: "Burst 5", attack: 18, element: 120 },
    ],
  },
  BurstBow: {
    name: "Burst (Bow)",
    levels: [
      { name: "Burst 1", attack: 6, element: 40 },
      { name: "Burst 2", attack: 7, element: 60 },
      { name: "Burst 3", attack: 8, element: 80 },
      { name: "Burst 4", attack: 9, element: 100 },
      { name: "Burst 5", attack: 10, element: 120 },
    ],
  },
  BurstBowgun: {
    name: "Burst (LBG/HBG)",
    levels: [
      { name: "Burst 1", attack: 6 },
      { name: "Burst 2", attack: 7 },
      { name: "Burst 3", attack: 8 },
      { name: "Burst 4", attack: 9 },
      { name: "Burst 5", attack: 10 },
    ],
  },
  BurstHeavy: {
    name: "Burst (GS/HH)",
    levels: [
      { name: "Burst 1", attack: 10, element: 80 },
      { name: "Burst 2", attack: 12, element: 100 },
      { name: "Burst 3", attack: 14, element: 120 },
      { name: "Burst 4", attack: 16, element: 160 },
      { name: "Burst 5", attack: 18, element: 200 },
    ],
  },
  BurstOthers: {
    name: "Burst (Others)",
    levels: [
      { name: "Burst 1", attack: 8, element: 60 },
      { name: "Burst 2", attack: 10, element: 80 },
      { name: "Burst 3", attack: 12, element: 100 },
      { name: "Burst 4", attack: 15, element: 120 },
      { name: "Burst 5", attack: 18, element: 140 },
    ],
  },
  Coalescence: {
    name: "Coalescence",
    levels: [
      { name: "Coalescence 1", elementMul: 1.1 },
      { name: "Coalescence 2", elementMul: 1.2 },
      { name: "Coalescence 3", elementMul: 1.3 },
    ],
  },
  Counterstrike: {
    name: "Counterstrike",
    description: "Temporarily increases attack power after being knocked back.",
    levels: [
      { name: "Counterstrike 1", attack: 10 },
      { name: "Counterstrike 2", attack: 15 },
      { name: "Counterstrike 3", attack: 25 },
    ],
  },
  Foray: {
    name: "Foray",
    description:
      "Increases attack power and affinity against large monsters affected by poison or paralysis.",
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
    description:
      "Increases attack power and defense when health drops to 35% or lower.",
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
    description:
      "Temporarily increases affinity and reduces stamina depletion when certain conditions are met.",
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
    description: "Increases attack when your health is full.",
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
    description:
      "Increases attack when you have recoverable damage (the red portion of your Health Gauge).",
    levels: [
      { name: "Resentment 1", attack: 5 },
      { name: "Resentment 2", attack: 10 },
      { name: "Resentment 3", attack: 15 },
      { name: "Resentment 4", attack: 20 },
      { name: "Resentment 5", attack: 15 },
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
    description:
      "Temporarily grants attack after a successful Power Clash or Offset attack.",
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
  JinDahaadsRevolt: {
    name: "Jin Dahaad's Revolt",
    levels: [
      { name: "Binding Counter I", attack: 25 },
      { name: "Binding Counter II", attack: 50 },
    ],
  },
  GoreMagalasTyranny: {
    name: "Gore Magala's Tyranny",
    description:
      "Temporarily grants attack after a successful Power Clash or Offset attack.",
    levels: [
      { name: "Black Eclipse I" },
      { name: "Black Eclipse II", attack: 10, frenzy: { attack: 5 } },
    ],
  },
  XuWusVigor: {
    name: "Xu Wu's Vigor",
    description:
      "Temporarily grants attack after eating items such as well-done steak.",
    levels: [
      { name: "Protein Fiend I", attack: 15 },
      { name: "Protein Fiend II", attack: 25 },
    ],
  },
};
