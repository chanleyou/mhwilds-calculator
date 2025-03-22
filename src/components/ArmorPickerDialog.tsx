import { XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Armors } from "@/data/armor";
import { Armor, ArmorType } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Picker } from "./Picker";
import { TextInput } from "./TextInput";

export const ArmorPickerDialog = ({
  type,
  value,
  setValue,
}: {
  type: ArmorType;
  value?: Armor;
  setValue: (value: Armor) => void;
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

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-left first:pl-0 last:pr-0",
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Picker className={cn(!value && "text-placeholder")}>
          {/* <p className={cn("text-placeholder", value && "text-xs")}>{type}</p> */}
          {value ? value.name : type}
          {/* {value?.skills &&
            Object.entries(value.skills).map(([k, v]) => (
              <p className="text-secondary text-xs" key={k}>{`${k} ${v}`}</p>
            ))} */}
        </Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-[80vh]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select {type}</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
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
                  <th className={cn(cellCn, "w-5/12")}>Name</th>
                  <th className={cn(cellCn, "w-5/12")}>Skills</th>
                  <th className={cn(cellCn, "w-1/6")}>Slots</th>
                </tr>
              </thead>
              <tbody>
                {filteredOptions.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-content-alt cursor-pointer border-b border-zinc-800 p-1.5 last:border-0"
                    onClick={() => {
                      setValue(a);
                      setOpen(false);
                    }}
                  >
                    <td className={cellCn}>{a.name}</td>
                    <td className={cellCn}>
                      {Object.entries(a.skills).map(([k, v]) => (
                        <p key={k}>
                          {k} {v}
                        </p>
                      ))}
                      {a.groupSkill && <p>{a.groupSkill} 1</p>}
                      {a.seriesSkill && <p>{a.seriesSkill} 1</p>}
                    </td>
                    <td className={cn(cellCn, "font-mono")}>
                      {a.slots.filter((s) => s > 0).join(",")}
                    </td>
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
