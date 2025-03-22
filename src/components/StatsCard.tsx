import { useMemo } from "react";
import { useCalculated, useComputed } from "@/builder";
import { cn } from "@/utils";
import { Card, NumberDisplay } from ".";

export const StatsCard = () => {
  const { uiAttack, uiElement, uiAffinity } = useComputed();
  const { calcEffectiveRaw, calcEffectiveEle } = useCalculated();

  const efr = useMemo(() => calcEffectiveRaw(), [calcEffectiveRaw]);
  const efe = useMemo(() => calcEffectiveEle(), [calcEffectiveEle]);
  return (
    <Card>
      <div>
        <h1>Stats</h1>
      </div>
      <div>
        <NumberDisplay label="Attack" value={uiAttack} />
        <NumberDisplay label="Effective Attack" value={efr} />
        <NumberDisplay label="Affinity" value={uiAffinity} suffix="%" />
        <NumberDisplay
          className={cn(uiElement === 0 && "text-placeholder")}
          label="Element"
          value={uiElement}
        />
        <NumberDisplay
          className={cn(efe === 0 && "text-placeholder")}
          label={"Effective Element"}
          value={efe}
        />
      </div>
    </Card>
  );
};
