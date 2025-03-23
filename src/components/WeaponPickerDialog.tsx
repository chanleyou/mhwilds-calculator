import { XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/builder";
import { WeaponTypes } from "@/data";
import { Weapons } from "@/data/weapons";
import { WeaponType, isRanged } from "@/types";
import { cn } from "@/utils";
import { Button, Card, Picker, Select, TextInput } from ".";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

export const WeaponPickerDialog = () => {
  const { weapon: a, setW } = useBuild();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const [type, setType] = useState<WeaponType>("Sword and Shield");

  const filteredOptions = useMemo(() => {
    return Weapons.filter((a) => {
      if (a.type !== type) return false;
      if (filter) {
        const { name, attack, element, elementType, skills } = a;
        const search = [
          name,
          attack,
          element,
          elementType,
          ...Object.entries(skills).map(([k, v]) => `${k} ${v}`),
        ]
          .filter((k) => !!k)
          .join(" ")
          .toLowerCase();

        return search.includes(filter.toLowerCase());
      }

      return true;
    });
  }, [filter, type]);

  useEffect(() => void setFilter(""), [open]);

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-left first:pl-0 last:pr-0",
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Picker>
          {/* <p className={cn("text-placeholder", value && "text-xs")}>{type}</p> */}
          {a.name}
          {/* {value?.skills &&
            Object.entries(value.skills).map(([k, v]) => (
              <p className="text-secondary text-xs" key={k}>{`${k} ${v}`}</p>
            ))} */}
        </Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-[75vh] gap-2">
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
            // label="Weapon"
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
            <table className="w-full table-auto border-collapse text-xs">
              <thead>
                <tr className="border-primary border-b">
                  <th className={cn(cellCn)}>Name</th>
                  <th className={cn(cellCn)}>Attack</th>
                  <th className={cn(cellCn)}>Affinity</th>
                  {!isRanged(type) && <th className={cn(cellCn)}>Sharpness</th>}
                  <th className={cn(cellCn)}>Element</th>
                  <th className={cn(cellCn)}>Skills</th>
                  <th className={cn(cellCn)}>Slots</th>
                  {(type === "Switch Axe" || type === "Charge Blade") && (
                    <th>Phial</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredOptions.map((o) => (
                  <tr
                    key={o.name}
                    className="hover:bg-content-alt cursor-pointer border-b border-zinc-800 p-1.5 last:border-0"
                    onClick={() => {
                      setW(o);
                      setOpen(false);
                    }}
                  >
                    <td className={cellCn}>{o.name}</td>
                    <td className={cellCn}>{o.attack}</td>
                    <td className={cellCn}>{o.affinity !== 0 && o.affinity}</td>
                    {!isRanged(type) && <td className={cn(cellCn)}></td>}
                    <td className={cellCn}>
                      {o.element > 0 && `${o.element} ${o.elementType}`}
                    </td>
                    <td className={cellCn}>
                      {Object.entries(o.skills).map(([k, v]) => (
                        <p key={k}>
                          {k} {v}
                        </p>
                      ))}
                    </td>
                    <td className={cn(cellCn, "font-mono")}>
                      {o.slots.filter((s) => s > 0).join(",")}
                    </td>
                    {o.phial && (
                      <td>
                        {o.phial} {o.phial === "Dragon"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
