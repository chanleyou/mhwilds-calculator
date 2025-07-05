import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Charms } from "@/data/charms";
import { Charm } from "@/types";
import { Button, Picker, TextInput } from ".";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export const CharmPickerDialog = ({
  value,
  setValue,
}: {
  value?: Charm;
  setValue: (value?: Charm) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredOptions = useMemo(() => {
    return Charms.filter((a) => {
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
  }, [filter]);

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
        <Picker className={value ? "" : "text-placeholder"}>
          {value ? value.name : "Charm"}
          {value && (
            <Button
              variant="text"
              size="icon"
              onClick={clear}
              className="text-secondary"
              asChild
            >
              <div>
                <XIcon className="size-4" />
              </div>
            </Button>
          )}
        </Picker>
      </DialogTrigger>
      <DialogContent title="Select Charm" setOpen={setOpen}>
        <TextInput
          value={filter}
          onChangeValue={setFilter}
          placeholder={"Search..."}
          autoFocus
        />
        <div className="grid gap-1 overflow-y-auto pr-2 sm:grid-cols-2">
          {filteredOptions.map((c) => (
            <div
              className="border-divider hover:border-primary cursor-pointer gap-1 rounded border p-3"
              key={c.name}
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
      </DialogContent>
    </Dialog>
  );
};
