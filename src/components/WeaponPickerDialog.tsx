import { XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/builder";
import { WeaponTypes } from "@/data";
import { Weapons } from "@/data/weapons";
import { calculateHandicraft } from "@/model";
import {
  WeaponType,
  isBowgun,
  isMeleeWeapon,
  isRanged,
  isWeaponBowgun,
} from "@/types";
import {
  BowgunAmmoDisplay,
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
    return Weapons[type];
  }, [type]);

  const filteredOptions = useMemo(() => {
    return weapons.filter((a) => {
      if (a.type !== type) return false;
      if (filter) {
        const { name, attack, element, skills, artian, ammo } = a;

        const elementString = element ? `${element.value} ${element.type}` : "";

        const search = [
          name,
          attack,
          elementString,
          ...Object.entries(skills).map(([k, v]) => `${k} ${v}`),
          ammo
            ? Object.entries(ammo).map(([k, v]) =>
                v.levels.map((l) => `${k} ${l}`).join(" "),
              )
            : "",
          artian ? "artian" : "",
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
            autoFocus
          />
          <div className="flex flex-col gap-1 overflow-y-auto pr-2 text-sm sm:hidden">
            {filteredOptions.map((o) => (
              <div
                className="border-divider gap-1 rounded border p-3"
                key={o.name}
                onClick={() => {
                  setW(o);
                  setOpen(false);
                }}
              >
                <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                  <div className="text-tertiary flex-1 text-right">Name</div>
                  <div className="flex-3">{o.name}</div>
                </div>
                <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                  <div className="text-tertiary flex-1 text-right">Attack</div>
                  <div className="flex-3">{o.attack}</div>
                </div>
                {o.affinity !== 0 && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">
                      Affinity
                    </div>
                    <div className="flex-3">{o.affinity}</div>
                  </div>
                )}
                {o.ammo && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">Ammo</div>
                    <div className="flex-3">
                      <BowgunAmmoDisplay ammo={o.ammo} />
                    </div>
                  </div>
                )}
                {o.coatings && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">
                      Coatings
                    </div>
                    <div className="flex-3">
                      {o.coatings.map((c) => (
                        <p key={c}>{c}</p>
                      ))}
                    </div>
                  </div>
                )}
                {o.phial !== "Dragon" && o.element && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">
                      Element
                    </div>
                    <div className="flex-3">
                      {o.element.value} {o.element.type}
                    </div>
                  </div>
                )}
                {o.status && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">
                      Status
                    </div>
                    <div className="flex-3">
                      {o.status.type} {o.status.value}
                    </div>
                  </div>
                )}
                {o.shelling && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">
                      Shelling
                    </div>
                    <div className="flex-3">
                      {o.shelling.type} {o.shelling.level}
                    </div>
                  </div>
                )}
                {o.phial && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                    <div className="text-tertiary flex-1 text-right">Phial</div>
                    <div className="flex-3">
                      {o.phial}{" "}
                      {(o.phial === "Dragon" ||
                        o.phial === "Paralysis" ||
                        o.phial === "Poison") &&
                        (o.element?.value ?? o.status?.value)}
                    </div>
                  </div>
                )}
                <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2">
                  <div className="text-tertiary flex-1 text-right">Skills</div>
                  <div className="flex-3">
                    {Object.entries(o.skills).map(([k, v]) => (
                      <p className="text-sm" key={k + v}>
                        {k} {v}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="border-content-alt flex flex-row justify-center gap-4 border-b p-2 last:border-0">
                  <div className="text-tertiary flex-1 text-right">Slots</div>
                  <div className="flex-3">
                    {o.slots.filter((s) => s > 0).map((s) => `[${s}]`)}
                  </div>
                </div>
                {isMeleeWeapon(o) && (
                  <div className="border-content-alt flex flex-row items-center justify-center gap-4 border-b p-2 last:border-0">
                    <div className="text-tertiary flex-1 text-right">
                      Sharpness
                    </div>
                    <div className="flex flex-3 flex-col pt-1">
                      <SharpnessBar sharpness={o.sharpness} />
                      <SharpnessBar sharpness={calculateHandicraft(o, 5)} />
                    </div>
                  </div>
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
                  {isBowgun(type) ? (
                    <TableCell>Ammo</TableCell>
                  ) : (
                    <TableCell>Element</TableCell>
                  )}
                  {type === "Bow" && <TableCell>Coatings</TableCell>}
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
                    {isWeaponBowgun(o) ? (
                      <TableCell>
                        <BowgunAmmoDisplay ammo={o.ammo} />
                      </TableCell>
                    ) : (
                      <TableCell>
                        {o.element && `${o.element.value} ${o.element.type}`}
                        {o.status && `${o.status.value} ${o.status.type}`}
                      </TableCell>
                    )}
                    {o.coatings && (
                      <TableCell>
                        {o.coatings.map((c) => (
                          <p key={c}>{c}</p>
                        ))}
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
