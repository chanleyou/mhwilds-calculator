import { XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Charms } from "@/data/charms";
import { Charm } from "@/types";
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
                <XIcon className="h-4 w-4" />
              </div>
            </Button>
          )}
        </Picker>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-[80vh]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Charm</h1>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Skills</TableCell>
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
