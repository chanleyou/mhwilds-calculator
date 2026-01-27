"use client";

import { SaveIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useCombo } from "@/store/combo";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { toast } from "./ui/Toast";

export const ComboExportDialog = () => {
  const { mode: comboMode, dynamic, snapshot } = useCombo();

  const [open, setOpen] = useState(false);

  const data = useMemo(
    () =>
      JSON.stringify(
        {
          mode: comboMode,
          attacks:
            comboMode === "Dynamic"
              ? dynamic.flatMap((a) => Array(a.count).fill(a.name))
              : snapshot.flatMap((a) => Array(a.count).fill(a.name)),
        },
        null,
        2,
      ),
    [comboMode, dynamic, snapshot],
  );

  const copy = () => {
    navigator.clipboard.writeText(data);
    toast({ title: "Combo copied to clipboard.", type: "success" });
  };

  const hasCombo = dynamic.length > 0 || snapshot.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" disabled={!hasCombo}>
          <SaveIcon className="size-4" />
          Export Combo
        </Button>
      </DialogTrigger>
      <DialogContent title="Export Combo" setOpen={setOpen} className="sm:h-fit">
        <textarea
          className="bg-content-alt p-2 font-mono text-sm"
          value={data}
          rows={12}
          readOnly
        />
        <div className="flex justify-end gap-2">
          <Button onClick={copy}>
            <SaveIcon className="size-4" /> Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
