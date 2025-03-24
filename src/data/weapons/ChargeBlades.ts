import { type ChargeBlade } from "@/types";

export const ChargeBlades: ChargeBlade[] = [
  {
    type: "Charge Blade",
    name: "Esperanza Strongarm",
    rarity: 8,
    attack: 210,
    affinity: 0,
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [50, 60, 60, 60, 40, 80, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Speed Sharpening": 2, "Critical Eye": 2 },
  },
  {
    type: "Charge Blade",
    name: "Guardian Albathos",
    rarity: 8,
    attack: 220,
    affinity: 15,
    element: { type: "Fire", value: 250 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [50, 150, 50, 40, 40, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Master's Touch": 1, "Critical Element": 1 },
  },
  {
    type: "Charge Blade",
    name: "Regas Hyper",
    rarity: 8,
    attack: 220,
    affinity: 0,
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [30, 60, 90, 70, 50, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Rapid Morph": 3 },
  },
  {
    type: "Charge Blade",
    name: "Rompo Dendrotox",
    rarity: 8,
    attack: 220,
    affinity: 0,
    status: { type: "Poison", value: 250 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [40, 50, 100, 30, 100, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Guard Up": 3 },
  },
  {
    type: "Charge Blade",
    name: "Bequeathed Enmity",
    rarity: 8,
    attack: 210,
    affinity: 10,
    element: { type: "Dragon", value: 350 },
    slots: [3, 2, 1],
    phial: "Element",
    sharpness: [50, 50, 80, 80, 100, 40, 0],
    handicraft: [0, 0, 0, 0],
    skills: { "Offensive Guard": 3 },
  },
  {
    type: "Charge Blade",
    name: "Astrapi Clairaxe",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Thunder", value: 250 },
    slots: [3, 2, 1],
    phial: "Element",
    sharpness: [10, 10, 110, 70, 70, 80, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 2, "Load Shells": 1 },
  },
  {
    type: "Charge Blade",
    name: "Shrouded Kutharja",
    rarity: 8,
    attack: 220,
    affinity: 0,
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [60, 20, 100, 90, 80, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { Guard: 3, Artillery: 1 },
  },
  {
    type: "Charge Blade",
    name: "G. Abiding Gawain",
    rarity: 8,
    attack: 240,
    affinity: -10,
    element: { type: "Dragon", value: 200 },
    slots: [3, 3, 1],
    phial: "Impact",
    sharpness: [100, 70, 50, 80, 50, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { Guard: 2 },
  },
  {
    type: "Charge Blade",
    name: "Abiding Gawain",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Dragon", value: 350 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [50, 50, 50, 70, 80, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Guard: 3 },
  },
  {
    type: "Charge Blade",
    name: "Hard Bone Strongarm",
    rarity: 8,
    attack: 230,
    affinity: 0,
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [50, 60, 70, 70, 100, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Load Shells": 2, "Attack Boost": 2 },
  },
  {
    type: "Charge Blade",
    name: "Windthrash Tamebami",
    rarity: 8,
    attack: 220,
    affinity: 0,
    element: { type: "Ice", value: 250 },
    slots: [3, 2, 1],
    phial: "Element",
    sharpness: [50, 50, 50, 30, 120, 50, 0],
    handicraft: [50, 0, 0, 0],
    skills: { Focus: 3, Airborne: 1 },
  },
  {
    type: "Charge Blade",
    name: "Abaddonian Pweza",
    rarity: 8,
    attack: 230,
    affinity: -15,
    element: { type: "Fire", value: 250 },
    slots: [3, 2, 1],
    phial: "Element",
    sharpness: [100, 20, 100, 50, 50, 30, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Rapid Morph": 3 },
  },
  {
    type: "Charge Blade",
    name: "Valeroje-of-the-Waves",
    rarity: 8,
    attack: 240,
    affinity: -15,
    element: { type: "Water", value: 350 },
    slots: [3, 2, 1],
    phial: "Element",
    sharpness: [60, 60, 100, 80, 50, 0, 0],
    handicraft: [10, 40, 0, 0],
    skills: { "Power Prolonger": 3 },
  },
  {
    type: "Charge Blade",
    name: "Lala Eumenophor",
    rarity: 8,
    attack: 200,
    affinity: 15,
    status: { type: "Paralysis", value: 250 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [70, 50, 30, 60, 40, 100, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Draw": 2, "Critical Status": 1 },
  },
  {
    type: "Charge Blade",
    name: "Arachnoscythe",
    rarity: 8,
    attack: 200,
    affinity: 15,
    status: { type: "Sleep", value: 250 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [70, 50, 30, 60, 40, 100, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Offensive Guard": 2, Guard: 1 },
  },
  {
    type: "Charge Blade",
    name: "Dear Lutemia",
    rarity: 8,
    attack: 210,
    affinity: 15,
    status: { type: "Poison", value: 200 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [40, 80, 30, 110, 30, 60, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Status": 3, "Poison Duration Up": 1 },
  },
  {
    type: "Charge Blade",
    name: "Bardichion Blade",
    rarity: 8,
    attack: 210,
    affinity: 10,
    element: { type: "Fire", value: 350 },
    slots: [3, 2, 1],
    phial: "Element",
    sharpness: [100, 70, 50, 40, 50, 40, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Boost": 3 },
  },
  {
    type: "Charge Blade",
    name: "Leidenskraft",
    rarity: 8,
    attack: 210,
    affinity: 20,
    element: { type: "Dragon", value: 250 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [50, 50, 80, 60, 40, 70, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Charge Blade",
    name: "Venom's Kiss",
    rarity: 8,
    attack: 230,
    affinity: 0,
    status: { type: "Poison", value: 350 },
    slots: [3, 2, 1],
    phial: "Impact",
    sharpness: [90, 50, 100, 60, 50, 0, 0],
    handicraft: [50, 0, 0, 0],
    skills: { "Punishing Draw": 3, "Critical Draw": 2 },
  },
  {
    type: "Charge Blade",
    name: "Chrono Gear",
    rarity: 8,
    attack: 190,
    affinity: 5,
    slots: [3, 3, 3],
    artian: { element: 300, status: 150 },
    phial: "Impact",
    sharpness: [80, 40, 60, 80, 70, 20, 0],
    handicraft: [50, 0, 0, 0],
    skills: {},
  },
];
