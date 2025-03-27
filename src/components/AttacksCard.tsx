import { ListIcon } from "lucide-react";
import { useState } from "react";
import { useBuild } from "@/store/builder";
import { useCombo, useTotalDamage, useTotalHits } from "@/store/combo";
import { Target } from "@/types";
import { cn } from "@/utils";
import {
  AttacksTable,
  Button,
  Card,
  Checkbox,
  ComboDialog,
  NumberDisplay,
  NumberInputTwo,
} from ".";
import { ComboTable } from "./ComboTable";
import { HitzoneDialog } from "./HitzoneDialog";

type Props = Partial<React.ComponentProps<typeof Card>>;

export const AttacksCard = ({ ...props }: Props) => {
  const { target, setTargetValue: setTarget } = useBuild();
  const { wound, ...hitzones } = target;
  const { mode } = useCombo();
  const totalHits = useTotalHits();
  const totalDamage = useTotalDamage();

  const [showCombo, setShowCombo] = useState(false);

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
      <div className="mb-3 grid grid-cols-2 gap-x-2 gap-y-2.5 sm:grid-cols-3">
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
        <Button
          variant="secondary"
          size="sm"
          className="text-secondary"
          onClick={() => setShowCombo(!showCombo)}
        >
          <ListIcon className="size-4" />
          {showCombo ? "Attacks" : "Combo"}
        </Button>
        <ComboDialog />
      </div>
      <div className="overflow-auto">
        <div className={cn(!showCombo && "hidden")}>
          <div className="mt-2">
            <NumberDisplay label="Combo Mode">{mode}</NumberDisplay>
            <NumberDisplay label="Total Average">{totalDamage}</NumberDisplay>
            <NumberDisplay label="Total Hits">{totalHits}</NumberDisplay>
          </div>
          <ComboTable disabled />
        </div>
        <div className={cn(showCombo && "hidden")}>
          <AttacksTable />
        </div>
      </div>
    </Card>
  );
};
