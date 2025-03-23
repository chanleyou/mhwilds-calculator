import { useMemo } from "react";
import { useBuild, useComputed } from "@/builder";
import Attacks from "@/data/attacks";
import { Attack } from "@/types";
import { cn } from "@/utils";

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

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-right first:w-full first:pl-0 first:text-left last:pr-0",
    !!onClick && "cursor-pointer",
  );

  return (
    <table className="w-full table-auto border-collapse text-xs">
      <thead>
        <tr className="border-primary border-b">
          <th className={cellCn}></th>
          <th className={cellCn}></th>
          <th className={cellCn}>Hit</th>
          <th className={cellCn}>Crit</th>
          <th className={cellCn}>Avg</th>
        </tr>
      </thead>
      <tbody>
        {attacks.map((a, i) => {
          const hit = calcHit(a);
          const crit = calcCrit(a);
          const avg = calcAverage(a);
          return (
            <tr
              className="border-b border-zinc-800 p-1.5 last:border-0"
              key={`${a.name}-${i}`}
              onClick={() => onClick?.(a, i)}
            >
              <td className={cellCn}>{a.name}</td>
              <td className={cn(cellCn, "font-mono")}>
                {a.hits && !hideHits && `${a.hits}x`}
              </td>
              <td className={cn(cellCn, "font-mono")}>{hit}</td>
              <td className={cn(cellCn, "font-mono")}>{!a.cantCrit && crit}</td>
              <td className={cn(cellCn, "text-primary font-mono font-bold")}>
                {avg}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
