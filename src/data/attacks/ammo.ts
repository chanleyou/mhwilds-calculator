import { AmmoType, BowgunAttack } from "@/types";

const ELE_1_MV = 8;
const ELE_2_MV = 10;

const ELE_1_RAW_ELE = 20;
const ELE_2_RAW_ELE = 25;

const normal = (level: number, mv: number): BowgunAttack => ({
  name: `Normal Lv${level}`,
  mv,
  normalShot: true,
  rawType: "Shot",
  ammo: { type: "Normal", level },
});

export const Ammo: Record<AmmoType, Record<number, BowgunAttack>> = {
  Normal: {
    1: normal(1, 17),
    2: normal(2, 23.8),
    3: normal(3, 32.3),
  },
  Pierce: {
    1: {
      name: "Pierce Lv1",
      mv: 11,
      piercingShot: true,
      rawType: "Shot",
      ammo: { type: "Pierce", level: 1 },
    },
    2: {
      name: "Pierce Lv2",
      mv: 12,
      piercingShot: true,
      rawType: "Shot",
      ammo: { type: "Pierce", level: 2 },
    },
    3: {
      name: "Pierce Lv3",
      mv: 12,
      piercingShot: true,
      rawType: "Shot",
      ammo: { type: "Pierce", level: 3 },
    },
  },
  Spread: {
    1: {
      name: "Spread Lv1",
      mv: 13,
      spreadPowerShot: true,
      rawType: "Shot",
      ammo: { type: "Spread", level: 1 },
    },
    2: {
      name: "Spread Lv2",
      mv: 15.6,
      spreadPowerShot: true,
      rawType: "Shot",
      ammo: { type: "Spread", level: 2 },
    },
    3: {
      name: "Spread Lv3",
      mv: 18.2,
      spreadPowerShot: true,
      rawType: "Shot",
      ammo: { type: "Spread", level: 3 },
    },
  },
  Slicing: {
    1: { name: "Slicing", mv: 33, ammo: { type: "Slicing", level: 1 } },
  },
  Sticky: {
    1: {
      name: "Sticky Lv1",
      mv: 30,
      fixedEle: 5,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      artilleryAmmo: true,
      ammo: { type: "Sticky", level: 1 },
    },
    2: {
      name: "Sticky Lv2",
      mv: 38.4,
      fixedEle: 5,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      artilleryAmmo: true,
      ammo: { type: "Sticky", level: 2 },
    },
    3: {
      name: "Sticky Lv3",
      mv: 48,
      fixedEle: 5,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      artilleryAmmo: true,
      ammo: { type: "Sticky", level: 3 },
    },
  },
  Cluster: {
    1: {
      name: "Cluster Lv1",
      mv: 23,
      fixedEle: 5,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      ammo: { type: "Cluster", level: 1 },
    },
    2: {
      name: "Cluster Lv2",
      mv: 27.5,
      fixedEle: 5,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      ammo: { type: "Cluster", level: 2 },
    },
    3: {
      name: "Cluster Lv3",
      mv: 32.2,
      fixedEle: 5,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      ammo: { type: "Cluster", level: 3 },
    },
  },
  Wyvern: {
    1: {
      name: "Wyvern Lv1",
      mv: 80,
      fixedEle: 20,
      elementType: "Fire",
      cantCrit: true,
      ignoreHzv: true,
      artilleryAmmo: true,
      ammo: { type: "Wyvern", level: 1 },
    },
  },
  Flaming: {
    1: {
      name: "Flaming Lv1",
      mv: ELE_1_MV,
      rawEle: ELE_1_RAW_ELE,
      elementType: "Fire",
      rawType: "Shot",
      ammo: { type: "Flaming", level: 1 },
    },
    2: {
      name: "Flaming Lv2",
      mv: ELE_2_MV,
      rawEle: ELE_2_RAW_ELE,
      elementType: "Fire",
      rawType: "Shot",
      ammo: { type: "Flaming", level: 2 },
    },
  },
  Water: {
    1: {
      name: "Water Lv1",
      mv: ELE_1_MV,
      rawEle: ELE_1_RAW_ELE,
      elementType: "Water",
      rawType: "Shot",
      ammo: { type: "Water", level: 1 },
    },
    2: {
      name: "Water Lv2",
      mv: ELE_2_MV,
      rawEle: ELE_2_RAW_ELE,
      elementType: "Water",
      rawType: "Shot",
      ammo: { type: "Water", level: 2 },
    },
  },
  Freeze: {
    1: {
      name: "Freeze Lv1",
      mv: ELE_1_MV,
      rawEle: ELE_1_RAW_ELE,
      elementType: "Ice",
      rawType: "Shot",
      ammo: { type: "Freeze", level: 1 },
    },
    2: {
      name: "Freeze Lv2",
      mv: ELE_2_MV,
      rawEle: ELE_2_RAW_ELE,
      elementType: "Ice",
      rawType: "Shot",
      ammo: { type: "Freeze", level: 2 },
    },
  },
  Thunder: {
    1: {
      name: "Thunder Lv1",
      mv: ELE_1_MV,
      rawEle: ELE_1_RAW_ELE,
      elementType: "Thunder",
      rawType: "Shot",
      ammo: { type: "Thunder", level: 1 },
    },
    2: {
      name: "Thunder Lv2",
      mv: ELE_2_MV,
      rawEle: ELE_2_RAW_ELE,
      elementType: "Thunder",
      rawType: "Shot",
      ammo: { type: "Thunder", level: 2 },
    },
  },
  Dragon: {
    1: {
      name: "Dragon Lv1",
      mv: 20,
      rawEle: 44,
      elementType: "Dragon",
      rawType: "Shot",
      ammo: { type: "Dragon", level: 1 },
    },
  },
} as const;
