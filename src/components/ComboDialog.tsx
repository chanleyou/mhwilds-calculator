import { ListIcon, SwordsIcon, TimerResetIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCombo } from "@/store/combo";
import { Attack, ComboModeOption, ComboModeOptions, DynamicAttack, SnapshotAttack } from "@/types";
import { AttacksTable, Button, Notice, NumberDisplay, Select } from ".";
import { ComboExportDialog } from "./ComboExportDialog";
import { ComboImportDialog } from "./ComboImportDialog";
import { ComboTable } from "./ComboTable";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { produce } from "immer";
import _ from "lodash";
import { useComputed } from "@/store/builder";
import { round } from "@/model";

export const ComboDialog = () => {
  const comboStore = useCombo();
  const { mode, reset, setComboMode, addDynamic, addSnapshot } = comboStore;
  const { calculateAtk } = useComputed();

  const [open, setOpen] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  // Local state for editing
  const [localMode, setLocalMode] = useState<ComboModeOption>(mode);
  const [localDynamic, setLocalDynamic] = useState<DynamicAttack[]>([]);
  const [localSnapshot, setLocalSnapshot] = useState<SnapshotAttack[]>([]);

  // Initialize local state when dialog opens
  useEffect(() => {
    if (open) {
      setLocalMode(comboStore.mode);
      setLocalDynamic([...comboStore.dynamic]);
      setLocalSnapshot([...comboStore.snapshot]);
    }
  }, [open, comboStore.mode, comboStore.dynamic, comboStore.snapshot]);

  // Local add attack function
  const localAddAttack = (attack: Attack) => {
    if (localMode === "Dynamic") {
      setLocalDynamic(
        produce(localDynamic, (draft) => {
          const last = draft[draft.length - 1];
          if (!last) {
            draft.push({ ...attack, count: 1 });
          } else if (last.name === attack.name) {
            last.count += 1;
          } else {
            draft.push({ ...attack, count: 1 });
          }
        })
      );
    } else {
      const { hit, crit, avg } = calculateAtk(attack);
      setLocalSnapshot(
        produce(localSnapshot, (draft) => {
          if (draft.length === 0) {
            draft.push({ ...attack, hit, crit, avg, count: 1 });
            return;
          }
          const last = draft[draft.length - 1];
          const { count, ...rest } = last;
          const newAttack = { ...attack, hit, crit, avg };
          if (_.isEqual(rest, newAttack)) {
            last.count += 1;
          } else {
            draft.push({ ...newAttack, count: 1 });
          }
        })
      );
    }
  };

  // Local remove attack function
  const localRemoveAttack = (index: number) => {
    if (localMode === "Dynamic") {
      setLocalDynamic(
        produce(localDynamic, (draft) => {
          if (!draft[index]) return;
          if (draft[index].count === 1) draft.splice(index, 1);
          else draft[index].count -= 1;
        })
      );
    } else {
      setLocalSnapshot(
        produce(localSnapshot, (draft) => {
          if (!draft[index]) return;
          if (draft[index].count === 1) draft.splice(index, 1);
          else draft[index].count -= 1;
        })
      );
    }
  };

  // Calculate local totals
  const localTotalHits = useMemo(() => {
    const attacks = localMode === "Dynamic" ? localDynamic : localSnapshot;
    return attacks.reduce((acc, a) => acc + a.count, 0);
  }, [localMode, localDynamic, localSnapshot]);

  const localTotalDamage = useMemo(() => {
    if (localMode === "Dynamic") {
      return round(
        localDynamic.reduce((acc, a) => {
          const { avg } = calculateAtk(a);
          return acc + avg * a.count;
        }, 0),
        2
      );
    } else {
      return round(
        localSnapshot.reduce((acc, a) => acc + a.avg * a.count, 0),
        2
      );
    }
  }, [localMode, localDynamic, localSnapshot, calculateAtk]);

  const description = useMemo(() => {
    if (localMode === "Snapshot") {
      return "Captures the damage of an attack when it is added.";
    }
    return "Re-calculates damage of all attacks when inputs change.";
  }, [localMode]);

  const handleSave = () => {
    // Commit changes to store
    reset();
    setComboMode(localMode);

    if (localMode === "Dynamic") {
      localDynamic.forEach(attack => {
        for (let i = 0; i < attack.count; i++) {
          addDynamic(attack);
        }
      });
    } else {
      localSnapshot.forEach(attack => {
        for (let i = 0; i < attack.count; i++) {
          addSnapshot(attack);
        }
      });
    }

    setOpen(false);
  };

  const handleReset = () => {
    setLocalDynamic([]);
    setLocalSnapshot([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          <SwordsIcon className="size-4" />
          Combo Builder
        </Button>
      </DialogTrigger>
      <DialogContent setOpen={setOpen} title="Combo Builder">
        <Select
          label="Combo Mode"
          value={localMode}
          options={[...ComboModeOptions]}
          onChangeValue={setLocalMode}
          description={description}
        />
        <div>
          <NumberDisplay label="Total Average">{localTotalDamage}</NumberDisplay>
          <NumberDisplay label="Total Hits">{localTotalHits}</NumberDisplay>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <ComboImportDialog />
            <ComboExportDialog />
          </div>
          <div className="flex gap-2">
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
              onClick={handleReset}
            >
              <TimerResetIcon className="size-4" />
              Reset
            </Button>
          </div>
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
        <div className="overflow-y-auto pr-2">
          {showCombo ? (
            <ComboTable
              mode={localMode}
              dynamic={localDynamic}
              snapshot={localSnapshot}
              onRemove={localRemoveAttack}
            />
          ) : (
            <AttacksTable onClick={localAddAttack} />
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
