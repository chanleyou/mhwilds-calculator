import { Attack } from "@/types";
import { Ammo } from "./ammo";

const WH_MUL = 1.2;
const WH_MUL_2 = Math.pow(WH_MUL, 2);
const WH_MUL_3 = Math.pow(WH_MUL, 3);
const WH_MUL_MAX = Math.pow(WH_MUL, 4);

export const HeavyBowgunAttacks = [
  ...Object.values(Ammo).flatMap((m) => Object.values(m)),
  { name: "Wyvernheart Lv1 1", mv: 9.9, specialAmmo: true, rawType: "Shot" },
  {
    name: "Wyvernheart Lv1 2",
    mv: 9.9,
    rawMul: WH_MUL_2,
    specialAmmo: true,
    rawType: "Shot",
  },
  {
    name: "Wyvernheart Lv1 3",
    mv: 9.9,
    rawMul: WH_MUL_3,
    specialAmmo: true,
    rawType: "Shot",
  },
  {
    name: "Wyvernheart Lv1 Max",
    mv: 9.9,
    rawMul: WH_MUL_MAX,
    specialAmmo: true,
    rawType: "Shot",
  },
  { name: "Wyvernheart Lv2 1", mv: 10.8, specialAmmo: true, rawType: "Shot" },
  {
    name: "Wyvernheart Lv2 2",
    mv: 10.8,
    rawMul: WH_MUL_2,
    specialAmmo: true,
    rawType: "Shot",
  },
  {
    name: "Wyvernheart Lv2 3",
    mv: 10.8,
    rawMul: WH_MUL_3,
    specialAmmo: true,
    rawType: "Shot",
  },
  {
    name: "Wyvernheart Lv2 Max",
    mv: 10.8,
    rawMul: WH_MUL_MAX,
    specialAmmo: true,
    rawType: "Shot",
  },
  // {
  //   name: "Wyvernpiercer Lv 2",
  //   mv: 7.85,
  //   specialAmmo: true,
  // },
] satisfies Attack[];
