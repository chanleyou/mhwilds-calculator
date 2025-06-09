import type {
  Buff,
  GroupSkill,
  SeriesSkill,
  Skill,
  SkillName,
  SkillWeaponGroup,
  WeaponType,
} from "@/types";

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

export const UnsupportedWeaponSkills: Record<SkillName, Skill> = {
  ["Ballistics"]: skill(3),
  ["Blast Functionality"]: skill(1),
  ["Charge Up"]: skill(1),
  ["Critical Status"]: skill(3),
  ["Exhaust Functionality"]: skill(1),
  ["Focus"]: skill(3),
  ["Guard"]: skill(3),
  ["Guard Up"]: skill(3),
  ["Horn Maestro"]: skill(2),
  ["Load Shells"]: skill(2),
  ["Master's Touch"]: skill(1),
  ["Para Functionality"]: skill(1),
  ["Poison Duration Up"]: skill(1),
  ["Poison Functionality"]: skill(1),
  ["Power Prolonger"]: skill(3),
  ["Protective Polish"]: skill(3),
  ["Razor Sharp"]: skill(3),
  ["Sleep Functionality"]: skill(1),
  ["Slugger"]: skill(3),
  ["Speed Sharpening"]: skill(2),
  ["Stamina Thief"]: skill(3),
  ["Whiteflame Torrent"]: skill(1),
};

