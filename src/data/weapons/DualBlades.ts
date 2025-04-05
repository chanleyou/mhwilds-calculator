import { type MeleeWeapon } from "@/types";

export const DualBlades: MeleeWeapon[] = [
  // {
  //   type: "Dual Blades",
  //   name: "88DD241E-2854-4059-AE35-54B0676895A3",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 0,
  //   slots: [3, 2, 0],
  //   sharpness: [50, 60, 40, 70, 60, 70, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Speed Sharpening": 2, "Critical Eye": 1 },
  // },
  {
    type: "Dual Blades",
    name: "Esperanza Daggers",
    rarity: 8,
    attack: 210,
    affinity: 0,
    slots: [3, 2, 1],
    sharpness: [50, 60, 40, 60, 40, 100, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Speed Sharpening": 2, "Critical Eye": 2 },
  },
  {
    type: "Dual Blades",
    name: "Wyvern Sentinels",
    rarity: 8,
    attack: 210,
    affinity: 15,
    element: { type: "Fire", value: 150 },
    slots: [3, 2, 1],
    sharpness: [50, 130, 50, 50, 40, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Master's Touch": 1, "Critical Element": 1 },
  },
  {
    type: "Dual Blades",
    name: "Master Sabers",
    rarity: 8,
    attack: 200,
    affinity: 10,
    element: { type: "Water", value: 200 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 50, 80, 50, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  {
    type: "Dual Blades",
    name: "Dual Cleavers",
    rarity: 8,
    attack: 220,
    affinity: 0,

    slots: [3, 2, 1],
    sharpness: [10, 60, 90, 70, 50, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "20D387EE-1894-4DDB-89A9-B82C05A1E2A0",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 0,
  //   element: { type: "Ice", value: 270 },
  //   slots: [3, 2, 0],
  //   sharpness: [40, 40, 20, 100, 110, 40, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Focus: 3 },
  // },
  {
    type: "Dual Blades",
    name: "Precipice Ulokiem",
    rarity: 8,
    attack: 210,
    affinity: 0,
    element: { type: "Ice", value: 300 },
    slots: [3, 2, 1],
    sharpness: [40, 40, 10, 80, 120, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  {
    type: "Dual Blades",
    name: "Bequeathed Oblivion",
    rarity: 8,
    attack: 210,
    affinity: 10,
    element: { type: "Dragon", value: 200 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 60, 80, 100, 60, 0],
    handicraft: [0, 0, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "354423D5-B29E-438A-B767-0CAC16F328A9",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 5,
  //   element: { type: "Fire", value: 130 },
  //   slots: [3, 2, 0],
  //   sharpness: [70, 80, 60, 80, 60, 0, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Focus: 3 },
  // },
  {
    type: "Dual Blades",
    name: "Firetrail Magnesiae",
    rarity: 8,
    attack: 240,
    affinity: 5,
    element: { type: "Fire", value: 150 },
    slots: [3, 2, 1],
    sharpness: [60, 70, 60, 80, 80, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  {
    type: "Dual Blades",
    name: "Wild Hatchets",
    rarity: 8,
    attack: 230,
    affinity: 0,

    slots: [3, 2, 1],
    sharpness: [50, 50, 60, 70, 120, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3, "Attack Boost": 1 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "9F2DC614-3F17-488A-841A-40915D182F9E",
  //   rarity: 7,
  //   attack: 220,
  //   affinity: 15,
  //   element: { type: "Water", value: 170 },
  //   slots: [3, 2, 0],
  //   sharpness: [60, 70, 120, 60, 40, 0, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Power Prolonger": 3 },
  // },
  {
    type: "Dual Blades",
    name: "Ngarpatu-of-the-Waves",
    rarity: 8,
    attack: 240,
    affinity: -15,
    element: { type: "Water", value: 200 },
    slots: [3, 2, 1],
    sharpness: [60, 60, 100, 60, 70, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  {
    type: "Dual Blades",
    name: "Funky Maracas",
    rarity: 8,
    attack: 220,
    affinity: 5,

    slots: [3, 3, 1],
    sharpness: [60, 60, 60, 60, 50, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Punishing Draw": 3, "Critical Draw": 2 },
  },
  {
    type: "Dual Blades",
    name: "Ajara-Panthaka",
    rarity: 8,
    attack: 210,
    affinity: 10,
    status: { type: "Blast", value: 150 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 50, 90, 40, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  {
    type: "Dual Blades",
    name: "Fastflayers Jambastra",
    rarity: 8,
    attack: 240,
    affinity: -5,
    slots: [3, 3, 1],
    sharpness: [50, 100, 90, 50, 60, 0, 0],
    handicraft: [0, 50, 0, 0],
    skills: { "Power Prolonger": 2 },
  },
  {
    type: "Dual Blades",
    name: "G. Inspired Ywain",
    rarity: 8,
    attack: 240,
    affinity: -10,
    element: { type: "Dragon", value: 150 },
    slots: [3, 3, 1],
    sharpness: [100, 50, 50, 80, 70, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { Focus: 2 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "F161B3BA-27F7-4FB1-9EFD-682C122AD394",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   element: { type: "Dragon", value: 160 },
  //   slots: [3, 2, 0],
  //   sharpness: [50, 50, 50, 80, 70, 50, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { Focus: 3 },
  // },
  {
    type: "Dual Blades",
    name: "Inspired Ywain",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Dragon", value: 200 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 50, 70, 60, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  {
    type: "Dual Blades",
    name: "Guardflayers Urbastra",
    rarity: 8,
    attack: 250,
    affinity: 15,

    slots: [3, 3, 1],
    sharpness: [30, 60, 100, 90, 70, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { Focus: 2 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "5F746AC6-13B0-4048-B96E-8E283FC77E76",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 15,
  //   status: { type: "Paralysis", value: 130 },
  //   slots: [3, 2, 0],
  //   sharpness: [70, 30, 30, 90, 60, 70, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Critical Draw": 2, "Critical Status": 1 },
  // },
  {
    type: "Dual Blades",
    name: "Lala Harpactirs",
    rarity: 8,
    attack: 200,
    affinity: 15,
    status: { type: "Paralysis", value: 150 },
    slots: [3, 2, 1],
    sharpness: [70, 30, 30, 60, 40, 120, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 2, "Critical Status": 1 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "0E122E1B-544F-4842-AAED-98172D178246",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 0,
  //   element: { type: "Fire", value: 220 },
  //   slots: [3, 2, 0],
  //   sharpness: [100, 100, 30, 70, 50, 0, 0],
  //   handicraft: [20, 30, 0, 0],
  //   skills: { "Power Prolonger": 3 },
  // },
  {
    type: "Dual Blades",
    name: "Dual Kut-Ku",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Fire", value: 250 },
    slots: [3, 2, 1],
    sharpness: [100, 110, 20, 60, 60, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  {
    type: "Dual Blades",
    name: "Wyvern Lovers",
    rarity: 8,
    attack: 200,
    affinity: 10,
    element: { type: "Fire", value: 200 },
    slots: [3, 2, 1],
    sharpness: [100, 70, 50, 40, 30, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Boost": 3 },
  },
  // {
  //   type: "Dual Blades",
  //   name: "D1E045D5-477F-49DE-A3D0-7D64EEFD62A0",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 20,
  //   element: { type: "Dragon", value: 120 },
  //   slots: [3, 2, 0],
  //   sharpness: [50, 70, 80, 50, 40, 60, 0],
  //   handicraft: [50, 0, 0, 0],
  //   skills: { "Critical Element": 3 },
  // },
  {
    type: "Dual Blades",
    name: "Hungerklauen",
    rarity: 8,
    attack: 200,
    affinity: 20,
    element: { type: "Dragon", value: 150 },
    slots: [3, 2, 1],
    sharpness: [50, 50, 80, 40, 40, 90, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Dual Blades",
    name: "Final Battleaxes",
    rarity: 8,
    attack: 230,
    affinity: 0,
    status: { type: "Poison", value: 200 },
    slots: [3, 2, 1],
    sharpness: [90, 50, 90, 50, 70, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  {
    type: "Dual Blades",
    name: "Fulgurtwins Guardiana",
    rarity: 8,
    attack: 210,
    affinity: 15,
    element: { type: "Thunder", value: 200 },
    slots: [3, 2, 1],
    sharpness: [40, 90, 120, 30, 70, 0, 0],
    handicraft: [0, 50, 0, 0],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Dual Blades",
    name: "Blango Trishula",
    rarity: 8,
    attack: 230,
    affinity: -10,
    element: { type: "Ice", value: 150 },
    slots: [3, 2, 1],
    sharpness: [50, 30, 80, 80, 50, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  {
    type: "Dual Blades",
    name: "Gravios Conquerors",
    rarity: 8,
    attack: 240,
    affinity: -15,
    status: { type: "Blast", value: 200 },
    slots: [3, 2, 1],
    sharpness: [70, 70, 70, 70, 70, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3 },
  },
  {
    type: "Dual Blades",
    name: "Tiltkreise",
    rarity: 8,
    attack: 190,
    affinity: 5,
    slots: [3, 3, 3],
    artian: { element: 270, status: 70 },
    sharpness: [80, 40, 60, 80, 70, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: {},
  },
  {
    type: "Dual Blades",
    name: "Blazing Liel",
    rarity: 8,
    attack: 220,
    element: { type: "Dragon", value: 140 },
    affinity: 5,
    slots: [3, 2, 1],
    sharpness: [90, 40, 90, 30, 30, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "WhiteFlame Torrent": 1 },
  },
  {
    type: "Dual Blades",
    name: "Evening Dusk",
    rarity: 8,
    attack: 210,
    element: { type: "Water", value: 190 },
    affinity: 15,
    slots: [3, 2, 1],
    sharpness: [80, 60, 40, 40, 50, 80, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Slicked Blade": 3, "Critical Element": 1 },
  },
];
