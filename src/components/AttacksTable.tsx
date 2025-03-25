import { useMemo } from "react";
import Attacks from "@/data/attacks";
import { useComputed } from "@/store/builder";
import { Attack, isGunlance, isWeaponBowgun } from "@/types";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";

export function AttacksTable({
  custom,
  onClick,
  hideHits,
}: {
  custom?: Attack[];
  onClick?: (a: Attack, i: number) => void;
  hideHits?: boolean;
  canHide?: boolean;
}) {
  const { weapon: w, calcHit, calcCrit, calcAverage } = useComputed();

  const attacks: Attack[] = useMemo(() => {
    if (custom) return custom;

    if (w.type === "Charge Blade") {
      return Attacks["Charge Blade"].filter((a) => {
        if (!a.cbPhial) return true;
        if (w.phial === "Element") return a.eleMul !== 0;
        else if (w.phial === "Impact") return a.ignoreHzv;
        return true;
      });
    }

    if (isWeaponBowgun(w)) {
      return Attacks[w.type].filter((a) => {
        if (!a.ammo) return w.type === "Heavy Bowgun";
        if (!w.ammo[a.ammo.type]?.levels.includes(a.ammo.level)) return false;
        if (a.rapidFire && !w.ammo[a.ammo.type]?.rapidFire) return false;
        return true;
      });
    }
    if (isGunlance(w)) {
      const { type, level } = w.shelling;
      return Attacks["Gunlance"].filter((a) => {
        if (!a.shelling) return true;
        if (a.shelling.type && a.shelling.type !== type) return false;
        if (a.shelling.level && a.shelling.level !== level) return false;
        return true;
      });
    }

    return Attacks[w.type];
  }, [custom, w]);

  return (
    <Table>
      <thead>
        <TableHeadRow>
          <TableCell small className="w-full"></TableCell>
          <TableCell small className="text-right"></TableCell>
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
              key={`${a.name}-${i}`}
              onClick={onClick ? () => onClick(a, i) : undefined}
            >
              <TableCell small className="w-full text-left">
                {a.name}
              </TableCell>
              <TableCell small className="text-right">
                {a.hits && !hideHits && `${a.hits}x`}
              </TableCell>
              <TableCell small className="text-right">
                {hit}
              </TableCell>
              <TableCell small className="text-right">
                {!a.cantCrit && crit}
              </TableCell>
              <TableCell small className="text-primary text-right font-medium">
                {avg}
              </TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
}
