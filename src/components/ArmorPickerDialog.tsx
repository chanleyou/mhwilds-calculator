import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Armors } from "@/data/armor";
import { Armor, ArmorType } from "@/types";
import { cn } from "@/utils";
import { Picker } from "./Picker";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";
import { TextInput } from "./TextInput";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export const ArmorPickerDialog = ({
  type,
  value,
  setValue,
}: {
  type: ArmorType;
  value?: Armor;
  setValue: (value?: Armor) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredOptions = useMemo(() => {
    return Armors.filter((a) => {
      if (a.type !== type) return false;
      if (filter) {
        const { name, groupSkill, seriesSkill, skills } = a;
        const search = [
          name,
          groupSkill,
          seriesSkill,
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

  const clear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setValue(undefined);
    },
    [setValue],
  );

  const rowCn = cn(
    "border-content-alt flex flex-row justify-between gap-3 border-b p-2 last:border-0",
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Picker className={cn(!value && "text-placeholder")}>
          {/* <p className={cn("text-placeholder", value && "text-xs")}>{type}</p> */}
          {value ? value.name : type}
          {value && (
            <Button
              asChild
              variant="text"
              size="icon"
              onClick={clear}
              className="text-secondary font-bold"
            >
              <div>
                <XIcon size={16} />
              </div>
            </Button>
          )}
          {/* {value?.skills &&
            Object.entries(value.skills).map(([k, v]) => (
              <p className="text-secondary text-xs" key={k}>{`${k} ${v}`}</p>
            ))} */}
        </Picker>
      </DialogTrigger>
      <DialogContent setOpen={setOpen} title={`Select ${type}`}>
        <TextInput
          value={filter}
          onChangeValue={setFilter}
          placeholder={"Search..."}
          autoFocus
        />
        <div className="grid gap-1 overflow-y-auto pr-2 text-sm md:grid-cols-2">
          {filteredOptions.map((o) => (
            <div
              className="border-divider hover:border-primary cursor-pointer gap-1 rounded border p-3"
              key={o.name}
              onClick={() => {
                setValue(o);
                setOpen(false);
              }}
            >
              <div className={rowCn}>
                <div className="text-tertiary flex-1">Name</div>
                <div className="flex-3">{o.name}</div>
              </div>
              <div className={rowCn}>
                <div className="text-tertiary flex-1">Skills</div>
                <div className="flex-3">
                  {Object.entries(o.skills).map(([k, v]) => (
                    <p className="text-sm" key={k + v}>
                      {k} {v}
                    </p>
                  ))}
                </div>
              </div>
              {o.seriesSkill && (
                <div className={rowCn}>
                  <div className="text-tertiary flex-1">Series</div>
                  <div className="flex-3">{o.seriesSkill}</div>
                </div>
              )}
              {o.groupSkill && (
                <div className={rowCn}>
                  <div className="text-tertiary flex-1">Group</div>
                  <div className="flex-3">{o.groupSkill}</div>
                </div>
              )}
              <div className={rowCn}>
                <div className="text-tertiary flex-1">Slots</div>
                <div className="flex-3">
                  {o.slots.some((n) => n > 0)
                    ? o.slots.filter((s) => s > 0).join("-")
                    : "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:show hidden overflow-auto">
          <Table>
            <thead>
              <TableHeadRow>
                <TableCell className={"w-2/5"}>Name</TableCell>
                <TableCell className={"w-2/5"}>Skills</TableCell>
                <TableCell className={"w-1/5"}>Slots</TableCell>
              </TableHeadRow>
            </thead>
            <tbody>
              {filteredOptions.map((a) => (
                <TableRow
                  key={a.name}
                  className={cn(a.name === value?.name && "bg-content-alt")}
                  onClick={() => {
                    setValue(a);
                    setOpen(false);
                  }}
                >
                  <TableCell>{a.name}</TableCell>
                  <TableCell>
                    {Object.entries(a.skills).map(([k, v]) => (
                      <p key={k}>
                        {k} {v}
                      </p>
                    ))}
                    {a.groupSkill && <p>{a.groupSkill} 1</p>}
                    {a.seriesSkill && <p>{a.seriesSkill} 1</p>}
                  </TableCell>
                  <TableCell>
                    {a.slots.filter((s) => s > 0).join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
