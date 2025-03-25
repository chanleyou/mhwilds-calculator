import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Armors } from "@/data/armor";
import { Armor, ArmorType } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Picker } from "./Picker";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";
import { TextInput } from "./TextInput";

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
      <DialogContent>
        <Card className="h-dvh w-[100vw] sm:h-[85dvh] sm:w-4xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select {type}</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <TextInput
            value={filter}
            onChangeValue={setFilter}
            placeholder={"Search..."}
            autoFocus
          />
          <div className="grid grid-cols-1 gap-1 overflow-y-auto pr-3 md:grid-cols-2">
            {filteredOptions.map((a) => (
              <div
                className="border-divider bg-content hover:bg-content-alt flex cursor-pointer flex-col rounded border p-2"
                key={a.id}
                onClick={() => {
                  setValue(a);
                  setOpen(false);
                }}
              >
                <div>
                  <p className="">{a.name}</p>
                  {Object.entries(a.skills).map(([k, v]) => (
                    <p className="text-tertiary text-sm" key={k + v}>
                      {k} {v}
                    </p>
                  ))}
                  {a.seriesSkill && (
                    <p className="text-tertiary text-sm">{a.seriesSkill} 1</p>
                  )}
                  {a.groupSkill && (
                    <p className="text-tertiary text-sm">{a.groupSkill} 1</p>
                  )}
                  <p className="text-tertiary text-sm">
                    {a.slots.filter((s) => s > 0).map((s) => `[${s}]`)}
                  </p>
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
                    key={a.id}
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
        </Card>
      </DialogContent>
    </Dialog>
  );
};
