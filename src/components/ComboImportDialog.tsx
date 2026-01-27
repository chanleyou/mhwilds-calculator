"use client";

import { DownloadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { ZodError } from "zod";
import Attacks, { OtherAttacks } from "@/data/attacks";
import { useBuild } from "@/store/builder";
import { useAddAttack, useCombo } from "@/store/combo";
import { comboImportSchema } from "@/zod";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { toast } from "./ui/Toast";

export const ComboImportDialog = () => {
  const { w } = useBuild();
  const comboStore = useCombo();
  const addAttack = useAddAttack();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const process = useCallback(() => {
    const warnings: string[] = [];

    try {
      const result = comboImportSchema.safeParse(JSON.parse(data));
      if (!result.success) throw result.error;

      const { data: d } = result;

      comboStore.reset();
      comboStore.setComboMode(d.mode);

      const weaponAttacks = Attacks[w.type];
      const allAttacks = [...weaponAttacks, ...Object.values(OtherAttacks)];

      d.attacks.forEach((attackName) => {
        const attack = allAttacks.find((a) => a.name === attackName);
        if (attack) {
          addAttack(attack);
        } else {
          warnings.push(`Attack '${attackName}' not found for ${w.type}.`);
        }
      });

      if (warnings.length === 0) {
        toast({ title: "Combo imported.", type: "success" });
        setOpen(false);
      } else {
        toast({
          type: "warning",
          title: "Combo imported with issues:",
          description: (
            <ul className="text-tertiary list-disc pl-4 text-sm">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ),
        });
      }
    } catch (e: unknown) {
      let error = "";

      if (e instanceof SyntaxError) error = "Invalid JSON.";
      else if (e instanceof ZodError) {
        error = Object.entries(e.flatten().fieldErrors)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" ");
      } else error = "Invalid data.";

      toast({ title: error, type: "error" });
    }
  }, [data, w.type, comboStore, addAttack]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <DownloadIcon className="size-4" />
          Import Combo
        </Button>
      </DialogTrigger>
      <DialogContent title="Import Combo" className="sm:h-fit" setOpen={setOpen}>
        <textarea
          className="bg-content-alt p-2 font-mono text-sm"
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={12}
          placeholder="Paste your combo here..."
        />
        <div className="flex justify-end gap-2">
          <Button onClick={process}>
            <DownloadIcon className="size-4" /> Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
