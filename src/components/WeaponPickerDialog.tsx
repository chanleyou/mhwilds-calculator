import { XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/builder";
import { WeaponTypes } from "@/data";
import {
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
} from "@/data/weapons";
import { calculateHandicraft } from "@/model";
import { WeaponType, isBowgun, isMeleeWeapon, isRanged } from "@/types";
import {
  Button,
  Card,
  Picker,
  Select,
  SharpnessBar,
  Table,
  TableCell,
  TableHeadRow,
  TableRow,
  TextInput,
} from ".";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

export const WeaponPickerDialog = () => {
  const { weapon: a, setW } = useBuild();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const [type, setType] = useState<WeaponType>("Sword and Shield");

  const weapons = useMemo(() => {
    if (type === "Bow") return Bows;
    if (type === "Charge Blade") return ChargeBlades;
    if (type === "Dual Blades") return DualBlades;
    if (type === "Great Sword") return GreatSwords;
    if (type === "Gunlance") return Gunlances;
    if (type === "Hammer") return Hammers;
    if (type === "Heavy Bowgun") return HeavyBowguns;
    if (type === "Hunting Horn") return HuntingHorns;
    if (type === "Insect Glaive") return InsectGlaives;
    if (type === "Lance") return Lances;
    if (type === "Light Bowgun") return LightBowguns;
    if (type === "Long Sword") return LongSwords;
    if (type === "Switch Axe") return SwitchAxes;
    return SwordAndShields;
  }, [type]);

  const filteredOptions = useMemo(() => {
    return weapons.filter((a) => {
      if (a.type !== type) return false;
      if (filter) {
        const { name, attack, element, skills } = a;

        const elementString = element ? `${element.value} ${element.type}` : "";

        const search = [
          name,
          attack,
          elementString,
          ...Object.entries(skills).map(([k, v]) => `${k} ${v}`),
        ]
          .filter((k) => !!k)
          .join(" ")
          .toLowerCase();

        return search.includes(filter.toLowerCase());
      }

      return true;
    });
  }, [filter, weapons, type]);

  useEffect(() => void setFilter(""), [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Picker>{a.name}</Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-dvh w-[100vw] sm:h-[85vh] sm:w-7xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Weapon</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <Select
            options={[...WeaponTypes]}
            value={type}
            onChangeValue={setType}
          />
          <TextInput
            value={filter}
            onChangeValue={setFilter}
            placeholder={"Search..."}
          />
          <div className="grid grid-cols-1 gap-1 overflow-y-auto pr-2 text-sm sm:hidden">
            {filteredOptions.map((o) => (
              <div
                className="border-divider grid grid-cols-4 gap-1 rounded border py-4"
                key={o.name}
                onClick={() => {
                  setW(o);
                  setOpen(false);
                }}
              >
                <div className="text-tertiary pr-4 text-right">Name</div>
                <div className="col-span-3">{o.name}</div>
                <div className="text-tertiary pr-4 text-right">Attack</div>
                <div className="col-span-3">{o.attack}</div>
                {o.affinity !== 0 && (
                  <>
                    <div className="text-tertiary pr-4 text-right">
                      Affinity
                    </div>
                    <div className="col-span-3">
                      {o.affinity !== 0 && o.affinity}
                    </div>
                  </>
                )}
                {o.phial !== "Dragon" && o.element && (
                  <>
                    <div className="text-tertiary pr-4 text-right">Element</div>
                    <div className="col-span-3">
                      {o.element.value} {o.element.type}
                    </div>
                  </>
                )}
                {o.phial !== "Paralysis" &&
                  o.phial !== "Poison" &&
                  o.status && (
                    <>
                      <div className="text-tertiary pr-4 text-right">
                        Status
                      </div>
                      <div className="col-span-3">
                        {o.status.type} {o.status.value}
                      </div>
                    </>
                  )}
                {o.phial && (
                  <>
                    <div className="text-tertiary pr-4 text-right">Phial</div>
                    <div className="col-span-3">
                      {o.phial}{" "}
                      {(o.phial === "Dragon" ||
                        o.phial === "Paralysis" ||
                        o.phial === "Poison") &&
                        (o.element?.value ?? o.status?.value)}
                    </div>
                  </>
                )}
                <div className="text-tertiary pr-4 text-right">Skills</div>
                <div className="col-span-3">
                  {Object.entries(o.skills).map(([k, v]) => (
                    <p className="text-sm" key={k + v}>
                      {k} {v}
                    </p>
                  ))}
                </div>
                <div className="text-tertiary pr-4 text-right">Slots</div>
                <div className="col-span-3">
                  {o.slots.filter((s) => s > 0).map((s) => `[${s}]`)}
                </div>
                {isMeleeWeapon(o) && (
                  <>
                    <div className="text-tertiary pr-4 text-right">
                      Sharpness
                    </div>
                    <div className="col-span-3 flex flex-col pt-1">
                      <SharpnessBar sharpness={o.sharpness} />
                      <SharpnessBar sharpness={calculateHandicraft(o, 5)} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="hidden overflow-auto sm:block">
            <Table>
              <thead>
                <TableHeadRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Attack</TableCell>
                  <TableCell>Affinity</TableCell>
                  {!isBowgun(type) && <TableCell>Element</TableCell>}
                  {!isRanged(type) && <TableCell>Sharpness</TableCell>}
                  {(type === "Switch Axe" || type === "Charge Blade") && (
                    <TableCell>Phial</TableCell>
                  )}
                  {type === "Gunlance" && <TableCell>Shelling</TableCell>}
                  <TableCell>Skills</TableCell>
                  <TableCell>Slots</TableCell>
                </TableHeadRow>
              </thead>
              <tbody>
                {filteredOptions.map((o) => (
                  <TableRow
                    key={o.name}
                    onClick={() => {
                      setW(o);
                      setOpen(false);
                    }}
                  >
                    <TableCell>{o.name}</TableCell>
                    <TableCell>{o.attack}</TableCell>
                    <TableCell>{o.affinity !== 0 && o.affinity}</TableCell>
                    {!isBowgun(type) && (
                      <TableCell>
                        {o.element && `${o.element.value} ${o.element.type}`}
                        {o.status && `${o.status.value} ${o.status.type}`}
                      </TableCell>
                    )}
                    {isMeleeWeapon(o) && (
                      <TableCell className="text-center">
                        <SharpnessBar sharpness={o.sharpness} small />
                        <div className="h-[1px]" />
                        <SharpnessBar
                          sharpness={calculateHandicraft(o, 5)}
                          small
                        />
                      </TableCell>
                    )}
                    {o.phial && (
                      <TableCell>
                        {o.phial} {o.phial === "Dragon"}
                      </TableCell>
                    )}
                    {o.shelling && (
                      <TableCell>
                        {o.shelling.type} {o.shelling.level}
                      </TableCell>
                    )}
                    <TableCell>
                      {Object.entries(o.skills).map(([k, v]) => (
                        <p key={k}>
                          {k} {v}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {o.slots.filter((s) => s > 0).map((s) => `[${s}]`)}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
