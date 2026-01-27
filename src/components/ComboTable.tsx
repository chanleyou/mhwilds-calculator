import { useMemo } from "react";
import { round } from "@/model";
import { useComputed } from "@/store/builder";
import { useCombo } from "@/store/combo";
import { ComboModeOption, DynamicAttack, SnapshotAttack } from "@/types";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";

export const ComboTable = ({
  disabled,
  mode: modeProp,
  dynamic: dynamicProp,
  snapshot: snapshotProp,
  onRemove,
}: {
  disabled?: boolean;
  mode?: ComboModeOption;
  dynamic?: DynamicAttack[];
  snapshot?: SnapshotAttack[];
  onRemove?: (index: number) => void;
}) => {
  const comboStore = useCombo();
  const { calculateAtk } = useComputed();

  // Use props if provided, otherwise fall back to store
  const mode = modeProp ?? comboStore.mode;
  const dynamic = dynamicProp ?? comboStore.dynamic;
  const snapshot = snapshotProp ?? comboStore.snapshot;
  const removeDynamic = onRemove ?? comboStore.removeDynamic;
  const removeSnapshot = onRemove ?? comboStore.removeSnapshot;

  const dynamicWithDamage = useMemo(() => {
    return dynamic.map(({ count, ...a }, i) => ({
      ...a,
      count,
      index: i,
      ...calculateAtk(a),
    }));
  }, [dynamic, calculateAtk]);

  return (
    <Table>
      <thead>
        <TableHeadRow>
          <TableCell small className="w-full"></TableCell>
          <TableCell small className="text-right">
            Hit
          </TableCell>
          <TableCell small className="text-right">
            Crit
          </TableCell>
          <TableCell small className="text-right">
            Avg
          </TableCell>
        </TableHeadRow>
      </thead>
      <tbody>
        {mode === "Dynamic" &&
          dynamicWithDamage.map((a) => {
            return (
              <TableRow
                key={`${a.name}-${a.index}`}
                onClick={disabled ? undefined : () => removeDynamic(a.index)}
              >
                <TableCell small className="w-full text-left">
                  {a.name}
                  {a.count > 1 && ` x${a.count}`}
                </TableCell>
                <TableCell small className="text-right">
                  {round(a.hit * a.count)}
                </TableCell>
                <TableCell small className="text-right">
                  {!a.cantCrit && round(a.crit * a.count)}
                </TableCell>
                <TableCell
                  small
                  className="text-primary text-right font-medium"
                >
                  {round(a.avg * a.count, 2)}
                </TableCell>
              </TableRow>
            );
          })}
        {mode === "Snapshot" &&
          snapshot.map((a, i) => {
            return (
              <TableRow
                key={`${a.name}-${i}`}
                onClick={disabled ? undefined : () => removeSnapshot(i)}
              >
                <TableCell small className="w-full text-left">
                  {a.name}
                  {a.count > 1 && ` x${a.count}`}
                </TableCell>
                <TableCell small className="text-right">
                  {a.hit}
                </TableCell>
                <TableCell small className="text-right">
                  {!a.cantCrit && a.crit}
                </TableCell>
                <TableCell
                  small
                  className="text-primary text-right font-medium"
                >
                  {a.avg}
                </TableCell>
              </TableRow>
            );
          })}
      </tbody>
    </Table>
  );
};
