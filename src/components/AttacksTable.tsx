import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useMemo } from "react";
import Attacks, { OtherAttacks } from "@/data/attacks";
import { useComputed } from "@/store/builder";
import { Attack, isGunlance, isWeaponBowgun } from "@/types";
import { Table, TableCell, TableHeadRow, TableRow } from "./Table";
import { TooltipContent } from "./Tooltip";

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
  const { weapon: w, buffs, calculateAtk } = useComputed();

  const weaponAttacks: Attack[] = useMemo(() => {
    if (custom) return custom;

    if (w.songs !== undefined) {
      return Attacks["Hunting Horn"].filter((a) => {
        if (!a.melody) return true;
        if (a.name.includes("Resounding Melody")) {
          return w.songs?.includes("Resounding Melody");
        }
        return w.songs?.some((s) => a.name.includes(s));
      });
    }

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

  const attacks = useMemo(() => {
    const convertElement = buffs["Convert Element"]?.name;
    const convertElementAttack = convertElement
      ? OtherAttacks[convertElement]
      : undefined;

    if (convertElementAttack) {
      return [convertElementAttack, ...weaponAttacks];
    }

    return weaponAttacks;
  }, [weaponAttacks, buffs]);
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
          const { hit, crit, avg } = calculateAtk(a);
          return (
            <TableRow
              key={a.name}
              onClick={onClick ? () => onClick(a, i) : undefined}
            >
              <TableCell small className="w-full text-left">
                <Tooltip key={`${a.name}-${i}`}>
                  <TooltipTrigger asChild>
                    <div className="w-full text-left">{a.name}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      {a.fixedRaw ? (
                        <p>{a.fixedRaw} Fixed</p>
                      ) : (
                        <>
                          {!a.ignoreHzv && <p>{a.rawType ?? "Slash"}</p>}
                          <p>{a.mv} MV</p>
                          {a.rawMul && <p>Raw: {a.rawMul}x</p>}
                        </>
                      )}
                      {a.fixedEle ? (
                        <p>
                          {a.fixedEle} {a.elementType}
                        </p>
                      ) : (
                        <>
                          {a.eleMul !== undefined && (
                            <p>Element: {a.eleMul * 100}%</p>
                          )}
                          {a.rawEle && <p>Element: {a.rawEle}%</p>}
                          {a.elementType && <p>{a.elementType}</p>}
                        </>
                      )}
                      {a.ignoreHzv && <p>Ignore HZV</p>}
                      {a.cantCrit && <p>Cannot Crit</p>}
                      {a.ignoreSharpness && <p>Ignore Sharpness</p>}
                      {a.cbAxe && <p>Axe Mode</p>}
                      {a.cbPhial && <p>Phial</p>}
                      {a.saType && <p>{a.saType} Mode</p>}
                      {a.ignoreCoating && <p>Ignore Coating</p>}
                      {a.airborne && <p>Airborne</p>}
                      {a.charge && <p>Charge Master</p>}
                      {a.normalShot && <p>Normal Shots</p>}
                      {a.piercingShot && <p>Piercing Shots</p>}
                      {a.spreadPowerShot && <p>Spread/Power Shots</p>}
                      {a.specialAmmo && <p>Special Ammo Boost</p>}
                      {(a.shelling || a.artilleryAmmo) && <p>Artillery</p>}
                      {a.rapidFire && <p>Rapid Fire</p>}
                      {a.morph && <p>Rapid Morph</p>}
                    </div>
                  </TooltipContent>
                </Tooltip>
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
