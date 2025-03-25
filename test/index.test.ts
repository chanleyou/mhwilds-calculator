import { expect, test } from "vitest";
import {
  calculateAttack,
  calculateBowgunElement,
  calculateCrit,
  calculateEleHit,
  calculateElement,
  calculateHit,
  calculateRawHit,
  dmg,
} from "@/model";
import { Sharpness, WeaponType } from "@/types";
import { atk, buff, display } from "./utils";

const base = {
  uiElement: 0,
  rawHzv: 80,
  eleHzv: 30,
  critMulti: 1.25,
  eleCritMulti: 1,
};

// 230 Attack, Attack Boost 4, Offensive Guard 3, Powercharm
const a = calculateAttack({
  attack: 230,
  buffs: {
    AttackBoost: buff("AttackBoost", 4),
    OffensiveGuard: buff("OffensiveGuard", 3),
    Powercharm: buff("Powercharm"),
  },
});
// 210 Attack, Attack Boost 5, Powercharm
const b = calculateAttack({
  attack: 210,
  buffs: {
    AttackBoost: buff("AttackBoost", 5),
    Powercharm: buff("Powercharm"),
  },
});
// 180 Element, Element Attack 1
const c = calculateElement({
  element: 180,
  buffs: { ElementAttack: buff("ElementAttack", 1) },
});
// 180 Element, Element Attack 3, Coalescence 1, Frenzy
const d = calculateElement({
  element: 180,
  buffs: {
    ElementAttack: buff("ElementAttack", 3),
    Coalescence: buff("CoalescenceHeavy", 1),
  },
  frenzy: true,
});

// 210 Attack, 400 Element
const h1 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: buff("HornSelfImprovement"),
    Powercharm: buff("Powercharm"),
  },
});
const h2 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: buff("HornSelfImprovement"),
    HornAttackUp: buff("HornAttackUp", 1),
    Powercharm: buff("Powercharm"),
  },
});
const h3 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: buff("HornSelfImprovement"),
    HornAttackUp: buff("HornAttackUp", 2),
    Powercharm: buff("Powercharm"),
  },
});

test("calculateAttack", () => {
  expect(a).toBe(283.8);
  expect(b).toBe(233.4);
  expect(c).toBe(220);

  expect(display(h1)).toBe(258);
  expect(display(h2)).toBe(270);
  expect(display(h3)).toBe(283);
});

test("calculateElement", () => {
  expect(Math.round(d)).toBe(298);
});

test("calculateHit", () => {
  expect(
    calculateHit({
      name: "",
      ...base,
      uiAttack: a,
      sharpness: "Blue",
      mv: 27,
    }),
  ).toBe(73.6);
  expect(
    calculateHit({
      name: "",
      ...base,
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      mv: 21,
    }),
  ).toBe(59.4);
  expect(
    calculateHit({
      name: "",
      ...base,
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      mv: 45,
    }),
  ).toBe(118.5);

  expect(
    calculateHit({
      name: "",
      ...base,
      uiAttack: h3,
      uiElement: 400,
      mv: 32,
      sharpness: "White",
    }),
  ).toBe(109.5);
});

test("calculateCrit", () => {
  expect(
    calculateCrit({
      name: "",
      ...base,
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      mv: 21,
    }),
  ).toBe(72.3);
  expect(
    calculateCrit({
      name: "",
      ...base,
      uiAttack: h3,
      uiElement: 400,
      sharpness: "White",
      critMulti: 1.34,
      eleCritMulti: 1,
      mv: 32,
    }),
  ).toBe(142);
});

test("Hunting Horn", () => {
  const m1 = atk("Hunting Horn", "Echo Bubble");
  const m2 = atk("Hunting Horn", "Echo Bubble (Note)");
  const m3 = atk("Hunting Horn", "Echo Bubble (Song)");

  const a1 = {
    uiAttack: 260,
    uiElement: 400,
    sharpness: "White" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
  };

  expect(calculateHit({ ...a1, ...m1 })).toBe(81.6);
  expect(calculateHit({ ...a1, ...m2 })).toBe(16.6);
  expect(calculateHit({ ...a1, ...m3 })).toBe(34.8);

  const a2 = {
    ...a1,
    uiAttack: 236,
    uiElement: 410,
    sharpness: "Green" as Sharpness,
  };

  expect(calculateHit({ ...a2, ...m1 })).toBe(74.5);
  expect(calculateHit({ ...a2, ...m2 })).toBe(15.5);
  expect(calculateHit({ ...a2, ...m3 })).toBe(32);
});

