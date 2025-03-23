import { Weapon } from "@/types";
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

export const Weapons = ([] as Weapon[]).concat(
  Bows,
  ChargeBlades,
  DualBlades,
  GreatSwords,
  Gunlances,
  Hammers,
  HeavyBowguns,
  HuntingHorns,
  InsectGlaives,
  Lances,
  LightBowguns,
  LongSwords,
  SwitchAxes,
  SwordAndShields,
);
