import { XIcon } from "lucide-react";
import { useState } from "react";
import { Armors } from "@/data/armor";
import { Armor, ArmorType } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

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

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-left first:pl-0 last:pr-0",
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "border-divider cursor-pointer rounded-sm border px-2 py-1 text-sm",
            value ? "text-primary" : "text-placeholder",
          )}
        >
          {value?.name ?? type}
        </div>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select {type}</h1>
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
                <th className={cellCn}>Slots</th>
              </tr>
            </thead>
            <tbody>
              {Armors.filter((a) => a.type === type).map((a) => (
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
                    {a.groupSkill && (
                      <div className="text-zinc-400">{a.groupSkill}</div>
                    )}
                    {a.seriesSkill && (
                      <div className="text-zinc-400">{a.seriesSkill}</div>
                    )}
                  </td>
                  <td className={cn(cellCn, "font-mono")}>
                    {a.slots.filter((s) => s > 0).join(",")}
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