test("Light Bowgun", () => {
  const a1 = {
    ...base,
    uiAttack: 131,
    sharpness: "Ranged" as Sharpness,
    weapon: "Light Bowgun" as WeaponType,
  };

  const sp1 = atk("Light Bowgun", "Spread Lv1");
  const sp2 = atk("Light Bowgun", "Spread Lv2");
  const csp1 = atk("Light Bowgun", "Chaser Spread Lv1");
  const csp2 = atk("Light Bowgun", "Chaser Spread Lv2");
  const p2 = atk("Light Bowgun", "Pierce Lv2");
  const e1 = atk("Light Bowgun", "Element Lv1");
  const e2 = atk("Light Bowgun", "Element Lv2");
  const cp2 = atk("Light Bowgun", "Chaser Pierce Lv2");
  const ce2 = atk("Light Bowgun", "Chaser Element Lv2");
  const rfp2 = atk("Light Bowgun", "Rapid Fire Pierce Lv2");
  const rfe2 = atk("Light Bowgun", "Rapid Fire Element Lv2");
  const rfcp2 = atk("Light Bowgun", "Rapid Fire Pierce Lv2 Chaser");
  const rfce2 = atk("Light Bowgun", "Rapid Fire Element Lv2 Chaser");

  expect(calculateHit({ ...a1, ...sp1 })).toBe(8.1);

  const a2 = { ...a1, uiAttack: 180, bowgunElement: { base: 180, bonus: 0 } };
  expect(dmg(calculateRawHit({ ...a2, ...e2 }))).toBe(9.4);
  expect(dmg(calculateEleHit({ ...a2, ...e2 }))).toBe(8.8);

  const a3 = {
    ...a1,
    uiAttack: 226,
    bowgunElement: calculateBowgunElement({ element: 226 }),
  };

  expect(calculateHit({ ...a3, ...p2 })).toBe(17.4);
  expect(calculateHit({ ...a3, ...sp1 })).toBe(13.9);
  expect(calculateHit({ ...a3, ...csp1 })).toBe(16.9);
  expect(calculateHit({ ...a3, ...cp2 })).toBe(26);
  expect(calculateHit({ ...a3, ...rfp2 })).toBe(14.1);
  expect(calculateHit({ ...a3, ...rfp2, rapidFireMul: 1.05 })).toBe(14.8);
  expect(calculateHit({ ...a3, ...rfcp2 })).toBe(42.3);
  expect(calculateHit({ ...a3, ...rfcp2, rapidFireMul: 1.05 })).toBe(44.4);

  expect(dmg(calculateRawHit({ ...a3, ...e2 }))).toBe(11.8);
  expect(dmg(calculateEleHit({ ...a3, ...e2 }))).toBe(11);
  expect(dmg(calculateRawHit({ ...a3, ...ce2 }))).toBe(13.6);
  expect(dmg(calculateEleHit({ ...a3, ...ce2 }))).toBe(12.7);
  expect(dmg(calculateRawHit({ ...a3, ...rfe2 }))).toBe(9.9);
  expect(dmg(calculateEleHit({ ...a3, ...rfe2 }))).toBe(9.3);
  expect(dmg(calculateEleHit({ ...a3, ...rfe2, rapidFireMul: 1.05 }))).toBe(
    9.8,
  );
  expect(dmg(calculateRawHit({ ...a3, ...rfce2 }))).toBe(16.9);
  expect(dmg(calculateEleHit({ ...a3, ...rfce2 }))).toBe(15.8);
  expect(dmg(calculateEleHit({ ...a3, ...rfce2, rapidFireMul: 1.05 }))).toBe(
    16.6,
  );

  const a4 = {
    ...a3,
    bowgunElement: calculateBowgunElement({
      element: 226,
      buffs: { ElementAttack: buff("ElementAttack", 1) },
    }),
  };
  // expect(round(calculateRawHit({ ...a4, ...e2 }))).toBe(12.4);
  expect(dmg(calculateEleHit({ ...a4, ...e2 }))).toBe(12.2);

  const a5 = {
    ...a4,
    uiAttack: 226,
    bowgunElement: calculateBowgunElement({
      element: 226,
      buffs: { ElementAttack: buff("ElementAttack", 2) },
    }),
  };
  expect(dmg(calculateEleHit({ ...a5, ...e2 }))).toBe(13.6);

  const a6 = {
    ...a4,
    uiAttack: 226,
    bowgunElement: calculateBowgunElement({
      element: 226,
      buffs: { ElementAttack: buff("ElementAttack", 3) },
    }),
  };
  expect(dmg(calculateEleHit({ ...a6, ...e2 }))).toBe(15);
  expect(dmg(calculateEleHit({ ...a6, ...rfe2 }))).toBe(13);
  expect(dmg(calculateEleHit({ ...a6, ...rfe2, rapidFireMul: 1.05 }))).toBe(
    13.5,
  );
  expect(dmg(calculateEleHit({ ...a6, ...rfce2 }))).toBe(20.8);
  expect(dmg(calculateEleHit({ ...a6, ...rfce2, rapidFireMul: 1.05 }))).toBe(
    21.8,
  );

  const a7 = {
    ...a1,
    uiAttack: 166,
    bowgunElement: calculateBowgunElement({ element: 166 }),
  };
  expect(dmg(calculateEleHit({ ...a7, ...e1 }))).toBe(6.5);

  const a8 = {
    ...a1,
    uiAttack: 166,
    bowgunElement: calculateBowgunElement({
      element: 166,
      buffs: {
        ElementAttack: buff("ElementAttack", 1),
      },
    }),
  };
  expect(dmg(calculateEleHit({ ...a8, ...e1 }))).toBe(7.7);

  const a9 = {
    ...a1,
    uiAttack: 166,
    bowgunElement: calculateBowgunElement({
      element: 166,
      buffs: {
        ElementAttack: buff("ElementAttack", 3),
      },
    }),
  };
  expect(dmg(calculateEleHit({ ...a9, ...e1 }))).toBe(9.6);

  const rfsp2 = atk("Light Bowgun", "Rapid Fire Spread Lv2");
  const rfcsp2 = atk("Light Bowgun", "Rapid Fire Spread Lv2 Chaser");
  const a10 = { ...a1, uiAttack: 206 };

  expect(calculateHit({ ...a10, ...sp2 })).toBe(14.6);
  expect(calculateHit({ ...a10, ...csp2 })).toBe(17.7);
  expect(calculateHit({ ...a10, ...rfsp2 })).toBe(11.5);
  expect(calculateHit({ ...a10, ...rfcsp2 })).toBe(19.5);
});

