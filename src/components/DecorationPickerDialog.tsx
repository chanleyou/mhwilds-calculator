import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Decorations } from "@/data/decorations";
import { Decoration, SlotLevel } from "@/types";
import { cn } from "@/utils";
import {
  Button,
  Card,
  Picker,
  Table,
  TableCell,
  TableHeadRow,
  TableRow,
  TextInput,
} from ".";
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
            {value ? value.name : level > 0 ? `Slot [${level}]` : undefined}
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
                <XIcon className="h-4 w-4" />
              </div>
            </Button>
          )}
        </Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="max-w-90vw h-[90vh] w-[90vw]">
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
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
