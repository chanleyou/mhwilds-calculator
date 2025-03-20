import { Attack } from "@/types";

// vs HBG Ammo
// const NORMAL_MUL = 0.65;
// const PIERCE_MUL = 0.8;
// const SPREAD_MUL = 0.7;
// const STICKY_MUL = 0.5;
// const ELEMENT_MUL = 0.65;
// const CHASER_NORMAL_MUL = 1.4;
// const CHASER_PIERCE_MUL = 1.2;
// const CHASER_SPREAD_MUL = 0.85;
// const CHASER_ELEMENT_MUL = 0.75;
// const RF_NORMAL_MUL = 0.5;
// const RF_PIERCING_MUL = 0.65;
// const RF_SPREAD_MUL = 0.55;
// const RF_ELEMENT_MUL = 0.55;
// const RFC_NORMAL_MUL = 1.5;
// const RFC_SPREAD_MUL = 0.935;
// const RFC_PIERCING_MUL = 1.95;
// const RFC_ELEMENT_MUL = 0.935;

export const LightBowgunAttacks = [
  { name: "Normal Lv1", mv: 9.75, hits: 3, normalShot: true },
  { name: "Normal Lv2", mv: 13.65, hits: 3, normalShot: true },
  { name: "Normal Lv3", mv: 18.525, hits: 3, normalShot: true },
  { name: "Chaser Normal Lv1", mv: 19.5, normalShot: true, hits: 2 },
  { name: "Chaser Normal Lv2", mv: 27.3, normalShot: true, hits: 2 },
  { name: "Chaser Normal Lv3", mv: 37.05, normalShot: true, hits: 2 },
  { name: "Pierce Lv1", mv: 8.8, piercingShot: true },
  { name: "Pierce Lv2", mv: 9.6, piercingShot: true },
  { name: "Pierce Lv3", mv: 9.6, piercingShot: true },
  {
    name: "Chaser Pierce Lv1",
    mv: 13.2,
    piercingShot: true,
    hits: 2,
  },
  {
    name: "Chaser Pierce Lv2",
    mv: 14.4,
    piercingShot: true,
    hits: 2,
  },
  {
    name: "Chaser Pierce Lv3",
    mv: 14.4,
    piercingShot: true,
    hits: 2,
  },
  { name: "Spread Lv1", mv: 7.7, spreadPowerShot: true },
  { name: "Spread Lv2", mv: 8.855, spreadPowerShot: true },
  { name: "Spread Lv3", mv: 10.01, spreadPowerShot: true },
  { name: "Chaser Spread Lv1", mv: 9.35, spreadPowerShot: true, hits: 2 },
  { name: "Chaser Spread Lv2", mv: 10.7525, spreadPowerShot: true, hits: 2 },
  { name: "Chaser Spread Lv3", mv: 12.155, spreadPowerShot: true, hits: 2 },
  // {
  //   name: "Sticky Lv1",
  //   mv: 12.5,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  // {
  //   name: "Sticky Lv2",
  //   mv: 16,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  // {
  //   name: "Chaser Sticky Lv1",
  //   mv: 25,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  // {
  //   name: "Sticky Lv3",
  //   mv: 20,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  // { name: "Cluster Lv1", mv: 10, rawEle: 5, ignoreHzv: true },
  // { name: "Cluster Lv2", mv: 12, rawEle: 8, ignoreHzv: true },
  // { name: "Cluster Lv3", mv: 14, rawEle: 1, ignoreHzv: true },
  { name: "Element Lv1", mv: 5.2, rawEle: 13 },
  { name: "Element Lv2", mv: 6.5, rawEle: 16.25 },
  { name: "Chaser Element Lv1", mv: 6, rawEle: 15, hits: 2 },
  { name: "Chaser Element Lv2", mv: 7.5, rawEle: 18.75, hits: 2 },
  { name: "Rapid Fire Normal Lv1", mv: 7.5, normalShot: true, rapidFire: true },
  {
    name: "Rapid Fire Normal Lv2",
    mv: 10.5,
    normalShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Normal Lv3",
    mv: 14.25,
    normalShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Normal Lv1 Chaser Finisher",
    mv: 22.5,
    rapidFire: true,
    normalShot: true,
  },
  {
    name: "Rapid Fire Normal Lv2 Chaser Finisher",
    mv: 31.5,
    rapidFire: true,
    normalShot: true,
  },
  {
    name: "Rapid Fire Normal Lv3 Chaser Finisher",
    mv: 42.75,
    rapidFire: true,
    normalShot: true,
  },
  {
    name: "Rapid Fire Pierce Lv1",
    mv: 7.15,
    piercingShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Pierce Lv2",
    mv: 7.8,
    piercingShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Pierce Lv3",
    mv: 7.8,
    piercingShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Pierce Lv1 Chaser Finisher",
    mv: 21.45,
    rapidFire: true,
    piercingShot: true,
  },
  {
    name: "Rapid Fire Pierce Lv2 Chaser Finisher",
    mv: 23.4,
    rapidFire: true,
    piercingShot: true,
  },
  {
    name: "Rapid Fire Pierce Lv3 Chaser Finisher",
    mv: 23.4,
    rapidFire: true,
    piercingShot: true,
  },
  {
    name: "Rapid Fire Spread Lv1",
    mv: 6.05,
    spreadPowerShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Spread Lv2",
    mv: 6.9575,
    spreadPowerShot: true,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Spread Lv3",
    mv: 7.865,
    spreadPowerShot: true,
    rapidFire: true,
  },
  // {
  //   name: "Rapid Fire Sticky Lv1",
  //   mv: 8.75,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  // {
  //   name: "Rapid Fire Sticky Lv1 Chaser Finisher",
  //   mv: 21.875,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  // {
  //   name: "Rapid Fire Sticky Lv2",
  //   mv: 7.8,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   cantCrit: true,
  //   artilleryAmmo: true,
  // },
  {
    name: "Rapid Fire Spread Lv1 Chaser Finisher",
    mv: 10.285,
    rapidFire: true,
    spreadPowerShot: true,
  },
  {
    name: "Rapid Fire Spread Lv2 Chaser Finisher",
    mv: 11.82775,
    rapidFire: true,
    spreadPowerShot: true,
  },
  {
    name: "Rapid Fire Spread Lv3 Chaser Finisher",
    mv: 13.3705,
    rapidFire: true,
    spreadPowerShot: true,
  },
  { name: "Rapid Fire Element Lv1", mv: 4.4, rawEle: 11, rapidFire: true },
  { name: "Rapid Fire Element Lv2", mv: 5.5, rawEle: 13.75, rapidFire: true },
  {
    name: "Rapid Fire Element Lv1 Chaser Finisher",
    mv: 7.48,
    rawEle: 18.7,
    rapidFire: true,
  },
  {
    name: "Rapid Fire Element Lv2 Chaser Finisher",
    mv: 9.35,
    rawEle: 23.375,
    rapidFire: true,
  },
] satisfies Attack[];