test("Light Bowgun Sticky Ammo", () => {
  const a1 = {
    ...base,
    attack: 180,
    uiAttack: 186,
    sharpness: "Ranged" as Sharpness,
    weapon: "Light Bowgun" as WeaponType,
    artilleryAmmoAttack: calculateAttack({
      attack: 180,
      buffs: {
        Artillery: { attackMul: 1.3 },
        Powercharm: buff("Powercharm"),
      },
    }),
  };

  const st1 = atk("Light Bowgun", "Sticky Lv1");
  const cst1 = atk("Light Bowgun", "Chaser Sticky Lv1");
  const rfst1 = atk("Light Bowgun", "Rapid Fire Sticky Lv1");
  const rfcst1 = atk("Light Bowgun", "Rapid Fire Sticky Lv1 Chaser");
  expect(calculateHit({ ...a1, ...st1 })).toBe(31.5);
  expect(calculateHit({ ...a1, ...cst1 })).toBe(61.5);
  expect(calculateHit({ ...a1, ...rfst1 })).toBe(22.5);
  expect(calculateHit({ ...a1, ...rfcst1 })).toBe(54);

  const a2 = {
    ...a1,
    artilleryAmmoAttack: calculateAttack({
      attack: 180,
      buffs: {
        AttackBoost: buff("AttackBoost", 3),
        Agitator: buff("Agitator", 5),
        Powercharm: buff("Powercharm"),
        Artillery: { attackMul: 1.3 },
      },
    }),
  };

  expect(dmg(calculateRawHit({ ...a2, ...st1 }))).toBe(33.4);
  expect(dmg(calculateRawHit({ ...a2, ...cst1 }))).toBe(66.8);
  expect(dmg(calculateRawHit({ ...a2, ...rfst1 }))).toBe(23.4);
  expect(dmg(calculateRawHit({ ...a2, ...rfcst1 }))).toBe(58.4);

  const a3 = {
    ...a1,
    artilleryAmmoAttack: calculateAttack({
      attack: 180,
      buffs: {
        AttackBoost: buff("AttackBoost", 3),
        Heroics: buff("Heroics", 5),
        Agitator: buff("Agitator", 5),
        Powercharm: buff("Powercharm"),
        Artillery: { attackMul: 1.3 },
      },
    }),
  };
  expect(calculateRawHit({ ...a3, ...st1 })).toBeCloseTo(42.1, 0.05);
  expect(calculateHit({ ...a3, ...st1 })).toBeCloseTo(43.6, 0.05);
  expect(calculateHit({ ...a3, ...cst1 })).toBe(85.8);
  expect(calculateHit({ ...a3, ...rfst1 })).toBe(31);
  expect(dmg(calculateRawHit({ ...a3, ...rfcst1 }))).toBe(73.8);
});

