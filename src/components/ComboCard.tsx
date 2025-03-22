import { produce } from "immer";
import { TimerResetIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useCalculated } from "@/builder";
import { round } from "@/model";
import { Attack, SnapshotAttack } from "@/types";
import {
  Button,
  Card,
  MovesTable,
  NumberDisplay,
  Select,
  SnapshotMovesTable,
} from ".";

const ComboModeOptions = ["Dynamic", "Snapshot"] as const;
type ComboModeOption = (typeof ComboModeOptions)[number];

export const ComboCard = () => {
  const { calcAverage } = useCalculated();

  const [dynamicCombo, setDynamicCombo] = useState<Attack[]>([]);
  const [snapshotCombo, setSnapshotCombo] = useState<SnapshotAttack[]>([]);
  const [comboMode, setComboMode] = useState<ComboModeOption>("Dynamic");

  const totalDamage = useMemo(() => {
    if (comboMode === "Snapshot") {
      return snapshotCombo.reduce((acc, a) => acc + a.avg, 0);
    }
    return dynamicCombo.reduce((acc, a) => acc + calcAverage(a), 0);
  }, [comboMode, dynamicCombo, snapshotCombo, calcAverage]);

  const totalHits = useMemo(() => {
    if (comboMode === "Snapshot") return snapshotCombo.length;
    return dynamicCombo.length;
  }, [comboMode, dynamicCombo, snapshotCombo]);

  const description = useMemo(() => {
    if (comboMode === "Snapshot") {
      return "Captures the damage of an attack when it is added.";
    }
    return "Re-calculates damage of all attacks when inputs change.";
  }, [comboMode]);

  const removeAttack = (i: number) => {
    if (comboMode === "Snapshot") {
      setSnapshotCombo(produce((d) => void d.splice(i, 1)));
    } else {
      setDynamicCombo(produce((d) => void d.splice(i, 1)));
    }
  };

  return (
    <Card>
      <div>
        <h1>Combo</h1>
        <h3>Click on attacks to add or remove them from your combo.</h3>
      </div>
      <Select
        label="Mode"
        value={comboMode}
        options={[...ComboModeOptions]}
        onChangeValue={setComboMode}
        description={description}
      />
      <div>
        <NumberDisplay label="Total Average" value={round(totalDamage, 2)} />
        <NumberDisplay label="Total Hits" value={totalHits} />
      </div>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          className="text-secondary"
          onClick={() => {
            if (comboMode === "Snapshot") setSnapshotCombo([]);
            else setDynamicCombo([]);
          }}
        >
          <TimerResetIcon className="h-4 w-4" />
          Reset
        </Button>
      </div>
      {comboMode === "Dynamic" ? (
        <MovesTable
          custom={dynamicCombo}
          onClick={(_, i) => removeAttack(i)}
          hideHits
        />
      ) : (
        <SnapshotMovesTable
          moves={snapshotCombo}
          onClick={(_, i) => removeAttack(i)}
        />
      )}
    </Card>
  );
};
