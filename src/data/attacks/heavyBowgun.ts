import { Attack } from "@/types";

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
  // {
  //   name: "Sticky Lv1",
  //   mv: 25,
  //   fixedEle: 5,
  //   cantCrit: true,
  //   ignoreHzv: true,
  //   stickyAmmo: true,
  // },
  // {
  //   name: "Sticky Lv2",
  //   mv: 32,
  //   fixedEle: 5,
  //   cantCrit: true,
  //   ignoreHzv: true,
  //   stickyAmmo: true,
  // },
  // {
  //   name: "Sticky Lv3",
  //   mv: 40,
  //   fixedEle: 5,
  //   ignoreHzv: true,
  //   stickyAmmo: true,
  // },
  // { name: "Sticky Lv3", mv: 40, rawEle: 8.5, ignoreHzv: true },
  // { name: "Cluster Lv1", mv: 10, rawEle: 5, ignoreHzv: true },
  // { name: "Cluster Lv2", mv: 12, rawEle: 8, ignoreHzv: true },
  // { name: "Cluster Lv3", mv: 14, rawEle: 10, ignoreHzv: true },
  { name: "Element Lv1", mv: 8, rawEle: 20 },
  { name: "Element Lv2", mv: 10, rawEle: 25 },
] satisfies Attack[];