test("Heavy Bowgun", () => {
  const a1 = {
    ...base,
    attack: 180,
    uiAttack: 191,
    bowgunElement: { base: 191, bonus: 0 },
    sharpness: "Ranged" as Sharpness,
    weapon: "Heavy Bowgun" as WeaponType,
  };

  const e1 = atk("Heavy Bowgun", "Flaming Lv1");
  const e2 = atk("Heavy Bowgun", "Flaming Lv2");
  const p1 = atk("Heavy Bowgun", "Pierce Lv1");
  const sp2 = atk("Heavy Bowgun", "Spread Lv2");
  // const st1 = atk("Heavy Bowgun", "Sticky Lv1");
  // const st2 = atk("Heavy Bowgun", "Sticky Lv2");
  // const c2 = HeavyBowgunAttacks.find((a) => a.name === "Cluster Lv2")!;

  expect(calculateHit({ ...a1, ...e1 })).toBe(23.7);
  expect(calculateHit({ ...a1, ...e2 })).toBe(29.6);
  expect(calculateHit({ ...a1, ...p1 })).toBe(16.8);
  expect(calculateHit({ ...a1, ...sp2 })).toBe(19.3);

  const a2 = { ...a1, uiAttack: 221, bowgunElement: { base: 221, bonus: 0 } };
  expect(calculateHit({ ...a2, ...e2 })).toBe(34.3);

  const a3 = { ...a1, uiAttack: 258, bowgunElement: { base: 258, bonus: 0 } };
  expect(calculateHit({ ...a3, ...e2 })).toBe(40);

  const a4 = { ...a1, uiAttack: 278, bowgunElement: { base: 278, bonus: 0 } };
  expect(calculateHit({ ...a4, ...e1 })).toBe(34.5);
  expect(calculateHit({ ...a4, ...e2 })).toBe(43.1);
  expect(calculateHit({ ...a4, ...e2, eleMul: 1.3 })).toBe(49.3);
  expect(dmg(calculateEleHit({ ...a4, ...e1 }))).toBe(16.7);

  // Tetrad Shot 3
  expect(dmg(calculateEleHit({ ...a4, eleMul: 1.05, ...e2 }))).toBe(21.9);

  const a5 = {
    ...a1,
    uiAttack: 236,
    bowgunElement: calculateBowgunElement({
      element: 236,
      buffs: { ElementAttack: buff("ElementAttack", 3) },
    }),
  };
  expect(dmg(calculateRawHit({ ...a5, ...e2 }))).toBe(18.9);
  expect(dmg(calculateEleHit({ ...a5, ...e2 }))).toBe(23);

  const a6 = {
    ...a1,
    uiAttack: 186,
    bowgunElement: calculateBowgunElement({
      element: 186,
      buffs: { ElementAttack: buff("ElementAttack", 3) },
    }),
  };
  expect(dmg(calculateEleHit({ ...a6, ...e1 }))).toBe(15.2);
});

test("Heavy Bowgun Sticky Ammo", () => {
  const a1 = {
    ...base,
    attack: 180,
    uiAttack: 186,
    sharpness: "Ranged" as Sharpness,
  };

  const st2 = atk("Heavy Bowgun", "Sticky Lv2");
  expect(calculateHit({ ...a1, ...st2 })).toBe(61);

  const a2 = { ...a1, uiAttack: 201 };
  expect(calculateHit({ ...a2, ...st2 })).toBe(65.8);

  expect(
    calculateHit({
      ...a2,
      ...st2,
      artilleryAmmoAttack: 180 * 1.3 + 21,
      ...buff("Artillery", 3),
    }),
  ).toBe(83.1);
});

