import { Weapon, WeaponType } from "@/types";
import { Bows } from "./Bows";
import { ChargeBlades } from "./ChargeBlades";
import { DualBlades } from "./DualBlades";
import { GreatSwords } from "./GreatSwords";
import { Gunlances } from "./Gunlances";
import { Hammers } from "./Hammers";
import { HeavyBowguns } from "./HeavyBowguns";
import { HuntingHorns } from "./HuntingHorns";
import { InsectGlaives } from "./InsectGlaives";
import { Lances } from "./Lances";
import { LightBowguns } from "./LightBowguns";
import { LongSwords } from "./LongSwords";
import { SwitchAxes } from "./SwitchAxes";
import { SwordAndShields } from "./SwordAndShields";

export const Weapons: Record<WeaponType, Weapon[]> = {
  Bow: Bows,
  ["Charge Blade"]: ChargeBlades,
  ["Dual Blades"]: DualBlades,
  ["Great Sword"]: GreatSwords,
  Gunlance: Gunlances,
  Hammer: Hammers,
  ["Heavy Bowgun"]: HeavyBowguns,
  ["Hunting Horn"]: HuntingHorns,
  ["Insect Glaive"]: InsectGlaives,
  Lance: Lances,
  ["Light Bowgun"]: LightBowguns,
  ["Long Sword"]: LongSwords,
  ["Switch Axe"]: SwitchAxes,
  ["Sword and Shield"]: SwordAndShields,
};

export default Weapons;
