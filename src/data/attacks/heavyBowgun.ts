import { Attack } from "@/types";

const WH_MUL = 1.2;
const WH_MUL_2 = Math.pow(WH_MUL, 2);
const WH_MUL_3 = Math.pow(WH_MUL, 3);
const WH_MUL_MAX = Math.pow(WH_MUL, 4);

export const HeavyBowgunAttacks = [
  { name: "Normal Lv1", mv: 15, hits: 3, normalShot: true },
  { name: "Normal Lv2", mv: 21, hits: 3, normalShot: true },
  { name: "Normal Lv3", mv: 28.5, hits: 3, normalShot: true },
  { name: "Pierce Lv1", mv: 11, piercingShot: true },
  { name: "Pierce Lv2", mv: 12, piercingShot: true },
  { name: "Pierce Lv3", mv: 12, piercingShot: true },
  { name: "Spread Lv1", mv: 11, spreadPowerShot: true },
  { name: "Spread Lv2", mv: 12.65, spreadPowerShot: true },
  { name: "Spread Lv3", mv: 14.3, spreadPowerShot: true },
  { name: "Slicing", mv: 33 },
  {
    name: "Sticky Lv1",
    mv: 25,
    fixedEle: 5,
    cantCrit: true,
    ignoreHzv: true,
    artilleryAmmo: true,
  },
  {
    name: "Sticky Lv2",
    mv: 32,
    fixedEle: 5,
    cantCrit: true,
    ignoreHzv: true,
    artilleryAmmo: true,
  },
  {
    name: "Sticky Lv3",
    mv: 40,
    fixedEle: 5,
    cantCrit: true,
    ignoreHzv: true,
    artilleryAmmo: true,
  },
  { name: "Cluster Lv1", mv: 23, fixedEle: 5, cantCrit: true, ignoreHzv: true },
  {
    name: "Cluster Lv2",
    mv: 27.5,
    fixedEle: 5,
    cantCrit: true,
    ignoreHzv: true,
  },
  {
    name: "Cluster Lv3",
    mv: 32.2,
    fixedEle: 5,
    cantCrit: true,
    ignoreHzv: true,
  },
  {
    name: "Wyvern Lv1",
    mv: 80,
    fixedEle: 20,
    cantCrit: true,
    ignoreHzv: true,
    artilleryAmmo: true,
  },
  { name: "Element Lv1", mv: 8, rawEle: 20 },
  { name: "Element Lv2", mv: 10, rawEle: 25 },
  { name: "Dragon Lv1", mv: 20, rawEle: 44 },

  { name: "Wyvernheart Lv1 1", mv: 9.9, specialAmmo: true },
  { name: "Wyvernheart Lv1 2", mv: 9.9, rawMul: WH_MUL_2, specialAmmo: true },
  {
    name: "Wyvernheart Lv1 3",
    mv: 9.9,
    rawMul: WH_MUL_3,
    specialAmmo: true,
  },
  {
    name: "Wyvernheart Lv1 Max",
    mv: 9.9,
    rawMul: WH_MUL_MAX,
    specialAmmo: true,
  },
  { name: "Wyvernheart Lv2 1", mv: 10.8, specialAmmo: true },
  {
    name: "Wyvernheart Lv2 2",
    mv: 10.8,
    rawMul: WH_MUL_2,
    specialAmmo: true,
  },
  {
    name: "Wyvernheart Lv2 3",
    mv: 10.8,
    rawMul: WH_MUL_3,
    specialAmmo: true,
  },
  {
    name: "Wyvernheart Lv2 Max",
    mv: 10.8,
    rawMul: WH_MUL_MAX,
    specialAmmo: true,
  },
  // {
  //   name: "Wyvernpiercer Lv 2",
  //   mv: 7.85,
  //   specialAmmo: true,
  // },
] satisfies Attack[];
