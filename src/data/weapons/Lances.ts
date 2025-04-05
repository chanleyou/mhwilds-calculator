import { type MeleeWeapon } from "@/types";

export const Lances: MeleeWeapon[] = [
  // {
  //   type: "Lance",
  //   name: "DBCA7BC9-17F3-4FB4-8EF6-B93F9C21A7F7",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 0,
  //
  //   slots: [3, 2, 0],
  //   sharpness: [50, 60, 60, 80, 50, 50, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Speed Sharpening": 2, "Critical Eye": 1 },
  // },
  {
    type: "Lance",
    name: "Esperanza Lance",
    rarity: 8,
    attack: 210,
    affinity: 0,

    slots: [3, 2, 1],
    sharpness: [50, 60, 60, 60, 40, 80, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Speed Sharpening": 2, "Critical Eye": 2 },
  },
  {
    type: "Lance",
    name: "Shining Pillar",
    rarity: 8,
    attack: 220,
    affinity: 15,
    element: { type: "Fire", value: 250 },
    slots: [3, 2, 1],
    sharpness: [50, 150, 50, 40, 40, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Master's Touch": 1, "Critical Element": 1 },
  },
  // {
  //   type: "Lance",
  //   name: "BE85D437-696E-4F94-A84C-81EBAAF1ED43",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 10,
  //   element: { type: "Water", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [40, 30, 110, 90, 70, 10, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Offensive Guard": 3 },
  // },
  {
    type: "Lance",
    name: "Sandsea Prallaya",
    rarity: 8,
    attack: 210,
    affinity: 10,
    element: { type: "Water", value: 250 },
    slots: [3, 2, 1],
    sharpness: [40, 30, 100, 80, 70, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Offensive Guard": 3 },
  },
  // {
  //   type: "Lance",
  //   name: "BE06C7D0-7A06-4226-91F7-1435ACA2598B",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   element: { type: "Thunder", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [10, 10, 120, 80, 80, 50, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Guard: 2, "Offensive Guard": 1 },
  // },
  {
    type: "Lance",
    name: "Indra Clairlance",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Thunder", value: 250 },
    slots: [3, 2, 1],
    sharpness: [10, 10, 110, 70, 70, 80, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Guard: 2, "Offensive Guard": 1 },
  },
  {
    type: "Lance",
    name: "Chrome Lance",
    rarity: 8,
    attack: 220,
    affinity: 0,

    slots: [3, 2, 1],
    sharpness: [30, 60, 90, 70, 50, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Guard Up": 3 },
  },
  // {
  //   type: "Lance",
  //   name: "91F6CB01-FF9A-4602-B887-4C39C6ED040C",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   status: { type: "Poison", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [60, 50, 100, 30, 100, 10, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Guard Up": 3 },
  // },
  {
    type: "Lance",
    name: "Rompo Tetrotox",
    rarity: 8,
    attack: 220,
    affinity: 0,
    status: { type: "Poison", value: 250 },
    slots: [3, 2, 1],
    sharpness: [40, 50, 100, 30, 100, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Guard Up": 3 },
  },
  // {
  //   type: "Lance",
  //   name: "E4271A2B-E911-40D5-BECF-73692C90AC9E",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 15,
  //   element: { type: "Fire", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [100, 20, 100, 70, 60, 0, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Offensive Guard": 3 },
  // },
  {
    type: "Lance",
    name: "Abaddonian Osminog",
    rarity: 8,
    attack: 230,
    affinity: -15,
    element: { type: "Fire", value: 250 },
    slots: [3, 2, 1],
    sharpness: [100, 20, 100, 50, 50, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Offensive Guard": 3 },
  },
  {
    type: "Lance",
    name: "Hard Bone Lance",
    rarity: 8,
    attack: 230,
    affinity: 0,

    slots: [3, 2, 1],
    sharpness: [50, 60, 70, 70, 100, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Guard: 3, "Attack Boost": 1 },
  },
  // {
  //   type: "Lance",
  //   name: "BC725C52-D8C5-4476-AF2F-C169A51C37B0",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   element: { type: "Ice", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [50, 50, 50, 30, 140, 30, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Guard: 3, Airborne: 1 },
  // },
  {
    type: "Lance",
    name: "Windpierce Tsukibami",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Ice", value: 250 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 50, 30, 120, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Guard: 3, Airborne: 1 },
  },
  {
    type: "Lance",
    name: "Bequeathed Regret",
    rarity: 8,
    attack: 210,
    affinity: 10,
    element: { type: "Dragon", value: 350 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 80, 80, 100, 40, 0],
    handicraft: [0, 0, 0, 0],
    skills: { "Offensive Guard": 3 },
  },
  // {
  //   type: "Lance",
  //   name: "FA201F3C-9218-4DB8-887B-C8A80A6753BA",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 5,
  //   element: { type: "Fire", value: 170 },
  //   slots: [3, 2, 0],
  //   sharpness: [70, 80, 80, 80, 40, 0, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Guard: 3 },
  // },
  {
    type: "Lance",
    name: "Firetrail Kaminet",
    rarity: 8,
    attack: 240,
    affinity: 5,
    element: { type: "Fire", value: 200 },
    slots: [3, 2, 1],
    sharpness: [60, 70, 80, 80, 60, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Guard: 3 },
  },
  {
    type: "Lance",
    name: "Fierceborer Dubhanith",
    rarity: 8,
    attack: 240,
    affinity: -5,
    slots: [3, 3, 1],
    sharpness: [50, 100, 110, 50, 40, 0, 0],
    handicraft: [0, 50, 0, 0],
    skills: { "Punishing Draw": 3 },
  },
  {
    type: "Lance",
    name: "G. Purifying Beaumains",
    rarity: 8,
    attack: 240,
    affinity: -10,
    element: { type: "Dragon", value: 200 },
    slots: [3, 3, 1],
    sharpness: [100, 70, 50, 80, 50, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { Guard: 2 },
  },
  // {
  //   type: "Lance",
  //   name: "933060C0-5406-47A1-B5F6-F8C685A1D3E3",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   element: { type: "Dragon", value: 320 },
  //   slots: [3, 2, 0],
  //   sharpness: [50, 50, 50, 80, 90, 30, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Guard: 3 },
  // },
  {
    type: "Lance",
    name: "Purifying Beaumains",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Dragon", value: 350 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 50, 70, 80, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Guard: 3 },
  },
  {
    type: "Lance",
    name: "Gloomborer Urshanith",
    rarity: 8,
    attack: 250,
    affinity: -15,
    slots: [3, 2, 1],
    sharpness: [50, 70, 90, 90, 50, 0, 0],
    handicraft: [20, 30, 0, 0],
    skills: { "Offensive Guard": 3 },
  },
  // {
  //   type: "Lance",
  //   name: "C281B74B-0C12-49B3-AC94-136AAEBAE181",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 15,
  //   status: { type: "Paralysis", value: 210 },
  //   slots: [3, 2, 0],
  //   sharpness: [70, 50, 30, 90, 60, 50, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Critical Draw": 2, "Critical Status": 1 },
  // },
  {
    type: "Lance",
    name: "Lala Aviculari",
    rarity: 8,
    attack: 200,
    affinity: 15,
    status: { type: "Paralysis", value: 250 },
    slots: [3, 2, 1],
    sharpness: [70, 50, 30, 60, 40, 100, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 2, "Critical Status": 1 },
  },
  {
    type: "Lance",
    name: "Spear of Prominence",
    rarity: 8,
    attack: 210,
    affinity: 10,
    element: { type: "Fire", value: 350 },
    slots: [3, 2, 1],
    sharpness: [100, 70, 50, 40, 50, 40, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Boost": 3 },
  },
  // {
  //   type: "Lance",
  //   name: "EC5A8CFB-B2D1-4DB0-94FA-FC5A0A17ACBF",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 20,
  //   element: { type: "Dragon", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [50, 70, 80, 70, 40, 40, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Critical Element": 3 },
  // },
  {
    type: "Lance",
    name: "Fieberschild",
    rarity: 8,
    attack: 210,
    affinity: 20,
    element: { type: "Dragon", value: 250 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 80, 60, 40, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Lance",
    name: "Gravios Lance",
    rarity: 8,
    attack: 250,
    affinity: -15,
    status: { type: "Blast", value: 350 },
    slots: [3, 2, 1],
    sharpness: [90, 70, 70, 70, 50, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Guard Up": 3 },
  },
  {
    type: "Lance",
    name: "Babel Spear",
    rarity: 8,
    attack: 220,
    affinity: 0,
    slots: [3, 2, 1],
    sharpness: [20, 60, 60, 50, 130, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 3, Guard: 1 },
  },
  {
    type: "Lance",
    name: "Skyscraper",
    rarity: 8,
    attack: 190,
    affinity: 5,
    slots: [3, 3, 3],
    artian: { element: 300, status: 100 },
    sharpness: [80, 40, 60, 80, 70, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: {},
  },
  {
    type: "Lance",
    name: "Blazing Sital",
    rarity: 8,
    attack: 220,
    element: { type: "Dragon", value: 200 },
    affinity: 5,
    slots: [3, 2, 1],
    sharpness: [100, 40, 90, 40, 30, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Whiteflame Torrent": 1 },
  },
  {
    type: "Lance",
    name: "Kimi Ga Kiru",
    rarity: 8,
    attack: 210,
    element: { type: "Water", value: 300 },
    affinity: 15,
    slots: [3, 2, 1],
    sharpness: [80, 60, 40, 40, 70, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Slicked Blade": 3, "Critical Element": 1 },
  },
];
