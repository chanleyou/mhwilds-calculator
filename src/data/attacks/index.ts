import { Attack, WeaponType } from "@/types";
import { BowAttacks } from "./bow";
import { ChargeBladeAttacks } from "./chargeBlade";
import { DualBladesAttacks } from "./dualBlades";
import { GreatSwordAttacks } from "./greatSword";
import { GunlanceAttacks } from "./gunlance";
import { HammerAttacks } from "./hammer";
import { HeavyBowgunAttacks } from "./heavyBowgun";
import { HuntingHornAttacks } from "./huntingHorn";
import { InsectGlaiveAttacks } from "./insectGlaive";
import { LanceAttacks } from "./lance";
import { LightBowgunAttacks } from "./lightBowgun";
import { LongSwordAttacks } from "./longSword";
import { SwitchAxeAttacks } from "./switchAxe";
import { SwordAndShieldAttacks } from "./swordAndShield";

const Attacks: Record<WeaponType, Attack[]> = {
  Bow: BowAttacks,
  ["Charge Blade"]: ChargeBladeAttacks,
  ["Dual Blades"]: DualBladesAttacks,
  ["Great Sword"]: GreatSwordAttacks,
  Gunlance: GunlanceAttacks,
  Hammer: HammerAttacks,
  ["Heavy Bowgun"]: HeavyBowgunAttacks,
  ["Hunting Horn"]: HuntingHornAttacks,
  ["Insect Glaive"]: InsectGlaiveAttacks,
  Lance: LanceAttacks,
  ["Light Bowgun"]: LightBowgunAttacks,
  ["Long Sword"]: LongSwordAttacks,
  ["Switch Axe"]: SwitchAxeAttacks,
  ["Sword and Shield"]: SwordAndShieldAttacks,
};

export const OtherAttacks: Record<string, Attack> = {
  ["Convert Element 1"]: {
    name: "Convert Element Lv1",
    mv: 0,
    fixedRaw: 150,
    cantCrit: true,
    fixedEle: 60,
    elementType: "Dragon",
  },
  ["Convert Element 2"]: {
    name: "Convert Element Lv2",
    mv: 0,
    fixedRaw: 200,
    cantCrit: true,
    fixedEle: 80,
    elementType: "Dragon",
  },
  ["Convert Element 3"]: {
    name: "Convert Element Lv3",
    mv: 0,
    fixedRaw: 280,
    cantCrit: true,
    fixedEle: 100,
    elementType: "Dragon",
  },
};
export default Attacks;
