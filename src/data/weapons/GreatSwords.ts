import { type MeleeWeapon } from "@/types";

export const GreatSwords: MeleeWeapon[] = [
  {
    type: "Great Sword",
    name: "Hope Blade V",
    rarity: 7,
    attack: 190,
    affinity: 0,
    slots: [3, 2, 0],
    sharpness: [50, 60, 80, 70, 60, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Speed Sharpening": 2, "Critical Eye": 1 },
  },
  {
    type: "Great Sword",
    name: "Esperanza Blade",
    rarity: 8,
    attack: 210,
    affinity: 0,
    slots: [3, 2, 1],
    sharpness: [50, 60, 80, 60, 40, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Speed Sharpening": 2, "Critical Eye": 2 },
  },
  {
    type: "Great Sword",
    name: "Whitefire Rathguard",
    rarity: 8,
    attack: 210,
    affinity: 15,
    element: { type: "Fire", value: 400 },
    slots: [3, 2, 1],
    sharpness: [50, 150, 50, 40, 40, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Master's Touch": 1, "Critical Element": 1 },
  },
  {
    type: "Great Sword",
    name: "Ravager Blade",
    rarity: 8,
    attack: 220,
    affinity: 0,
    slots: [3, 2, 1],
    sharpness: [50, 60, 90, 70, 50, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 3 },
  },
  // {
  //   type: "Great Sword",
  //   name: "Jin Dhavaar I",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 0,
  //   element: { type: "Ice", value: 550 },
  //   slots: [3, 2, 0],
  //   sharpness: [40, 40, 50, 100, 100, 20, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Focus: 2 },
  // },
  {
    type: "Great Sword",
    name: "Precipice Metallam",
    rarity: 8,
    attack: 210,
    affinity: 0,
    element: { type: "Ice", value: 600 },
    slots: [3, 2, 1],
    sharpness: [40, 40, 50, 80, 110, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  // {
  //   type: "Great Sword",
  //   name: "Quematrice Espada IV",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 5,
  //   element: { type: "Fire", value: 270 },
  //   slots: [3, 2, 0],
  //   sharpness: [70, 80, 100, 80, 20, 0, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Punishing Draw": 3 },
  // },
  {
    type: "Great Sword",
    name: "Firetrail Blaisdell",
    rarity: 8,
    attack: 240,
    affinity: 5,
    element: { type: "Fire", value: 300 },
    slots: [3, 2, 1],
    sharpness: [60, 70, 100, 80, 40, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Punishing Draw": 3 },
  },
  // {
  //   type: "Great Sword",
  //   name: "66A945F1-A40B-4AA2-8F30-EE286C3172F2",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 0,
  //   status: { type: "Paralysis", value: 470 },
  //   slots: [3, 2, 1],
  //   sharpness: [50, 60, 80, 100, 10, 0, 0],
  //   handicraft: [20, 30, 0, 0],
  //   skills: { "Speed Sharpening": 2 },
  // },
  {
    type: "Great Sword",
    name: "Destructive Torpor",
    rarity: 8,
    attack: 200,
    affinity: 0,
    status: { type: "Paralysis", value: 500 },
    slots: [3, 3, 1],
    sharpness: [50, 60, 100, 110, 30, 0, 0],
    handicraft: [0, 50, 0, 0],
    skills: { "Speed Sharpening": 2 },
  },
  {
    type: "Great Sword",
    name: "Bone Slasher",
    rarity: 8,
    attack: 230,
    affinity: 0,
    slots: [3, 2, 1],
    sharpness: [50, 80, 80, 60, 80, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3, "Attack Boost": 1 },
  },
  // {
  //   type: "Great Sword",
  //   name: "26566965-C244-45D2-B40A-C2B772E4E33B",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 15,
  //   element: { type: "Fire", value: 370 },
  //   slots: [3, 2, 0],
  //   sharpness: [100, 20, 120, 70, 40, 0, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Protective Polish": 2, "Speed Sharpening": 2 },
  // },
  {
    type: "Great Sword",
    name: "Abaddonian Krake",
    rarity: 8,
    attack: 230,
    affinity: -15,
    element: { type: "Fire", value: 400 },
    slots: [3, 2, 1],
    sharpness: [100, 20, 120, 50, 50, 10, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Protective Polish": 3, "Speed Sharpening": 2 },
  },
  // {
  //   type: "Great Sword",
  //   name: "E2CE826A-C972-488E-AA65-DBB3DBC2D474",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 15,
  //   status: { type: "Sleep", value: 370 },
  //   slots: [3, 2, 0],
  //   sharpness: [70, 70, 30, 90, 60, 30, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Offensive Guard": 2, Guard: 1 },
  // },
  {
    type: "Great Sword",
    name: "Immolator Blade",
    rarity: 8,
    attack: 200,
    affinity: 15,
    status: { type: "Sleep", value: 400 },
    slots: [3, 2, 1],
    sharpness: [70, 70, 30, 60, 40, 80, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Offensive Guard": 2, Guard: 1 },
  },
  {
    type: "Great Sword",
    name: "Prinvrilo's Dissolution",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Water", value: 300 },
    slots: [3, 2, 1],
    sharpness: [20, 110, 50, 50, 70, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 3 },
  },
  {
    type: "Great Sword",
    name: "Fellslayer Dangeom",
    rarity: 8,
    attack: 240,
    affinity: -10,
    slots: [3, 2, 1],
    sharpness: [50, 100, 130, 50, 20, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { "Punishing Draw": 3 },
  },
  {
    type: "Great Sword",
    name: "	G. Stalwart Lamorak",
    rarity: 8,
    attack: 240,
    affinity: -10,
    element: { type: "Dragon", value: 300 },
    slots: [3, 3, 1],
    sharpness: [100, 90, 50, 80, 30, 0, 0],
    handicraft: [20, 30, 0, 0],
    skills: { Focus: 2 },
  },
  // {
  //   type: "Great Sword",
  //   name: "AF5A867B-D4E3-491A-81B4-42619E88A1C6",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   element: { type: "Dragon", value: 470 },
  //   slots: [3, 2, 0],
  //   sharpness: [50, 50, 50, 120, 70, 10, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Focus: 3 },
  // },
  {
    type: "Great Sword",
    name: "Stalwart Lamorak",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Dragon", value: 500 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 50, 90, 80, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  {
    type: "Great Sword",
    name: "Grimslayer Urgeom",
    rarity: 8,
    attack: 250,
    affinity: -20,
    slots: [3, 3, 1],
    sharpness: [50, 70, 100, 100, 30, 0, 0],
    handicraft: [20, 30, 0, 0],
    skills: { Focus: 2 },
  },
  // {
  //   type: "Great Sword",
  //   name: "C3A614A5-766F-40BE-BAE1-A51FC3E83AD1",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 0,
  //   element: { type: "Fire", value: 550 },
  //   slots: [2, 1, 0],
  //   sharpness: [100, 120, 50, 70, 10, 0, 0],
  //   handicraft: [20, 30, 0, 0],
  //   skills: { Focus: 2, "Charge Master": 2 },
  // },
  {
    type: "Great Sword",
    name: "Rooster Decapitator",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Fire", value: 600 },
    slots: [3, 2, 1],
    sharpness: [110, 120, 20, 80, 20, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { Focus: 2, "Charge Master": 2 },
  },
  {
    type: "Great Sword",
    name: "Fulgurcleaver Guardiana",
    rarity: 8,
    attack: 210,
    affinity: 15,
    element: { type: "Thunder", value: 500 },
    slots: [3, 2, 1],
    sharpness: [40, 90, 120, 70, 30, 0, 0],
    handicraft: [0, 50, 0, 0],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Great Sword",
    name: "Poison King",
    rarity: 8,
    attack: 230,
    affinity: 0,
    status: { type: "Poison", value: 500 },
    slots: [3, 2, 1],
    sharpness: [90, 50, 110, 70, 30, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 2, "Punishing Draw": 2 },
  },
  // {
  //   type: "Great Sword",
  //   name: "3B056739-E6C0-490B-B819-8F86D3193437",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 15,
  //   status: { type: "Poison", value: 270 },
  //   slots: [3, 2, 0],
  //   sharpness: [40, 80, 40, 120, 50, 20, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Critical Status": 3, "Poison Duration Up": 1 },
  // },
  {
    type: "Great Sword",
    name: "Sieglinde",
    rarity: 8,
    attack: 210,
    affinity: 15,
    status: { type: "Poison", value: 300 },
    slots: [3, 2, 1],
    sharpness: [40, 80, 30, 120, 40, 40, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Status": 3, "Poison Duration Up": 1 },
  },
  {
    type: "Great Sword",
    name: "Rathalos Firesword",
    rarity: 8,
    attack: 200,
    affinity: 10,
    element: { type: "Fire", value: 500 },
    slots: [3, 2, 1],
    sharpness: [100, 70, 50, 50, 50, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Boost": 3 },
  },
  // {
  //   type: "Great Sword",
  //   name: "BA08E119-979B-4CD3-B215-6732579C1423",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 20,
  //   element: { type: "Dragon", value: 370 },
  //   slots: [3, 2, 1],
  //   sharpness: [50, 70, 80, 70, 60, 20, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Critical Element": 2 },
  // },
  {
    type: "Great Sword",
    name: "	Düsterstolz",
    rarity: 8,
    attack: 210,
    affinity: 20,
    element: { type: "Dragon", value: 400 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 80, 60, 60, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Great Sword",
    name: "Freezer Speartuna",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Ice", value: 700 },
    slots: [3, 2, 0],
    sharpness: [50, 50, 90, 110, 50, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Punishing Draw": 3, Slugger: 2 },
  },
  {
    type: "Great Sword",
    name: "Giant Jawblade",
    rarity: 8,
    attack: 240,
    affinity: 0,
    slots: [3, 2, 1],
    sharpness: [50, 100, 120, 50, 30, 0, 0],
    handicraft: [40, 10, 0, 0],
    skills: { Focus: 2, "Protective Polish": 2 },
  },
  {
    type: "Great Sword",
    name: "Varianza",
    rarity: 8,
    attack: 190,
    affinity: 5,
    slots: [3, 3, 3],
    artian: { element: 480, status: 300 },
    sharpness: [80, 40, 60, 80, 70, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: {},
  },
];
