import { round } from "@/model";
import { useComputed } from "@/store/builder";
import { useCombo } from "@/store/combo";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";

export const ComboTable = ({ disabled }: { disabled?: boolean }) => {
  const { mode, dynamic, snapshot, removeDynamic, removeSnapshot } = useCombo();
  const { calcHit, calcCrit, calcAverage } = useComputed();

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
          dynamic.map(({ count, ...a }, i) => {
            const hit = calcHit(a);
            const crit = calcCrit(a);
            const avg = calcAverage(a);
            return (
              <TableRow
                key={`${a.name}-${i}`}
                onClick={disabled ? undefined : () => removeDynamic(i)}
              >
                <TableCell small className="w-full text-left">
                  {a.name}
                  {count > 1 && ` x${count}`}
                </TableCell>
                <TableCell small className="text-right">
                  {round(hit * count)}
                </TableCell>
                <TableCell small className="text-right">
                  {!a.cantCrit && round(crit * count)}
                </TableCell>
                <TableCell
                  small
                  className="text-primary text-right font-medium"
                >
                  {round(avg * count, 2)}
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