test("Heavy Bowgun Cluster Ammo", () => {
  const a1 = {
    ...base,
    attack: 240,
    uiAttack: calculateAttack({
      attack: 240,
      buffs: {
        // Heroics: buff("Heroics", 5),
        // AttackBoost: buff("AttackBoost", 5),
        Powercharm: buff("Powercharm"),
        // Agitator: buff("Agitator", 5),
      },
    }),
    sharpness: "Ranged" as Sharpness,
  };

  const c3 = atk("Heavy Bowgun", "Cluster Lv3");
  expect(dmg(calculateRawHit({ ...a1, ...c3 }))).toBe(79.2);

  const a2 = {
    ...a1,
    uiAttack: calculateAttack({
      attack: 240,
      buffs: {
        Heroics: buff("Heroics", 5),
        AttackBoost: buff("AttackBoost", 5),
        Powercharm: buff("Powercharm"),
        Agitator: buff("Agitator", 5),
      },
    }),
  };

  expect(dmg(calculateRawHit({ ...a2, ...c3 }))).toBe(115.8);
});

test("Bow", () => {
  const cs1 = atk("Bow", "Charged Shot Lv1");
  const cs2 = atk("Bow", "Charged Shot Lv2");
  const cs3 = atk("Bow", "Charged Shot Lv3");
  const qs = atk("Bow", "Quick Shot / Power Shot Lv 1");
  const ps2 = atk("Bow", "Power Shot Lv2");
  const ps3 = atk("Bow", "Power Shot Lv3");
  const pv1 = atk("Bow", "Power Volley Lv1");
  const pv2 = atk("Bow", "Power Volley Lv2");
  const pv3 = atk("Bow", "Power Volley Lv3");
  const as1 = atk("Bow", "Arc Shot Lv1");
  const as2 = atk("Bow", "Arc Shot Lv2");
  const as3 = atk("Bow", "Arc Shot Lv3");
  const ase = atk("Bow", "Arc Shot Explosion");
  const dp = atk("Bow", "Dragon Piercer");
  const td = atk("Bow", "Thousand Dragons");
  const pcs3 = atk("Bow", "Pierce Charge Shot Lv3");
  const ptd = atk("Bow", "Pierce Thousand Dragons");
  const t = atk("Bow", "Tracer Arrow");
  const tcs = atk("Bow", "Tracer Charged Shot");
  const tdp = atk("Bow", "Tracer Dragon Piercer");
  const tdpf = atk("Bow", "Tracer Dragon Piercer (Fast)");
  const ttd = atk("Bow", "Tracer Thousand Dragons");
  // const te = atk("Bow", "Tracer Arrow (Explosion)");
  const tptd = atk("Bow", "Tracer Pierce Thousand Dragons");
  const fs = atk("Bow", "Focus Fire: Hailstorm");
  const fsdp = atk("Bow", "Focus Fire: Hailstorm Dragon Piercer");

  const a1 = {
    ...base,
    uiAttack: 101,
    sharpness: "Bow" as Sharpness,
  };

  expect(calculateHit({ ...a1, ...qs })).toBe(8);
  expect(calculateHit({ ...a1, ...cs2 })).toBe(8.9);
  expect(calculateHit({ ...a1, ...cs3 })).toBe(9.8);

  const a2 = {
    ...base,
    uiAttack: 176,
    uiElement: 230,
    chargeEleMul: 1.1,
    sharpness: "Bow" as Sharpness,
  };

  expect(calculateHit({ ...a2, ...cs1 })).toBe(15.4);
  expect(calculateHit({ ...a2, ...cs2 })).toBe(18.2);
  expect(calculateHit({ ...a2, ...cs3 })).toBe(20.8);
  expect(calculateHit({ ...a2, ...qs })).toBe(16);
  expect(calculateHit({ ...a2, ...ps2 })).toBe(19);
  expect(calculateHit({ ...a2, ...ps3 })).toBe(21.1);
  expect(calculateHit({ ...a2, ...pv1 })).toBe(21);
  expect(calculateHit({ ...a2, ...pv2 })).toBe(23.9);
  expect(calculateHit({ ...a2, ...pv3 })).toBe(26.2);
  expect(calculateHit({ ...a2, ...as1 })).toBe(11.3);
  expect(calculateHit({ ...a2, ...as2 })).toBe(12.7);
  expect(calculateHit({ ...a2, ...as3 })).toBe(14.1);
  expect(calculateHit({ ...a2, ...ase })).toBe(16.9);
  expect(calculateHit({ ...a2, ...dp })).toBe(37.7);
  expect(calculateHit({ ...a2, ...td })).toBe(30);
  expect(calculateHit({ ...a2, ...pcs3 })).toBe(9.2);
  expect(calculateHit({ ...a2, ...t })).toBe(42.1);
  expect(calculateHit({ ...a2, uiElement: 336, ...t })).toBe(45.3);
  expect(calculateHit({ ...a2, ...tcs })).toBe(20.7);
  expect(calculateHit({ ...a2, ...tdp })).toBe(40.1);
  expect(calculateHit({ ...a2, ...tdpf })).toBe(28.9);
  expect(calculateHit({ ...a2, ...ttd })).toBe(31.7);
  expect(calculateHit({ ...a2, uiElement: 336, ...tptd })).toBe(22.7);
  expect(calculateHit({ ...a2, uiElement: 336, ...fs })).toBe(19.9);
  expect(calculateHit({ ...a2, uiElement: 336, ...fsdp, rawMul: 1.25 })).toBe(
    38.2,
  );

  const a3 = { ...a1, uiAttack: 96 };
  expect(calculateHit({ ...a3, ...qs })).toBe(7.6);
  expect(calculateHit({ ...a3, ...qs, rawMul: 1.1 * 1.3 })).toBe(9.9);
  expect(calculateHit({ ...a3, ...cs2 })).toBe(8.4);
  expect(calculateHit({ ...a3, ...cs3 })).toBe(9.3);
  expect(calculateHit({ ...a3, ...cs3, rawMul: 1.1 * 1.3 })).toBe(12.1);

  const a4 = { ...a1, uiAttack: 216, uiElement: 130 };
  expect(calculateHit({ ...a4, ...qs })).toBe(18.3);
  expect(calculateHit({ ...a4, ...qs, rawMul: 1.1 * 1.4 })).toBe(25.2);
  expect(calculateHit({ ...a4, ...cs3, rawMul: 1.1 * 1.4 })).toBe(31.3);

  const a5 = { ...a1, uiAttack: 239 };
  expect(calculateHit({ ...a5, ...as3 })).toBe(19.1);
  expect(calculateHit({ ...a5, ...ase })).toBe(22.9);
  expect(calculateHit({ ...a5, ...t })).toBe(47.8);
  expect(calculateHit({ ...a5, ...dp })).toBe(48.4);
  expect(calculateHit({ ...a5, ...tdp })).toBe(51.6);
  expect(calculateHit({ ...a5, ...tdpf })).toBe(36.3);
  expect(calculateHit({ ...a5, ...td })).toBe(37.9);
  expect(calculateHit({ ...a5, ...ttd })).toBe(40.2);
  expect(calculateHit({ ...a5, uiAttack: 254.2, ...ttd })).toBe(42.7);
  expect(calculateHit({ ...a5, uiAttack: 269.2, ...ttd })).toBe(45.2);
  expect(calculateHit({ ...a5, ...fs })).toBe(22.9);
  expect(calculateHit({ ...a5, ...fsdp, rawMul: 1.25 })).toBe(47.8);

  const pqs = atk("Bow", "Pierce Quick Shot / Power Shot Lv1");
  const ppv = atk("Bow", "Pierce Power Volley Lv1");

  const a7 = { ...a1, uiAttack: 223 };
  expect(calculateHit({ ...a7, ...pqs })).toBe(5.9);
  expect(calculateHit({ ...a7, ...ppv })).toBe(7.8);
  expect(calculateHit({ ...a7, ...ptd })).toBe(21.6);

  const a8 = { ...a1, uiAttack: 196, uiElement: 270 };
  expect(calculateHit({ ...a8, ...ptd })).toBe(21.4);
});

