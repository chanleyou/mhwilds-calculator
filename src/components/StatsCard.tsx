import { useComputed } from "@/builder";
import { Card, NumberDisplay, SharpnessBar } from ".";

export const StatsCard = ({ className }: { className?: string }) => {
  const {
    weapon: w,
    uiAttack,
    uiElement,
    uiAffinity,
    effectiveRaw,
    effectiveEle,
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
        {w.element && (
          <>
            <NumberDisplay label="Element">
              {`${uiElement} ${w.element.type}`}
            </NumberDisplay>
            <NumberDisplay label={"Effective Element"}>
              {effectiveEle}
            </NumberDisplay>
          </>
        )}
        {w.phial && <NumberDisplay label="Phial">{w.phial}</NumberDisplay>}
        {w.sharpness && (
          <NumberDisplay label="Sharpness">
            <SharpnessBar sharpness={w.sharpness} />
          </NumberDisplay>
        )}
      </div>
    </Card>
  );
};
