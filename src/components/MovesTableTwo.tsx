import { useMemo } from "react";
import { useBuild, useComputed } from "@/builder";
import Attacks from "@/data/attacks";
import { Attack } from "@/types";
import { cn } from "@/utils";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";

export function MovesTableTwo({
  custom,
  onClick,
  hideHits,
}: {
  custom?: Attack[];
  onClick?: (a: Attack, i: number) => void;
  hideHits?: boolean;
}) {
  const { weapon: w } = useBuild();
  const { calcHit, calcCrit, calcAverage } = useComputed();

  const attacks: Attack[] = useMemo(() => {
    if (custom) return custom;
    return Attacks[w.type];
  }, [custom, w]);

  return (
    <Table>
      <thead>
        <TableHeadRow>
          <TableCell small></TableCell>
          <TableCell small></TableCell>
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
        {attacks.map((a, i) => {
          const hit = calcHit(a);
          const crit = calcCrit(a);
          const avg = calcAverage(a);
          return (
            <TableRow
              className={cn(onClick && "hover:bg-content-alt")}
              key={`${a.name}-${i}`}
              onClick={() => onClick?.(a, i)}
            >
              <TableCell small>{a.name}</TableCell>
              <TableCell small className="text-right font-mono">
                {a.hits && !hideHits && `${a.hits}x`}
              </TableCell>
              <TableCell small className="text-right font-mono">
                {hit}
              </TableCell>
              <TableCell small className="text-right font-mono">
                {!a.cantCrit && crit}
              </TableCell>
              <TableCell
                small
                className="text-primary text-right font-mono font-medium"
              >
                {avg}
              </TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
}
