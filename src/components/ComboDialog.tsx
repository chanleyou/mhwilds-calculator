"use client";

import { produce } from "immer";
import { SwordsIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { round } from "@/model";
import { useCalcs, useModel } from "@/store";
import { Attack } from "@/types";
import { Button } from "./Button";
import { Card } from "./Card";
import { DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Dialog } from "./Dialog";
import { MovesTable } from "./MovesTable";
import { NumberDisplay } from "./NumberDisplay";

export const ComboDialog = () => {
  const { weapon } = useModel();
  const { calcAverage } = useCalcs();

  const [open, setOpen] = useState(false);

  const [combo, setCombo] = useState<Attack[]>([]);

  const total = useMemo(() => {
    return round(
      combo.reduce((acc, a) => acc + calcAverage(a), 0),
      2,
    );
  }, [combo, calcAverage]);

  useEffect(() => {
    setCombo([]);
  }, [weapon]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <SwordsIcon className="h-4 w-4" />
          Combo Builder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <DialogTitle asChild>
            <div className="flex items-start justify-between gap-2">
              <h1>Combo</h1>
              <Button variant="text" size="icon" onClick={() => setOpen(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
          <div>
            <NumberDisplay label="Average Total" value={total} />
          </div>
          <MovesTable
            custom={combo}
            onClick={(_, i) => setCombo(produce((d) => void d.splice(i, 1)))}
          />
          <div className="max-h-[20vh] overflow-auto pr-4">
            <MovesTable onClick={(a) => setCombo([...combo, a])} />
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
