import { useMemo } from "react";
import { useCalcs, useGetters } from "@/store";
import { Card, NumberDisplay } from ".";

export const StatsCard = () => {
  const { uiAttack, uiElement, uiAffinity } = useGetters();
  const { calcEffectiveRaw, calcEffectiveEle } = useCalcs();

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
        <NumberDisplay label="Element" value={uiElement} />
        <NumberDisplay label={"Effective Element"} value={efe} />
      </div>
    </Card>
  );
};
