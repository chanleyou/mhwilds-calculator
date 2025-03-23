import { useBuild, useComputed } from "@/builder";
import { cn } from "@/utils";
import { Card, NumberDisplay } from ".";

export const StatsCard = () => {
  const { weapon: w } = useBuild();
  const { uiAttack, uiElement, uiAffinity, effectiveRaw, effectiveEle } =
    useComputed();

  return (
    <Card>
      <div>
        <h1>Stats</h1>
      </div>
      <div>
        <NumberDisplay label="Attack" value={uiAttack} />
        <NumberDisplay label="Effective Attack" value={effectiveRaw} />
        <NumberDisplay label="Affinity" value={uiAffinity} suffix="%" />
        <NumberDisplay
          className={cn(uiElement === 0 && "text-placeholder")}
          label="Element"
          value={w.element ? `${uiElement} ${w.elementType}` : 0}
        />
        <NumberDisplay
          className={cn(effectiveEle === 0 && "text-placeholder")}
          label={"Effective Element"}
          value={effectiveEle}
        />
        {w.phial && <NumberDisplay label="Phial" value={w.phial} />}
      </div>
    </Card>
  );
};
