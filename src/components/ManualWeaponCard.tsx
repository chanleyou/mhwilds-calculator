import { useEffect, useMemo, useState } from "react";
import { Sharpnesses, WeaponTypes } from "@/data";
import { useBuild } from "@/store/builder";
import {
  ElementType,
  ElementTypes,
  Sharpness,
  SwitchAxePhialType,
  Weapon,
  WeaponSharpness,
  WeaponType,
  isBowgun,
  isRanged,
} from "@/types";
import { Card, NumberInput, Select } from "./";

export const ManualWeaponCard = () => {
  const { setW, reset } = useBuild();
  const [hasReset, setHasReset] = useState(false);
  const [weaponType, setWeaponType] = useState<WeaponType>("Sword and Shield");
  const [attack, setAttack] = useState(200);
  const [affinity, setAffinity] = useState(0);
  const [sharpness, setSharpness] = useState<Sharpness | undefined>("White");
  const [element, setElement] = useState<number>(0);
  const [elementType, setElementType] = useState<ElementType>();
  const [phial, setPhial] = useState<SwitchAxePhialType>();

  useEffect(() => {
    if (isRanged(weaponType)) {
      setSharpness("Ranged");
    } else if (sharpness === "Ranged") {
      setSharpness("White");
    }
    if (isBowgun(weaponType)) {
      setElement(0);
      setElementType(undefined);
    }

    if (weaponType !== "Switch Axe") {
      setPhial(undefined);
    } else if (phial === "Dragon" && elementType !== "Dragon") {
      setElementType("Dragon");
    }
  }, [weaponType, sharpness, phial, elementType]);

  const sharpnessArray = useMemo(() => {
    if (isRanged(weaponType)) return undefined;
    if (!sharpness) return undefined;
    const array = [0, 0, 0, 0, 0, 0, 0] as WeaponSharpness;
    const sharpnessIndex = Sharpnesses.indexOf(sharpness);
    array[sharpnessIndex] = 150;
    return array;
  }, [sharpness, weaponType]);

  const weapon: Weapon = useMemo(() => {
    return {
      name: "Custom Weapon",
      type: weaponType,
      attack,
      affinity,
      sharpness: isRanged(weaponType) ? undefined : sharpnessArray,
      handicraft: isRanged(weaponType) ? undefined : [0, 0, 0, 0],
      slots: [0, 0, 0],
      skills: {},
      phial,
      element:
        elementType && element > 0
          ? { value: element, type: elementType }
          : undefined,
    } as unknown as Weapon;
  }, [
    weaponType,
    attack,
    affinity,
    sharpnessArray,
    element,
    elementType,
    phial,
  ]);

  useEffect(() => {
    if (!hasReset) {
      reset();
      setHasReset(true);
    }
    void setW(weapon);
  }, [weapon, reset, hasReset, setW]);

  return (
    <Card>
      <h1>Weapon</h1>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <Select
          label="Type"
          value={weaponType}
          onChangeValue={setWeaponType}
          options={[...WeaponTypes]}
        />
        <NumberInput
          label="Attack"
          value={attack}
          onChangeValue={setAttack}
          min={0}
          step={5}
        />
        <NumberInput
          label="Affinity"
          value={affinity}
          onChangeValue={setAffinity}
          step={5}
        />
        <Select
          label="Sharpness"
          value={sharpness}
          onChangeValue={setSharpness}
          options={[...Sharpnesses]}
          disabledOptions={[...Sharpnesses.filter((s) => s === "Ranged")]}
          disabled={isRanged(weaponType)}
        />
        <Select
          label="Element"
          value={elementType}
          onChangeValue={setElementType}
          options={[undefined, ...ElementTypes]}
          disabled={isBowgun(weaponType) || phial === "Dragon"}
        />
        <NumberInput
          label="Element"
          value={element}
          onChangeValue={setElement}
          disabled={isBowgun(weaponType) || !elementType}
          min={0}
          step={10}
        />
        {weaponType === "Switch Axe" && (
          <Select
            label="Phial"
            value={phial}
            options={[undefined, "Power", "Element", "Dragon"]}
            onChangeValue={setPhial}
          />
        )}
      </div>
    </Card>
  );
};
