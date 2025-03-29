import { ListIcon, SwordsIcon, TimerResetIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/store/builder";
import {
  useAddAttack,
  useCombo,
  useTotalDamage,
  useTotalHits,
} from "@/store/combo";
import { ComboModeOptions } from "@/types";
import {
  AttacksTable,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Notice,
  NumberDisplay,
  Select,
} from ".";
import { ComboTable } from "./ComboTable";

export const ComboDialog = () => {
  const { w } = useBuild();
  const { mode, reset, setComboMode } = useCombo();
  const addAttack = useAddAttack();
  const totalHits = useTotalHits();
  const totalDamage = useTotalDamage();

  const [open, setOpen] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const description = useMemo(() => {
    if (mode === "Snapshot") {
      return "Captures the damage of an attack when it is added.";
    }
    return "Re-calculates damage of all attacks when inputs change.";
  }, [mode]);

  useEffect(() => void reset(), [w.type, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          <SwordsIcon className="size-4" />
          Combo Builder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-dvh w-[100vw] sm:max-h-[85dvh] sm:w-3xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between">
            <DialogTitle asChild>
              <h1>Combo Builder</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="size-5" />
            </Button>
          </div>
          <Select
            label="Combo Mode"
            value={mode}
            options={[...ComboModeOptions]}
            onChangeValue={setComboMode}
            description={description}
          />
          <div>
            <NumberDisplay label="Total Average">{totalDamage}</NumberDisplay>
            <NumberDisplay label="Total Hits">{totalHits}</NumberDisplay>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowCombo(!showCombo)}
            >
              <ListIcon className="size-4" />
              {showCombo ? "Show Attacks" : "Show Combo"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="text-secondary"
              onClick={reset}
            >
              <TimerResetIcon className="size-4" />
              Reset
            </Button>
          </div>
          {showNotice && (
            <Notice>
              <div className="flex justify-between gap-2">
                Click on an attack to add/remove it from your combo.
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => setShowNotice(false)}
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            </Notice>
          )}
          <div className="overflow-auto pr-3">
            {showCombo ? <ComboTable /> : <AttacksTable onClick={addAttack} />}
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