test("Charge Master", () => {
  const a1 = {
    ...base,
    uiAttack: 211,
    uiElement: 480,
    sharpness: "White" as Sharpness,
  };

  const tcs3p = atk("Great Sword", "True Charged Slash Lv3 2 (Power)");
  const eleMul = tcs3p.eleMul! * buff("ChargeMaster", 3).meleeChargeEleMul!;

  expect(calculateHit({ ...a1, ...tcs3p })).toBe(561.8);
  expect(calculateHit({ ...a1, ...tcs3p, eleMul })).toBe(568.1);
});

test("Gunlance", () => {
  // G. Lawful Bors
  const a1 = {
    ...base,
    attack: 240,
    uiAttack: 240,
    sharpness: "Blue" as Sharpness,
  };

  const s = atk("Gunlance", "Wide Lv3 Shell");
  const cs = atk("Gunlance", "Wide Lv3 Charged Shell");
  const wf = atk("Gunlance", "Wide Lv3 Wyvern Fire 1");
  const wfh = atk("Gunlance", "Wide Lv3 Wyvern Fire 2");
  const ws = atk("Gunlance", "Wyrmstake Lv3 Ticks");
  const wse = atk("Gunlance", "Wide Lv3 Wyrmstake Explosion");

  expect(calculateHit({ ...a1, ...s })).toBe(61.2);
  expect(calculateHit({ ...a1, ...cs })).toBe(107.3);
  expect(calculateHit({ ...a1, ...wf })).toBe(138.6);
  expect(calculateHit({ ...a1, ...wfh })).toBe(131.1);
  expect(calculateHit({ ...a1, ...ws })).toBe(13.4);
  expect(calculateHit({ ...a1, ...wse })).toBe(74.7);

  const a2 = { ...a1, uiAttack: 299.6 };

  expect(calculateHit({ ...a2, ...s })).toBe(75.5);
  expect(calculateHit({ ...a2, ...cs })).toBe(133.0);
  expect(calculateHit({ ...a2, ...wf })).toBe(170.8);
  expect(calculateHit({ ...a2, ...wfh })).toBe(163.3);
  expect(calculateHit({ ...a2, ...ws })).toBe(16.8);
  expect(calculateHit({ ...a2, ...wse })).toBe(91.4);

  const a3 = {
    ...a1,
    artilleryShellAttack: 240 * 1.15,
    ...buff("Artillery", 3),
  };

  expect(calculateHit({ ...a3, ...s })).toBe(72.5);
  expect(calculateHit({ ...a3, ...cs })).toBe(125.5);
  expect(calculateHit({ ...a3, ...wf })).toBe(160.7);
  expect(calculateHit({ ...a3, ...wfh })).toBe(151);
  expect(calculateHit({ ...a3, ...ws })).toBe(15.5);
  expect(calculateHit({ ...a3, ...wse })).toBe(87.5);

  const a4 = {
    ...a1,
    artilleryShellAttack: 240 * 1.15 + 22,
    uiAttack: 262,
    ...buff("Artillery", 3),
  };
  expect(calculateHit({ ...a4, ...s })).toBe(77.8);
  expect(calculateHit({ ...a4, ...cs })).toBe(135.0);
  expect(calculateHit({ ...a4, ...wf })).toBe(172.6);
  expect(calculateHit({ ...a4, ...wfh })).toBe(162.9);

  const a5 = {
    ...a1,
    artilleryShellAttack: 240 * 1.15 + 22,
    uiAttack: 262,
    ...buff("Artillery", 3),
    eleHzv: 5,
  };
  expect(calculateHit({ ...a5, ...s })).toBe(72.6);
  expect(calculateHit({ ...a5, ...cs })).toBe(129.8);
  expect(calculateHit({ ...a5, ...wf })).toBe(162.9);
  expect(calculateHit({ ...a5, ...wfh })).toBe(162.9);

  const a6 = {
    ...a1,
    artilleryShellAttack: calculateAttack({
      attack: 240,
      buffs: {
        Heroics: buff("Heroics", 5),
        AttackBoost: buff("AttackBoost", 1),
        Agitator: buff("Agitator", 5),
        Powercharm: buff("Powercharm"),
        Artillery: { attackMul: 1.15 },
      },
    }),
    ...buff("Artillery", 3),
  };

  expect(dmg(calculateRawHit({ ...a6, ...s }))).toBe(93.1);
  expect(dmg(calculateRawHit({ ...a6, ...cs }))).toBe(167.5);
  expect(dmg(calculateRawHit({ ...a6, ...wf }))).toBe(209.4);
  expect(dmg(calculateRawHit({ ...a6, ...wfh }))).toBe(209.4);
});

