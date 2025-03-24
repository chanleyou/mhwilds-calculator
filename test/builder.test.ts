import { afterEach, expect, test } from "vitest";
import { useBuild, useComputed } from "@/builder";
import { atk, deco, wpn } from "./utils";

const st = useBuild.getState();

afterEach(() => st.reset());

test("Gunlance", () => {
  const gl = wpn("Gunlance", "G. Lawful Bors");
  useBuild.setState({ weapon: gl });
  useBuild.setState({ otherBuffs: {} });

  let calcHit = useComputed().calcHit;
  st.setW(gl);
  st.setOtherBuff("Powercharm", undefined);

  const s = atk("Gunlance", "Wide Lv3 Shell");
  const cs = atk("Gunlance", "Wide Lv3 Charged Shell");
  const wf = atk("Gunlance", "Wide Lv3 Wyvern Fire 1");
  const wfh = atk("Gunlance", "Wide Lv3 Wyvern Fire 2");
  const ws = atk("Gunlance", "Wyrmstake Lv3 Ticks");
  const wse = atk("Gunlance", "Normal / Wide Lv3 Wyrmstake Explosion");

  expect(calcHit(s)).toBe(61.2);
  expect(calcHit(cs)).toBe(107.3);
  expect(calcHit(wf)).toBe(138.6);
  expect(calcHit(wfh)).toBe(131.1);
  expect(calcHit(ws)).toBe(13.4);
  expect(calcHit(wse)).toBe(74.7);

  useBuild.setState({ weaponSlots: [deco("Artillery Jewel III [3]")] });
  st.setOtherBuff("Miscellaneous", { attack: 22 });

  calcHit = useComputed().calcHit;

  expect(calcHit(s)).toBe(77.8);
  expect(calcHit(cs)).toBe(135.0);
  expect(calcHit(wf)).toBe(172.6);
  expect(calcHit(wfh)).toBe(162.9);
});

test("Artian", () => {
  const a = wpn("Great Sword", "Varianza");
  st.setW(a);
  st.setArtianType("Water");
  st.setArtianInfusion(0, "Attack");
  st.setArtianInfusion(1, "Attack");
  st.setArtianInfusion(2, "Attack");

  const tcs3p = atk("Great Sword", "True Charged Slash Lv3 2 (Power)");
  expect(useComputed().calcHit(tcs3p)).toBe(561.8);

  st.setWeaponDecoration(0, deco("Charge Jewel III [3]"));
  expect(useComputed().calcHit(tcs3p)).toBe(568.1);
});

// test("Tetrad Shot", () => {
//   st.setW({ type: "Bow", attack: 180 });
// });
