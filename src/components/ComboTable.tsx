import { useCombo } from "@/store/combo";
import { MovesTableTwo, SnapshotMovesTable } from ".";

export const ComboTable = () => {
  const { comboMode, dynamic, snapshot } = useCombo();

  if (comboMode === "Dynamic") {
    return <MovesTableTwo custom={dynamic} />;
  }

  return <SnapshotMovesTable moves={snapshot} />;
};
