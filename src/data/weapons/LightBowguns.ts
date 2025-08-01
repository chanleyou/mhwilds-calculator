import { type Bowgun } from "@/types";

export const LightBowguns: Bowgun[] = [
  // {
  //   type: "Light Bowgun",
  //   name: "77EF492F-52F0-45B4-BABF-2DAC150356CC",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 0,
  //   slots: [3, 2, 0],
  //   skills: { Ballistics: 3, "Critical Eye": 1 },
  // },
  {
    type: "Light Bowgun",
    name: "Esperanza Rifle",
    rarity: 8,
    attack: 210,
    affinity: 0,
    ammo: {
      Normal: { levels: [2], rapidFire: true },
      Pierce: { levels: [1] },
      Spread: { levels: [1], rapidFire: true },
      Thunder: { levels: [1] },
    },
    slots: [3, 2, 1],
    skills: { Ballistics: 3, "Critical Eye": 1 },
  },
  {
    type: "Light Bowgun",
    name: "White Rathling Phoenix",
    rarity: 8,
    attack: 210,
    affinity: 15,
    ammo: {
      Normal: { levels: [1, 2] },
      Pierce: { levels: [1, 2] },
      Spread: { levels: [2, 3], rapidFire: true },
      Flaming: { levels: [1, 2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Critical Element": 2, Ballistics: 1 },
  },
  {
    type: "Light Bowgun",
    name: "Faithbreaker Leibolkule",
    rarity: 8,
    attack: 240,
    affinity: -5,
    ammo: {
      Normal: { levels: [3], rapidFire: true },
      Pierce: { levels: [1], rapidFire: true },
      Spread: { levels: [1] },
      Sticky: { levels: [1] },
      Water: { levels: [1] },
    },
    slots: [3, 2, 1],
    skills: { "Opening Shot": 3 },
  },
  {
    type: "Light Bowgun",
    name: "G. Expiating Caius",
    rarity: 8,
    attack: 230,
    affinity: -10,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [1] },
      Spread: { levels: [2], rapidFire: true },
      Sticky: { levels: [1] },
      Water: { levels: [2], rapidFire: true },
      Freeze: { levels: [2] },
    },
    slots: [3, 3, 1],
    skills: { "Opening Shot": 2 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "D8D5B90B-308F-4110-BB86-5AAA21FD1E4D",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 0,
  //   slots: [3, 2, 0],
  //   skills: { "Opening Shot": 3 },
  // },
  {
    type: "Light Bowgun",
    name: "Expiating Caius",
    rarity: 8,
    attack: 200,
    affinity: 0,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [3], rapidFire: true },
      Spread: { levels: [2], rapidFire: true },
      Flaming: { levels: [2] },
      Thunder: { levels: [2] },
      Dragon: { levels: [1], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Opening Shot": 3 },
  },
  {
    type: "Light Bowgun",
    name: "Gigasbreaker Urbolkule",
    rarity: 8,
    attack: 250,
    affinity: -15,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [1] },
      Spread: { levels: [3], rapidFire: true },
      Sticky: { levels: [1] },
      Water: { levels: [1], rapidFire: true },
    },
    slots: [3, 3, 1],
    skills: { Slugger: 3 },
  },
  {
    type: "Light Bowgun",
    name: "High Chain Blitz",
    rarity: 8,
    attack: 220,
    affinity: 0,
    ammo: {
      Normal: { levels: [1], rapidFire: true },
      Pierce: { levels: [2], rapidFire: true },
      Spread: { levels: [1] },
      Sticky: { levels: [1] },
      Thunder: { levels: [1] },
    },
    slots: [3, 2, 1],
    skills: { "Tetrad Shot": 3 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "9D705A9F-C0B5-4BF2-9A94-597C957A21CE",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   slots: [3, 2, 0],
  //   skills: { "Opening Shot": 2, Slugger: 1 },
  // },
  {
    type: "Light Bowgun",
    name: "Szelatya Clairgun",
    rarity: 8,
    attack: 220,
    affinity: 0,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [3], rapidFire: true },
      Spread: { levels: [1] },
      Sticky: { levels: [1] },
      Thunder: { levels: [2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Opening Shot": 2, Slugger: 1 },
  },
  {
    type: "Light Bowgun",
    name: "Power Rifle",
    rarity: 8,
    attack: 230,
    affinity: 0,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [1] },
      Spread: { levels: [2], rapidFire: true },
      Sticky: { levels: [1], rapidFire: true },
      Flaming: { levels: [1] },
      Thunder: { levels: [1] },
    },
    slots: [3, 2, 1],
    skills: { "Opening Shot": 3, "Attack Boost": 1 },
  },
  {
    type: "Light Bowgun",
    name: "Ajara-Angaja",
    rarity: 8,
    attack: 210,
    affinity: 10,
    ammo: {
      Normal: { levels: [1, 2] },
      Pierce: { levels: [1, 2] },
      Spread: { levels: [2, 3], rapidFire: true },
      Sticky: { levels: [1], rapidFire: true },
      Flaming: { levels: [1, 2] },
      Thunder: { levels: [1, 2] },
    },
    slots: [3, 2, 1],
    skills: { Artillery: 3 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "7DB70C64-D581-43A3-AECB-F3EA32A51F46",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 15,
  //   slots: [3, 2, 0],
  //   skills: { "Opening Shot": 3 },
  // },
  {
    type: "Light Bowgun",
    name: "Abaddonian Chobotnice",
    rarity: 8,
    attack: 230,
    affinity: 15,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [1] },
      Spread: { levels: [3], rapidFire: true },
      Flaming: { levels: [1], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Opening Shot": 3 },
  },
  {
    type: "Light Bowgun",
    name: "Combat Conga",
    rarity: 8,
    attack: 220,
    affinity: 5,
    ammo: {
      Normal: { levels: [1, 2] },
      Pierce: { levels: [1, 2], rapidFire: true },
      Spread: { levels: [1, 2] },
      Flaming: { levels: [1, 2] },
    },
    slots: [3, 3, 1],
    skills: { "Special Ammo Boost": 2, "Opening Shot": 1 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "A3D66878-7537-4F16-9503-513ABF139781",
  //   rarity: 7,
  //   attack: 200,
  //   affinity: 0,
  //   slots: [3, 2, 0],
  //   skills: { "Tetrad Shot": 3, Airborne: 1 },
  // },
  {
    type: "Light Bowgun",
    name: "Windshear Uchibami",
    rarity: 8,
    attack: 220,
    affinity: 0,
    ammo: {
      Normal: { levels: [1, 2] },
      Pierce: { levels: [2, 3], rapidFire: true },
      Spread: { levels: [1, 2] },
      Water: { levels: [1, 2] },
      Freeze: { levels: [1, 2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Tetrad Shot": 3, Airborne: 1 },
  },
  {
    type: "Light Bowgun",
    name: "Bequeathed Animus",
    rarity: 8,
    attack: 210,
    affinity: 10,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [2], rapidFire: true },
      Spread: { levels: [1] },
      Flaming: { levels: [1] },
      Dragon: { levels: [1], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Tetrad Shot": 3 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "260A2B4F-9D44-4139-93E5-35A92AA0031F",
  //   rarity: 7,
  //   attack: 210,
  //   affinity: 0,
  //   slots: [3, 2, 0],
  //   skills: { Ballistics: 3 },
  // },
  {
    type: "Light Bowgun",
    name: "Kut-Ku Counterattack",
    rarity: 8,
    attack: 220,
    affinity: 0,
    ammo: {
      Normal: { levels: [2], rapidFire: true },
      Pierce: { levels: [1] },
      Spread: { levels: [1] },
      Flaming: { levels: [2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { Ballistics: 3 },
  },
  {
    type: "Light Bowgun",
    name: "Fulgursnipe Guardiana",
    rarity: 8,
    attack: 210,
    affinity: 15,
    ammo: {
      Normal: { levels: [2, 3], rapidFire: true },
      Pierce: { levels: [1, 2] },
      Spread: { levels: [1, 2] },
      Thunder: { levels: [1, 2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Critical Element": 3 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "18CF90C1-4958-448D-88AD-92F9A4C4A352",
  //   rarity: 7,
  //   attack: 190,
  //   affinity: 15,
  //   slots: [3, 2, 0],
  //   skills: { "Tetrad Shot": 3, "Poison Duration Up": 1 },
  // },
  {
    type: "Light Bowgun",
    name: "Valkyrie Flame",
    rarity: 8,
    attack: 210,
    affinity: 15,
    ammo: {
      Normal: { levels: [1, 2] },
      Pierce: { levels: [2, 3], rapidFire: true },
      Spread: { levels: [1, 2] },
      Sticky: { levels: [1] },
      Flaming: { levels: [1, 2] },
    },
    slots: [3, 2, 1],
    skills: { "Tetrad Shot": 3, "Poison Duration Up": 1 },
  },
  {
    type: "Light Bowgun",
    name: "Rathling Phoenix",
    rarity: 8,
    attack: 200,
    affinity: 10,
    ammo: {
      Normal: { levels: [1, 2] },
      Pierce: { levels: [1, 2], rapidFire: true },
      Spread: { levels: [1, 2] },
      Sticky: { levels: [1] },
      Flaming: { levels: [1, 2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Critical Boost": 3 },
  },
  // {
  //   type: "Light Bowgun",
  //   name: "02725472-A51A-4707-9B12-92AAEC525A77",
  //   rarity: 7,
  //   attack: 180,
  //   affinity: 20,
  //   slots: [3, 2, 0],
  //   skills: { "Critical Element": 3 },
  // },
  {
    type: "Light Bowgun",
    name: "Wahnschleuder",
    rarity: 8,
    attack: 200,
    affinity: 20,
    ammo: {
      Normal: { levels: [3], rapidFire: true },
      Pierce: { levels: [1] },
      Spread: { levels: [1] },
      Freeze: { levels: [1], rapidFire: true },
      Dragon: { levels: [1] },
    },
    slots: [3, 2, 1],
    skills: { "Critical Element": 3 },
  },
  {
    type: "Light Bowgun",
    name: "Tail Catapult",
    rarity: 8,
    attack: 230,
    affinity: 10,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [1] },
      Spread: { levels: [2], rapidFire: true },
      Freeze: { levels: [2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Opening Shot": 3 },
  },
  {
    type: "Light Bowgun",
    name: "Titan Panzer",
    rarity: 8,
    attack: 240,
    affinity: -15,
    ammo: {
      Normal: { levels: [3], rapidFire: true },
      Pierce: { levels: [1] },
      Spread: { levels: [1] },
      Sticky: { levels: [2] },
      Flaming: { levels: [2] },
    },
    slots: [3, 3, 1],
    skills: { "Special Ammo Boost": 2 },
  },
  {
    type: "Light Bowgun",
    name: "Animilater",
    rarity: 8,
    attack: 190,
    affinity: 5,
    ammo: {
      Normal: { levels: [2, 3], rapidFire: true },
      Pierce: { levels: [2, 3] },
      Spread: { levels: [2, 3] },
    },
    artian: { element: 0, status: 0 },
    slots: [3, 3, 3],
    skills: {},
  },
  {
    type: "Light Bowgun",
    name: "Blazing Kaiah",
    rarity: 8,
    attack: 220,
    affinity: 5,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [1] },
      Spread: { levels: [2], rapidFire: true },
      Sticky: { levels: [1] },
      Flaming: { levels: [2], rapidFire: true },
      Thunder: { levels: [2], rapidFire: true },
      Dragon: { levels: [1], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Whiteflame Torrent": 1 },
  },
  {
    type: "Light Bowgun",
    name: "Nifl Mist",
    rarity: 8,
    attack: 210,
    affinity: 15,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [2], rapidFire: true },
      Spread: { levels: [1] },
      Water: { levels: [2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Slicked Blade": 3, "Critical Element": 1 },
  },
  {
    type: "Light Bowgun",
    name: "Rebel Stopper",
    rarity: 8,
    attack: 210,
    affinity: 20,
    ammo: {
      Normal: { levels: [3], rapidFire: true },
      Pierce: { levels: [1] },
      Spread: { levels: [3], rapidFire: true },
      Flaming: { levels: [1] },
      Dragon: { levels: [1], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Bladescale Loading": 1, "Evading Reload": 1 },
  },
  {
    type: "Light Bowgun",
    name: "Thunderblitz Cannon",
    rarity: 8,
    attack: 220,
    affinity: 0,
    ammo: {
      Normal: { levels: [1] },
      Pierce: { levels: [2], rapidFire: true },
      Spread: { levels: [1] },
      Sticky: { levels: [1] },
      Freeze: { levels: [1] },
      Thunder: { levels: [2], rapidFire: true },
    },
    slots: [3, 2, 1],
    skills: { "Tetrad Shot": 2, "Convert Thunder Resistance": 1 },
  },
];
