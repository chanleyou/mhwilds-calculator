import { XIcon } from "lucide-react";
import { useState } from "react";
import { Decorations } from "@/data/decorations";
import { Decoration, SlotLevel } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

export const DecorationPickerDialog = ({
  level,
  value,
  setValue,
}: {
  level?: SlotLevel;
  value?: Decoration;
  setValue: (value: Decoration) => void;
}) => {
  const [open, setOpen] = useState(false);

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-left first:pl-0 last:pr-0",
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={!level}>
        <button
          type="button"
          className={cn(
            "border-divider flex-1 cursor-pointer rounded-sm border px-2 py-1 text-left text-sm",
            value ? "text-primary" : "text-placeholder",
          )}
        >
          {value ? value.name : level ? `Decoration [${level}]` : ""}
        </button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Decoration {level}</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <table className="w-full table-auto border-collapse text-xs">
            <thead>
              <tr className="border-primary border-b">
                <th className={cellCn}>Name</th>
                <th className={cellCn}>Skills</th>
              </tr>
            </thead>
            <tbody>
              {Decorations.filter(
                (d) => d.type === "Equipment" && d.level <= (level ?? 0),
              ).map((a) => (
                <tr
                  key={a.id}
                  className="cursor-pointer border-b border-zinc-800 p-1.5 last:border-0"
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
        </Card>
      </DialogContent>
    </Dialog>
  );
};
