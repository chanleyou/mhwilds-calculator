import { CombinedBuffs } from "@/data";
import Attacks from "@/data/attacks";
import { Decorations } from "@/data/decorations";
import Weapons from "@/data/weapons";
import { WeaponType } from "@/types";

export const display = (n: number) => Math.floor(n + 0.1);

export const buff = (key: string, level: number = 1) => {
  const buff = CombinedBuffs[key]?.levels[level - 1];
  if (!buff) throw new Error(`Buff not found: ${key} ${level}`);
  const { frenzy, ...values } = buff;
  return values;
};

export const atk = (weapon: WeaponType, name: string) => {
  const attack = Attacks[weapon].find((a) => a.name === name)!;
  if (!attack) throw new Error(`Attack not found: ${name}`);
  return attack;
};

export const wpn = (type: WeaponType, name: string) => {
  const weapon = Weapons[type].find((w) => w.name === name)!;
  if (!weapon) throw new Error(`Weapon not found: ${name}`);
  return weapon;
};

export const deco = (name: string) => {
  const decoration = Decorations.find((d) => d.name === name)!;
  if (!decoration) throw new Error(`Decoration not found: ${name}`);
  return decoration;
};
