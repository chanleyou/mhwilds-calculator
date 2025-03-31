import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Decorations } from "@/data/decorations";
import { Decoration, SlotLevel } from "@/types";
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
    }).sort((a, b) => b.level - a.level);
  }, [filter, level, type]);

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
        <Picker disabled={!level} className={value ? "" : "text-placeholder"}>
          <span className="truncate">
            {value ? value.name : level > 0 ? `Slot [${level}]` : "\u00a0"}
          </span>
          {value && (
            <Button
              asChild
              variant="text"
              size="icon"
              onClick={clear}
              className="text-secondary"
            >
              <div>
                <XIcon className="size-4" />
              </div>
            </Button>
          )}
        </Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-dvh w-[100vw] sm:h-[85dvh] sm:w-4xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Decoration {level}</h1>
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
          <div className="grid gap-1 overflow-y-auto pr-2 sm:grid-cols-2">
            {filteredOptions.map((c) => (
              <div
                className="border-divider hover:bg-content-alt flex cursor-pointer flex-col rounded border p-2"
                key={c.id}
                onClick={() => {
                  setValue(c);
                  setOpen(false);
                }}
              >
                <div>
                  <p className="text-sm">{c.name}</p>
                  {Object.entries(c.skills).map(([k, v]) => (
                    <p className="text-tertiary text-sm" key={k + v}>
                      {k} {v}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="overflow-auto">
            <Table>
              <thead>
                <TableHeadRow>
                  <TableCell className="w-1/2">Name</TableCell>
                  <TableCell className="w-1/2">Skills</TableCell>
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
                        <div key={k}>
                          {k} {v}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div> */}
        </Card>
      </DialogContent>
    </Dialog>
  );
};
