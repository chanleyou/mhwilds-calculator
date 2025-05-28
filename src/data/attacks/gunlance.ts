import { round } from "@/model";
import { Attack, ShellingType, ShellingTypes } from "@/types";

const CHARGED_SHELL_MUL = 1.8;

const MULTI_WSE_MUL = 1.1;

const FB_MUL = {
  Normal: 1.4,
  Long: 1.4,
  Wide: 1.35,
};

const WSFB_MUL = {
  Normal: 1.25,
  Long: 1.1,
  Wide: 1.05,
};

const Shelling = {
  Normal: {
    1: {
      shell: { mv: 7, fixedEle: 6 },
      wyvernFire: { mv: 39, fixedEle: 22 },
      wyrmstake: { mv: 23, fixedEle: 19 },
    },
    2: {
      shell: { mv: 8, fixedEle: 7 },
      wyvernFire: { mv: 43, fixedEle: 24 },
      wyrmstake: { mv: 25, fixedEle: 21 },
    },
    3: {
      shell: { mv: 9, fixedEle: 8 },
      wyvernFire: { mv: 47, fixedEle: 26 },
      wyrmstake: { mv: 28, fixedEle: 23 },
    },
  },
  Long: {
    1: {
      shell: { mv: 10, fixedEle: 14 },
      wyvernFire: { mv: 39, fixedEle: 22 },
      wyrmstake: { mv: 32, fixedEle: 19 },
    },
    2: {
      shell: { mv: 11, fixedEle: 15 },
      wyvernFire: { mv: 43, fixedEle: 24 },
      wyrmstake: { mv: 37, fixedEle: 21 },
    },
    3: {
      shell: { mv: 12, fixedEle: 16 },
      wyvernFire: { mv: 47, fixedEle: 26 },
      wyrmstake: { mv: 42, fixedEle: 23 },
    },
  },
  Wide: {
    1: {
      shell: { mv: 17, fixedEle: 9 },
      wyvernFire: { mv: 46, fixedEle: 24 },
      wyrmstake: { mv: 23, fixedEle: 19 },
    },
    2: {
      shell: { mv: 19, fixedEle: 10 },
      wyvernFire: { mv: 50, fixedEle: 26 },
      wyrmstake: { mv: 25, fixedEle: 21 },
    },
    3: {
      shell: { mv: 21, fixedEle: 11 },
      wyvernFire: { mv: 55, fixedEle: 29 },
      wyrmstake: { mv: 27, fixedEle: 23 },
    },
  },
} as const;

const s = {
  elementType: "Fire",
  ignoreSharpness: true,
  ignoreHzv: true,
  cantCrit: true,
} as const;

const shell = (
  name: string,
  type: ShellingType,
  level: 1 | 2 | 3,
  mvMul = 1,
) => ({
  ...s,
  name: `${type} Lv${level} ${name}`,
  mv: round(Shelling[type][level].shell.mv * mvMul, 4),
  fixedEle: round(Shelling[type][level].shell.fixedEle, 4),
  shelling: { type, level },
});

const wyvernFire = (type: ShellingType, level: 1 | 2 | 3) => ({
  ...s,
  ...Shelling[type][level].wyvernFire,
  name: `${type} Lv${level} Wyvern Fire 1`,
  shelling: { type, level },
});

const wyvernFireTwo = (type: ShellingType, level: 1 | 2 | 3) => ({
  ...wyvernFire(type, level),
  name: `${type} Lv${level} Wyvern Fire 2`,
  hits: 4,
  eleHzvCap: 5,
});

const wse = (type: ShellingType, level: 1 | 2 | 3) => ({
  ...s,
  ...Shelling[type][level].wyrmstake,
  name: `${type} Lv${level} Wyrmstake Explosion`,
  shelling: { type, level },
});

const mswe = (type: ShellingType, level: 1 | 2 | 3) => ({
  ...s,
  mv: round(Shelling[type][level].wyrmstake.mv * MULTI_WSE_MUL, 4),
  fixedEle: round(Shelling[type][level].wyrmstake.fixedEle * MULTI_WSE_MUL, 4),
  name: `${type} Lv${level} Multi Wyrmstake Explosion`,
  shelling: { type, level },
});

export const GunlanceAttacks: Attack[] = [
  { name: "Lateral Thrust I / II", mv: 24, eleMul: 2 },
  { name: "Lunging Upthrust", mv: 30 },
  { name: "Rising Slash", mv: 38, eleMul: 1.2 },
  { name: "Guard Thrust", mv: 18, eleMul: 2 },
  { name: "Overhead Smash", mv: 57, eleMul: 2 },
  {
    name: "Wide Sweep / Moving Wide Sweep / Aerial Burst",
    mv: 40,
    eleMul: 1.5,
  },
  { name: "(Multi) Wyrmstake Full Blast Sweep", mv: 30 },
  { name: "Wyrmstake Thrust", mv: 40, eleMul: 2 },
  { name: "Wyrmstake Full Blast Thrust", mv: 20 },
  { name: "Wyrmstake Attach", mv: 20, eleMul: 2 },
  { name: "Jumping Thrust", mv: 25 },
  { name: "Jumping Smash", mv: 44 },
  { name: "Jumping Rising Slash", mv: 35 },
  { name: "Focus Strike: Drake Auger", mv: 18 },
  {
    name: "Focus Strike: Drake Auger Ticks",
    mv: 7,
    eleMul: 0.5,
    shelling: { level: 0 },
  },
  {
    name: "Wyrmstake Lv1 Ticks",
    mv: 5,
    eleMul: 0.5,
    ignoreSharpness: true,
    shelling: { level: 1 },
  },
  {
    name: "Wyrmstake Lv2 Ticks",
    mv: 6,
    eleMul: 0.5,
    ignoreSharpness: true,
    shelling: { level: 2 },
  },
  {
    name: "Wyrmstake Lv3 Ticks",
    mv: 7,
    eleMul: 0.5,
    ignoreSharpness: true,
    shelling: { level: 3 },
  },
  ...ShellingTypes.flatMap((type) => {
    return ([1, 2, 3] as const).flatMap((level) => [
      shell("Shell", type, level),
      shell("Charged Shell", type, level, CHARGED_SHELL_MUL),
      shell("Full Burst Shell", type, level, FB_MUL[type]),
      shell("Wyrmstake Full Burst Shell", type, level, WSFB_MUL[type]),
      wse(type, level),
      mswe(type, level),
      wyvernFire(type, level),
      wyvernFireTwo(type, level),
    ]);
  }),
];
