import { useComputed } from "@/builder";
import { getSharpnessEle } from "@/data";
import { getSharpnessRaw } from "@/data";
import { Card, NumberDisplay, SharpnessBar } from ".";

export const StatsCard = ({ className }: { className?: string }) => {
  const {
    weapon: w,
    uiAttack,
    uiElement,
    uiAffinity,
    effectiveRaw,
    effectiveEle,
    critMulti,
    eleCritMulti,
  } = useComputed();

  return (
    <Card className={className}>
      <div>
        <h1>Stats</h1>
      </div>
      <div>
        <NumberDisplay label="Attack">{uiAttack}</NumberDisplay>
        <NumberDisplay label="Effective Attack">{effectiveRaw}</NumberDisplay>
        <NumberDisplay label="Affinity">{`${uiAffinity}%`}</NumberDisplay>
        {w.element && w.element.value > 0 && (
          <>
            <NumberDisplay label="Element">
              {`${uiElement} ${w.element.type}`}
            </NumberDisplay>
            <NumberDisplay label={"Effective Element"}>
              {effectiveEle}
            </NumberDisplay>
          </>
        )}
        {w.status && w.status.value > 0 && (
          <>
            <NumberDisplay label="Status">
              {`${w.status.type} ${w.status.value}`}
            </NumberDisplay>
            {/* <NumberDisplay label={"Effective Element"}>
              {effectiveEle}
            </NumberDisplay> */}
          </>
        )}
        {w.shelling && (
          <NumberDisplay label="Shelling">
            {w.shelling.type} {w.shelling.level}
          </NumberDisplay>
        )}
        {w.phial && <NumberDisplay label="Phial">{w.phial}</NumberDisplay>}
        <NumberDisplay label="Crit Multi">
          {`${critMulti}x / ${eleCritMulti}x`}
        </NumberDisplay>
        {w.sharpness && (
          <>
            <NumberDisplay label="Sharpness">
              <SharpnessBar sharpness={w.sharpness} />
            </NumberDisplay>
            <NumberDisplay label="Sharpness Multi">
              {`${getSharpnessRaw(w.sharpness)}x / ${getSharpnessEle(w.sharpness)}x`}
            </NumberDisplay>
          </>
        )}
      </div>
    </Card>
  );
};
