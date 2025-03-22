import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Decorations } from "@/data/decorations";
import { Decoration, SlotLevel } from "@/types";
import { cn } from "@/utils";
import { Button, Card, Picker, TextInput } from ".";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

export const DecorationPickerDialog = ({
  level,
  value,
  type = "Equipment",
  setValue,
}: {
  type?: "Weapon" | "Equipment";
  level: SlotLevel;
  value?: Decoration;
  setValue: (value?: Decoration) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredOptions = useMemo(() => {
    return Decorations.filter((a) => {
      if (a.type !== type) return false;
      if (a.level > level) return false;
      if (filter) {
        const { name, skills } = a;
        const search = [
          name,
          ...Object.entries(skills).map(([k, v]) => `${k} ${v}`),
        ]
          .filter((k) => !!k)
          .join(" ")
          .toLowerCase();

        return search.includes(filter.toLowerCase());
      }

      return true;
    });
  }, [filter, level, type]);

  useEffect(() => void setFilter(""), [open]);

  const clear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setValue(undefined);
    },
    [setValue],
  );

  const cellCn = cn(
    "text-secondary w-1/2 px-2 py-1.5 text-left first:pl-0 last:pr-0",
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Picker disabled={!level} className={value ? "" : "text-placeholder"}>
          {value ? value.name : level > 0 ? `Slot [${level}]` : undefined}
          {value && (
            <Button
              variant="text"
              size="icon"
              onClick={clear}
              className="text-secondary"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-[80vh]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Decoration {level}</h1>
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
                  <th className={cellCn}>Name</th>
                  <th className={cellCn}>Skills</th>
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
                        <div key={k}>
                          {k} {v}
                        </div>
                      ))}
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
