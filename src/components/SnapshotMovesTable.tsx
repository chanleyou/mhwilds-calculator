import { SnapshotAttack } from "@/types";
import { cn } from "@/utils";

export function SnapshotMovesTable({
  moves,
  onClick,
  className,
}: {
  moves: SnapshotAttack[];
  onClick?: (a: SnapshotAttack, i: number) => void;
  className?: string;
}) {
  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-right first:w-full first:pl-0 first:text-left last:pr-0",
    !!onClick && "cursor-pointer",
  );

  return (
    <table
      className={cn("w-full table-auto border-collapse text-xs", className)}
    >
      <thead>
        <tr className="border-divider border-b">
          <th className={cellCn}></th>
          <th className={cellCn}>Hit</th>
          <th className={cellCn}>Crit</th>
          <th className={cellCn}>Avg</th>
        </tr>
      </thead>
      <tbody>
        {moves.map((a, i) => (
          <tr
            className={cn(
              "border-content-alt border-b p-1.5 last:border-0",
              onClick && "hover:bg-content-alt",
            )}
            key={`${a.name}-${i}`}
            onClick={() => onClick?.(a, i)}
          >
            <td className={cellCn}>{a.name}</td>
            <td className={cn(cellCn, "font-mono")}>{a.hit}</td>
            <td className={cn(cellCn, "font-mono")}>{!a.cantCrit && a.crit}</td>
            <td className={cn(cellCn, "text-primary font-mono font-medium")}>
              {a.avg}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