export const WeaponSkills: Record<SkillName, Skill | SkillWeaponGroup> = {
  ["Airborne"]: {
    levels: {
      1: { name: "Airborne 1", airAttackMul: 1.1 },
    },
  },
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
      4: {
        name: "Attack Boost 4",
        attack: 8,
        attackMul: 1.02,
      },
      5: {
        name: "Attack Boost 5",
        attack: 9,
        attackMul: 1.04,
      },
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
  ["Bludgeoner"]: {
    levels: {
      1: {
        name: "Bludgeoner 1",
        sharpnesses: ["Yellow"],
        bludgeonerAttackMul: 1.05,
      },
      2: {
        name: "Bludgeoner 2",
        sharpnesses: ["Yellow"],
        bludgeonerAttackMul: 1.1,
      },
      3: {
        name: "Bludgeoner 3",
        sharpnesses: ["Yellow", "Green"],
        bludgeonerAttackMul: 1.1,
      },
    },
  },
  ["Charge Master"]: {
    groups: [
      {
        weapons: ["Bow"],
        levels: {
          1: { name: "Charge Master 1", eleMul: 1.05 },
          2: { name: "Charge Master 2", eleMul: 1.1 },
          3: { name: "Charge Master 3", eleMul: 1.15 },
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
          1: { name: "Charge Master 1", eleMul: 1.15 },
          2: { name: "Charge Master 2", eleMul: 1.2 },
          3: { name: "Charge Master 3", eleMul: 1.25 },
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
    uptime: true,
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
      1: { name: "Ice Attack 1", elementType: "Ice", element: 40 },
      2: {
        name: "Ice Attack 2",
        elementType: "Ice",
        element: 50,
        elementMul: 1.1,
      },
      3: {
        name: "Ice Attack 3",
        elementType: "Ice",
        element: 60,
        elementMul: 1.2,
      },
    },
  },
  ["Mind's Eye"]: {
    levels: {
      1: { name: "Mind's Eye 1", rawMul: 1.1 },
      2: { name: "Mind's Eye 2", rawMul: 1.15 },
      3: { name: "Mind's Eye 3", rawMul: 1.3 },
    },
  },
  ["Normal Shots"]: {
    levels: {
      1: { name: "Normal Shots 1", rawMul: 1.05 },
    },
  },
  ["Offensive Guard"]: {
    uptime: true,
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
    uptime: true,
    levels: {
      1: { name: "Punishing Draw 1", attack: 3 },
      2: { name: "Punishing Draw 2", attack: 5 },
      3: { name: "Punishing Draw 3", attack: 7 },
    },
  },
  ["Rapid Fire Up"]: {
    levels: {
      1: { name: "Rapid Fire Up 1", rawMul: 1.05 },
    },
  },
  ["Rapid Morph"]: {
    levels: {
      1: { name: "Rapid Morph 1" },
      2: { name: "Rapid Morph 2", morphAttackMul: 1.1 },
      3: { name: "Rapid Morph 3", morphAttackMul: 1.2 },
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
  "Slicked Blade": {
    levels: {
      1: {
        name: "Slicked Blade 1",
        wet: { affinity: 3 },
        bubbleblight: { affinity: 7 },
      },
      2: {
        name: "Slicked Blade 2",
        wet: { affinity: 6 },
        bubbleblight: { affinity: 14 },
      },
      3: {
        name: "Slicked Blade 3",
        wet: { affinity: 9 },
        bubbleblight: { affinity: 21 },
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
    description:
      "Increases Affinity of Bowgun ammo and Bow Coatings by 8/10/12% from the 4th shot onwards (first checkbox). Attack +3/6/10 and 5% Element on the 4th and 6th shot (second checkbox).",
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

export const UnsupportedArmorSkills: Record<SkillName, Skill> = {
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

export const ArmorSkills: Record<SkillName, Skill | SkillWeaponGroup> = {
  ["Adrenaline Rush"]: {
    uptime: true,
    levels: {
      1: { name: "Adrenaline Rush 1", attack: 10 },
      2: { name: "Adrenaline Rush 2", attack: 15 },
      3: { name: "Adrenaline Rush 3", attack: 20 },
      4: { name: "Adrenaline Rush 4", attack: 25 },
      5: { name: "Adrenaline Rush 5", attack: 30 },
    },
  },
  Agitator: {
    uptime: true,
    levels: {
      1: { name: "Agitator 1", attack: 4, affinity: 3 },
      2: { name: "Agitator 2", attack: 8, affinity: 5 },
      3: { name: "Agitator 3", attack: 12, affinity: 7 },
      4: { name: "Agitator 4", attack: 16, affinity: 10 },
      5: { name: "Agitator 5", attack: 20, affinity: 15 },
    },
  },
  Ambush: {
    description:
      "Increases Attack  by 5/10/15% for 30s after a successful Sneak Attack.",
    uptime: true,
    levels: {
      1: { name: "Ambush 1", attackMul: 1.05 },
      2: { name: "Ambush 2", attackMul: 1.1 },
      3: { name: "Ambush 3", attackMul: 1.15 },
    },
  },
  Antivirus: {
    description:
      "Increases recovery rate from Frenzy. Affinity +3/6/10% after overcoming Frenzy.",
    levels: {
      1: { name: "Antivirus 1", frenzy: { affinity: 3 } },
      2: { name: "Antivirus 2", frenzy: { affinity: 6 } },
      3: { name: "Antivirus 3", frenzy: { affinity: 10 } },
    },
  },
  Burst: {
    uptime: true,
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
    uptime: true,
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
          1: { name: "Coalescence 1", statusMul: 1.05, elementMul: 1.1 },
          2: { name: "Coalescence 2", statusMul: 1.1, elementMul: 1.2 },
          3: { name: "Coalescence 3", statusMul: 1.15, elementMul: 1.3 },
        },
      },
    ],
  },
  ["Convert Element"]: {
    uptime: true,
    levels: {
      1: { name: "Convert Element 1", elementType: "Dragon", element: 80 },
      2: { name: "Convert Element 2", elementType: "Dragon", element: 120 },
      3: { name: "Convert Element 3", elementType: "Dragon", element: 180 },
    },
  },
  Counterstrike: {
    uptime: true,
    levels: {
      1: { name: "Counterstrike 1", attack: 10 },
      2: { name: "Counterstrike 2", attack: 15 },
      3: { name: "Counterstrike 3", attack: 25 },
    },
  },
  ["Elemental Absorption"]: {
    uptime: true,
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
    uptime: true,
    levels: {
      1: { name: "Foray 1", attack: 6 },
      2: { name: "Foray 2", attack: 8, affinity: 5 },
      3: { name: "Foray 3", attack: 10, affinity: 10 },
      4: { name: "Foray 4", attack: 12, affinity: 15 },
      5: { name: "Foray 5", attack: 15, affinity: 20 },
    },
  },
  Heroics: {
    uptime: true,
    levels: {
      1: { name: "Heroics 1" },
      2: { name: "Heroics 2", attackMul: 1.05 },
      3: { name: "Heroics 3", attackMul: 1.05 },
      4: { name: "Heroics 4", attackMul: 1.1 },
      5: { name: "Heroics 5", attackMul: 1.3 },
    },
  },
  ["Latent Power"]: {
    uptime: true,
    levels: {
      1: { name: "Latent Power 1", affinity: 10 },
      2: { name: "Latent Power 2", affinity: 20 },
      3: { name: "Latent Power 3", affinity: 30 },
      4: { name: "Latent Power 4", affinity: 40 },
      5: { name: "Latent Power 5", affinity: 50 },
    },
  },
  ["Maximum Might"]: {
    uptime: true,
    levels: {
      1: { name: "Maximum Might 1", affinity: 10 },
      2: { name: "Maximum Might 2", affinity: 20 },
      3: { name: "Maximum Might 3", affinity: 30 },
    },
  },
  "Peak Performance": {
    uptime: true,
    levels: {
      1: { name: "Peak Performance 1", attack: 3 },
      2: { name: "Peak Performance 2", attack: 6 },
      3: { name: "Peak Performance 3", attack: 10 },
      4: { name: "Peak Performance 4", attack: 15 },
      5: { name: "Peak Performance 5", attack: 20 },
    },
  },
  Resentment: {
    uptime: true,
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

export const UnsupportedGroupSkills: Record<SkillName, GroupSkill> = {
  ["Alluring Pelt"]: { levels: { 3: { name: "Diversion" } } },
  "Festival Spirit": { levels: { 3: { name: "Carving Master" } } },
  ["Flexible Leathercraft"]: { levels: { 3: { name: "Hunter Gatherer" } } },
  ["Fortifying Pelt"]: { levels: { 3: { name: "Fortify" } } },
  ["Glory's Favor"]: { levels: { 3: { name: "Luck" } } },
  ["Guardian's Protection"]: { levels: { 3: { name: "Ward of Wyveria" } } },
  ["Guardian's Pulse"]: { levels: { 3: { name: "Wylk Burst" } } },
  ["Imparted Wisdom"]: { levels: { 3: { name: "Forager's Luck" } } },
  ["Master of the Fist"]: { levels: { 3: { name: "Satsui no Hado" } } },
  ["Neopteron Alert"]: { levels: { 3: { name: "Honey Hunter" } } },
  ["Neopteron Camouflage"]: { levels: { 3: { name: "Fleetfoot" } } },
  ["Scale Layering"]: { levels: { 3: { name: "Adrenaline" } } },
  ["Scaling Prowess"]: { levels: { 3: { name: "Master Mounter" } } },
};

export const GroupSkills: Record<SkillName, GroupSkill> = {
  ["Buttery Leathercraft"]: {
    uptime: true,
    levels: { 3: { name: "Affinity Sliding", affinity: 30 } },
  },
  ["Lord's Favor"]: {
    uptime: true,
    levels: { 3: { name: "Inspiration", attack: 10 } },
  },
  ["Lord's Fury"]: {
    uptime: true,
    levels: { 3: { name: "Resuscitate ", attack: 10 } },
  },
  ["Lord's Soul"]: {
    uptime: true,
    levels: { 3: { name: "Guts (Tenacity)", attackMul: 1.05 } },
  },
};

export const UnsupportedSeriesSkills: Record<SkillName, SeriesSkill> = {
  ["Arkveld's Hunger"]: {
    levels: {
      2: { name: "Hasten Recovery I" },
      4: { name: "Hasten Recovery II" },
    },
  },
  "Blossomdance Prayer": {
    levels: {
      2: { name: "Blossomdance Boon I" },
      4: { name: "Blossomdance Boon II" },
    },
  },
  ["Gravios's Protection"]: {
    levels: {
      2: { name: "Flawless Armor I" },
      4: { name: "Flawless Armor II" },
    },
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
  ["Fulgur Anjanath's Will"]: {
    levels: { 2: { name: "Second Wind I" }, 4: { name: "Second Wind II" } },
  },
  ["Guardian Arkveld's Vitality"]: {
    levels: { 2: { name: "Decimator I" }, 4: { name: "Decimator II" } },
  },
  "Mizutsune's Prowess": {
    levels: { 2: { name: "Bubbly Dance I" }, 4: { name: "Bubbly Dance II" } },
  },
  ["Nu Udra's Mutiny"]: {
    levels: {
      2: { name: "Bad Blood I" },
      4: { name: "Bad Blood II" },
    },
  },
  ["Rathalos's Flare"]: {
    levels: { 2: { name: "Scorcher I" }, 4: { name: "Scorcher II" } },
  },
  "Zoh Shia's Pulse": {
    levels: {
      2: { name: "Super Recovery I" },
      4: { name: "Super Recovery II" },
    },
  },
};

export const SeriesSkills: Record<SkillName, SeriesSkill> = {
  ["Blangonga's Spirit"]: {
    uptime: true,
    levels: {
      2: { name: "War Cry I", attack: 10 },
      4: { name: "War Cry II", attack: 20 },
    },
  },
  ["Doshaguma's Might"]: {
    uptime: true,
    levels: {
      2: { name: "Powerhouse I", attack: 10 },
      4: { name: "Powerhouse II", attack: 25 },
    },
  },
  ["Ebony Odogaron's Power"]: {
    levels: {
      2: { name: "Burst Boost I", burst: { attack: 3 } },
      4: { name: "Burst Boost II", burst: { attack: 10 } },
    },
  },
  ["Gore Magala's Tyranny"]: {
    levels: {
      2: { name: "Black Eclipse I" },
      4: { name: "Black Eclipse II", attack: 10, frenzy: { attack: 5 } },
    },
  },
  ["Jin Dahaad's Revolt"]: {
    uptime: true,
    levels: {
      2: { name: "Binding Counter I", attack: 25 },
      4: { name: "Binding Counter II", attack: 50 },
    },
  },
  ["Xu Wu's Vigor"]: {
    uptime: true,
    levels: {
      2: { name: "Protein Fiend I", attack: 15 },
      4: { name: "Protein Fiend II", attack: 25 },
    },
  },
};

export const GroupSkillsCombined = {
  ...UnsupportedGroupSkills,
  ...GroupSkills,
};

export const SeriesSkillsCombined = {
  ...UnsupportedSeriesSkills,
  ...SeriesSkills,
};

export const WeaponArmorSkills = {
  ...UnsupportedWeaponSkills,
  ...UnsupportedArmorSkills,
  ...WeaponSkills,
  ...ArmorSkills,
};
