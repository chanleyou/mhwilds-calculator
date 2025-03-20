import { SnapshotAttack } from "@/types";
import { cn } from "@/utils";

export function SnapshotMovesTable({
  moves,
  onClick,
}: {
  moves: SnapshotAttack[];
  onClick?: (a: SnapshotAttack, i: number) => void;
}) {
  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-right first:w-full first:pl-0 first:text-left last:pr-0",
    !!onClick && "cursor-pointer",
  );

  return (
    <table className="w-full table-auto border-collapse text-xs">
      <thead>
        <tr className="border-primary border-b">
          <th className={cellCn}></th>
          <th className={cellCn}>Hit</th>
          <th className={cellCn}>Crit</th>
          <th className={cellCn}>Avg</th>
        </tr>
      </thead>
      <tbody>
        {moves.map((a, i) => (
          <tr
            className="border-b border-zinc-800 p-1.5 last:border-0"
            key={`${a.name}-${i}`}
            onClick={() => onClick?.(a, i)}
          >
            <td className={cellCn}>{a.name}</td>
            <td className={cn(cellCn, "font-mono")}>{a.hit}</td>
            <td className={cn(cellCn, "font-mono")}>{!a.cantCrit && a.crit}</td>
            <td className={cn(cellCn, "text-primary font-mono font-bold")}>
              {a.avg}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
