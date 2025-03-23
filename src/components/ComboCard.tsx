import { TimerResetIcon } from "lucide-react";
import { useMemo } from "react";
import { useComputed } from "@/builder";
import { round } from "@/model";
import {
  Attack,
  ComboModeOption,
  ComboModeOptions,
  SnapshotAttack,
} from "@/types";
import {
  Button,
  Card,
  MovesTableTwo,
  NumberDisplay,
  Select,
  SnapshotMovesTable,
} from ".";

export const ComboCard = ({
  comboMode,
  setComboMode,
  dynamicCombo,
  snapshotCombo,
  resetCombo,
  removeAttack,
}: {
  comboMode: ComboModeOption;
  setComboMode: (c: ComboModeOption) => void;
  dynamicCombo: Attack[];
  snapshotCombo: SnapshotAttack[];
  resetCombo: () => void;
  removeAttack: (i: number) => void;
}) => {
  const { calcAverage } = useComputed();

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
          onClick={resetCombo}
        >
          <TimerResetIcon className="h-4 w-4" />
          Reset
        </Button>
      </div>
      {comboMode === "Dynamic" ? (
        <MovesTableTwo
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
