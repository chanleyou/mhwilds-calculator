import { getSharpnessEle } from "@/data";
import { getSharpnessRaw } from "@/data";
import { useBuild, useComputed } from "@/store/builder";
import { ArtianUpgradeOptions } from "@/types";
import { ArtianInfusionOptions } from "@/types";
import { BowgunAmmoDisplay, Card, NumberDisplay, SharpnessBar } from ".";

export const StatsCard = ({ className }: { className?: string }) => {
  const { artian } = useBuild();
  const {
    weapon: w,
    uiAttack,
    uiElement,
    uiAffinity,
    uiStatus,
    effectiveRaw,
    effectiveEle,
    critMulti,
    eleCritMulti,
  } = useComputed();

  return (
    <Card className={className}>
      <h1>Stats</h1>
      <div>
        <NumberDisplay label="Attack">{uiAttack}</NumberDisplay>
        <NumberDisplay label="Effective Attack">{effectiveRaw}</NumberDisplay>
        <NumberDisplay label="Affinity">{`${uiAffinity}%`}</NumberDisplay>
        {w.element && uiElement > 0 && (
          <>
            <NumberDisplay label="Element">
              {`${uiElement} ${w.element.type}`}
            </NumberDisplay>
            <NumberDisplay label={"Effective Element"}>
              {effectiveEle}
            </NumberDisplay>
          </>
        )}
        {w.status && uiStatus > 0 && (
          <>
            <NumberDisplay label="Status">
              {`${uiStatus} ${w.status.type}`}
            </NumberDisplay>
            {/* <NumberDisplay label={"Effective Element"}>
              {effectiveEle}
            </NumberDisplay> */}
          </>
        )}
        <NumberDisplay label="Crit Multi">
          {`${critMulti}x / ${eleCritMulti}x`}
        </NumberDisplay>
        {w.sharpness && (
          <>
            <NumberDisplay label="Sharpness Multi">
              {`${getSharpnessRaw(w.sharpness)}x / ${getSharpnessEle(w.sharpness)}x`}
            </NumberDisplay>
            <NumberDisplay label="Sharpness">
              <SharpnessBar sharpness={w.sharpness} />
            </NumberDisplay>
          </>
        )}
        {w.ammo && (
          <NumberDisplay label="Ammo">
            <BowgunAmmoDisplay ammo={w.ammo} className="text-right" />
          </NumberDisplay>
        )}
        {w.coatings && (
          <NumberDisplay label="Coatings">
            {w.coatings.map((c) => (
              <p className="text-right" key={c}>
                {c}
              </p>
            ))}
          </NumberDisplay>
        )}
        {w.shelling && (
          <NumberDisplay label="Shelling">
            {w.shelling.type} {w.shelling.level}
          </NumberDisplay>
        )}
        {w.phial && <NumberDisplay label="Phial">{w.phial}</NumberDisplay>}
        {w.songs && (
          <NumberDisplay label="Songs" className="border-none">
            {w.songs.map((s) => (
              <p className="text-right" key={s}>
                {s}
              </p>
            ))}
          </NumberDisplay>
        )}
      </div>
      {w.artian && (
        <div className="flex flex-col gap-1">
          <h1>Artian</h1>
          <div>
            <NumberDisplay label="Element">{artian.element}</NumberDisplay>
            <NumberDisplay label="Infusion" className="text-right">
              {ArtianInfusionOptions.map((o) => {
                const length = artian.infusions.filter((i) => i === o).length;
                if (length === 0) return;
                return (
                  <p key={o}>
                    {length}x {o}
                  </p>
                );
              })}
            </NumberDisplay>
            <NumberDisplay label="Reinforcement" className="text-right">
              {ArtianUpgradeOptions.map((o) => {
                const length = artian.upgrades.filter((i) => i === o).length;
                if (length === 0) return;
                return (
                  <p key={o}>
                    {length}x {o}
                  </p>
                );
              })}
            </NumberDisplay>
          </div>
        </div>
      )}
    </Card>
  );
};
