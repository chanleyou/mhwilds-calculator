import { produce } from "immer";
import { round } from "@/model";
import { AmmoType, Attack } from "@/types";
import { Ammo } from "./ammo";

const ELE_MV_MUL = 0.68;

const MV_MUL: Record<AmmoType, number> = {
  Normal: 0.65,
  Pierce: 0.8,
  Spread: 0.7,
  Sticky: 0.5,
  Flaming: ELE_MV_MUL,
  Water: ELE_MV_MUL,
  Freeze: ELE_MV_MUL,
  Thunder: ELE_MV_MUL,
  Dragon: 0.7,
  Slicing: 0.8,
  // no LBG
  Wyvern: 0,
  Cluster: 0,
};

const C_ELE_MV_MUL = 0.75;

const C_MV_MUL: Record<AmmoType, number> = {
  Normal: 1.3,
  Pierce: 1.2,
  Spread: 0.85,
  Sticky: 1,
  Flaming: C_ELE_MV_MUL,
  Water: C_ELE_MV_MUL,
  Freeze: C_ELE_MV_MUL,
  Thunder: C_ELE_MV_MUL,
  Dragon: 1.1, // 1.2 for Element
  Slicing: 1,
  // no LBG
  Wyvern: 0,
  Cluster: 0,
};

const RF_ELE_MV_MUL = 0.58;

const RF_MV_MUL: Record<AmmoType, number> = {
  Normal: 0.5,
  Pierce: 0.65,
  Spread: 0.55,
  Sticky: 35,
  Flaming: RF_ELE_MV_MUL,
  Water: RF_ELE_MV_MUL,
  Freeze: RF_ELE_MV_MUL,
  Thunder: RF_ELE_MV_MUL,
  Dragon: 0.65,
  Slicing: 0.55,
  // no LBG
  Wyvern: 0,
  Cluster: 0,
};

const RF_C_ELE_MV_MUL = 0.986;

const RF_C_MV_MUL: Record<AmmoType, number> = {
  Normal: 1.5,
  Pierce: 1.95,
  Spread: 0.935,
  Sticky: 0.87,
  Flaming: RF_C_ELE_MV_MUL,
  Water: RF_C_ELE_MV_MUL,
  Freeze: RF_C_ELE_MV_MUL,
  Thunder: RF_C_ELE_MV_MUL,
  Dragon: 1.5, // 1.4 for Element
  Slicing: 1,
  // no LBG
  Wyvern: 0,
  Cluster: 0,
};

const AmmoLBG = produce(Ammo, (d) => void (d.Normal[3].mv = 30.6));

export const LightBowgunAttacks = [
  ...Object.values(AmmoLBG)
    .flatMap((m) => Object.values(m))
    .filter((a) => a.ammo?.type !== "Cluster" && a.ammo?.type !== "Wyvern")
    .map((a) => [
      produce(a, (d) => {
        d.mv = round(d.mv * MV_MUL[d.ammo.type], 5);
        if (d.rawEle) d.rawEle = round(d.rawEle * MV_MUL[d.ammo.type], 5);
      }),
      produce(a, (d) => {
        d.name = `${d.name} Chaser`;
        d.mv = round(d.mv * C_MV_MUL[d.ammo.type], 5);
        if (d.rawEle) {
          if (d.elementType === "Dragon") d.rawEle = round(d.rawEle * 1.2, 5);
          else d.rawEle = round(d.rawEle * C_MV_MUL[d.ammo.type], 5);
        }
      }),
      produce(a, (d) => {
        d.name = `Rapid ${d.name}`;
        d.mv = round(d.mv * RF_MV_MUL[d.ammo.type], 5);
        if (d.rawEle) d.rawEle = round(d.rawEle * RF_MV_MUL[d.ammo.type], 5);
      }),
      produce(a, (d) => {
        d.name = `Rapid ${d.name} Chaser`;
        d.mv = round(d.mv * RF_C_MV_MUL[d.ammo.type], 5);
        if (d.rawEle) {
          if (d.elementType === "Dragon") d.rawEle = round(d.rawEle * 1.4, 5);
          else d.rawEle = round(d.rawEle * RF_C_MV_MUL[d.ammo.type], 5);
        }
      }),
    ])
    .flat(),
] satisfies Attack[];
