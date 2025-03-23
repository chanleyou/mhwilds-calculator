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
        <Card className="h-[75vh] w-7xl max-w-[95vw]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Weapon</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
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
            autoFocus
          />
          <div className="overflow-auto">
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
                        {o.status && `${o.status.type} ${o.status.value}`}
                      </TableCell>
                    )}
                    {isMeleeWeapon(o) && (
                      <TableCell className="text-center">
                        <SharpnessBar sharpness={o.sharpness} small />
                        <div className="h-[1px]" />
                        <SharpnessBar
                          sharpness={calculateHandicraft(o, 5).sharpness!}
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
                      {o.slots.filter((s) => s > 0).join(",")}
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