test("Switch Axe", () => {
  const uiElement = calculateElement({
    element: 200,
    buffs: {
      ElementAttack: buff("ElementAttack", 3),
      Coalescence: buff("CoalescenceHeavy", 3),
    },
  });

  const swordElement = calculateElement({
    element: 200,
    buffs: {
      ElementAttack: buff("ElementAttack", 3),
      ElementPhial: { name: "Element Phial", elementMul: 1.45 },
      Coalescence: buff("CoalescenceHeavy", 3),
    },
  });

  const a1 = {
    ...base,
    uiAttack: 221,
    swordAttack: 221,
    sharpness: "White" as Sharpness,
    uiElement,
    swordElement,
    eleCritMulti: 1.05,
  };

  const aoh = atk("Switch Axe", "Axe: Overhead Slash");

  expect(dmg(calculateRawHit({ ...a1, ...aoh }))).toBe(105);
  expect(dmg(calculateEleHit({ ...a1, ...aoh }))).toBe(12.8);

  const soh = atk("Switch Axe", "Sword: Overhead Slash");

  expect(dmg(calculateRawHit({ ...a1, ...soh }))).toBe(77);
  expect(calculateHit({ ...a1, ...soh })).toBe(94.7);
  expect(calculateCrit({ ...a1, ...soh, eleCritMulti: 1.15 })).toBe(116.6);

  // const ep = atk("Switch Axe", "Sword: Amped State Element Phial Explosion");
  // expect(dmg(calculateRawHit({ ...a1, ...ep }))).toBe(28);
  // expect(calculateHit({ ...a1, ...ep })).toBe(35.5);
  // expect(dmg(calculateEleHit({ ...a1, ...ep }))).toBe(7.5);
  // expect(dmg(calculateEleHit({ ...a1, ...ep }) * 1.05)).toBe(7.9);
  // // expect(dmg(calculateEleHit({ ...a1, ...ep }) * 1.15)).toBe(8.7);

  // const a2 = {
  //   ...base,
  //   uiAttack: 213,
  //   sharpness: "White" as Sharpness,
  //   swordAttack: 205 * 1.17 + 8,
  //   critMulti: 1.34,
  // };

  // expect(calculateHit({ ...a2, ...soh })).toBe(86.4);
  // expect(calculateCrit({ ...a2, ...soh })).toBe(115.7);

  // const a3 = {
  //   ...a1,
  //   uiAttack: 211,
  //   swordAttack: 211,
  //   uiElement: 280 * 1.3 * 1.2 + 60,
  //   swordElement: 280 * 1.3 * 1.2 * 1.45 + 60,
  //   eleCritMulti: 1.15,
  // };

  // expect(dmg(calculateRawHit({ ...a3, ...aoh }))).toBe(100.3);
  // expect(dmg(calculateEleHit({ ...a3, ...aoh }))).toBe(17.1);
  // expect(dmg(calculateRawHit({ ...a3, ...soh }))).toBe(73.5);
  // expect(dmg(calculateEleHit({ ...a3, ...soh }))).toBe(23.9);
  // expect(calculateCrit({ ...a3, ...soh })).toBe(119.4);
  // expect(dmg(calculateEleHit({ ...a3, ...ep }))).toBe(9.7);
});

test("Critical Element", () => {
  const a1 = {
    ...base,
    sharpness: "White" as Sharpness,
    uiElement: 480,
  };

  const os = atk("Great Sword", "Overhead Slash");
  expect(dmg(calculateEleHit({ ...a1, ...os }))).toBe(16.6);
  expect(dmg(calculateEleHit({ ...a1, ...os, eleMul: 1.07 }))).toBe(17.7);
  expect(dmg(calculateEleHit({ ...a1, ...os, eleMul: 1.14 }))).toBe(18.9);
  expect(dmg(calculateEleHit({ ...a1, ...os, eleMul: 1.21 }))).toBe(20);

  const a2 = { ...a1, uiElement: 636 };
  expect(dmg(calculateEleHit({ ...a2, ...os, eleMul: 1.07 }))).toBe(23.5);
  expect(dmg(calculateEleHit({ ...a2, ...os, eleMul: 1.14 }))).toBe(25);
  expect(dmg(calculateEleHit({ ...a2, ...os, eleMul: 1.21 }))).toBe(26.5);
});
