import { useState } from "react";
import { useBuild } from "@/store/builder";
import { useCombo, useTotalDamage, useTotalHits } from "@/store/combo";
import { Target } from "@/types";
import { cn } from "@/utils";
import {
  AttacksTable,
  Card,
  Checkbox,
  ComboDialog,
  NumberDisplay,
  NumberInputTwo,
  Tab,
} from ".";
import { ComboTable } from "./ComboTable";
import { HitzoneDialog } from "./HitzoneDialog";

type Props = Partial<React.ComponentProps<typeof Card>>;

const TabOptions = ["Attacks", "Combo"] as const;
type TabOption = (typeof TabOptions)[number];

export const AttacksCard = ({ ...props }: Props) => {
  const { target, setTargetValue: setTarget } = useBuild();
  const { wound, ...hitzones } = target;
  const { mode } = useCombo();
  const totalHits = useTotalHits();
  const totalDamage = useTotalDamage();

  const [tab, setTab] = useState<TabOption>("Attacks");

  return (
    <Card {...props}>
      <h1>Damage</h1>
      <div className="mb-1 flex justify-start">
        <Checkbox
          label="Wound"
          value={target.wound}
          onChangeValue={() => setTarget("wound", !target.wound)}
        />
      </div>
      <div className="mb-2 grid grid-cols-2 gap-x-2 gap-y-2.5 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(hitzones).map(([k, v]) => (
          <NumberInputTwo
            key={k}
            label={k}
            value={v}
            onChangeValue={(v) => setTarget(k as keyof Target, v)}
            min={0}
            max={100}
          />
        ))}
      </div>
      <div className="flex items-start justify-end gap-2">
        <HitzoneDialog />
        <ComboDialog />
      </div>
      <Tab options={[...TabOptions]} value={tab} setValue={setTab} />
      <div className="overflow-auto">
        <div className={cn(tab === "Attacks" && "hidden")}>
          <div className="mt-2">
            <NumberDisplay label="Combo Mode">{mode}</NumberDisplay>
            <NumberDisplay label="Total Average">{totalDamage}</NumberDisplay>
            <NumberDisplay label="Total Hits">{totalHits}</NumberDisplay>
          </div>
          <ComboTable disabled />
        </div>
        <div className={cn(tab === "Combo" && "hidden")}>
          <AttacksTable />
        </div>
      </div>
    </Card>
  );
};
