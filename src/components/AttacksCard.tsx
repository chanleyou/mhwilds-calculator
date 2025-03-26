import { ListIcon } from "lucide-react";
import { useState } from "react";
import { useBuild, useComputed } from "@/store/builder";
import { useCombo, useTotalDamage, useTotalHits } from "@/store/combo";
import { cn } from "@/utils";
import {
  AttacksTable,
  Button,
  Card,
  Checkbox,
  ComboDialog,
  NumberDisplay,
  NumberInput,
} from ".";
import { ComboTable } from "./ComboTable";

type Props = Partial<React.ComponentProps<typeof Card>>;

export const AttacksCard = ({ ...props }: Props) => {
  const { isWound, rawHzv, eleHzv, setRawHzv, setEleHzv, setIsWound } =
    useBuild();
  const { mode } = useCombo();
  const totalHits = useTotalHits();
  const totalDamage = useTotalDamage();

  const [showCombo, setShowCombo] = useState(false);

  return (
    <Card {...props}>
      <h1>Damage</h1>
      <div className="flex flex-col gap-2">
        <div className="flex place-items-center">
          <Checkbox label="Wound" value={isWound} onChangeValue={setIsWound} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <NumberInput
            label="Hitzone (Raw)"
            value={rawHzv}
            onChangeValue={setRawHzv}
          />
          <NumberInput
            label="Hitzone (Element)"
            value={eleHzv}
            onChangeValue={setEleHzv}
          />
        </div>
      </div>
      <div className="flex items-start justify-end gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowCombo(!showCombo)}
        >
          <ListIcon className="size-4" />
          {showCombo ? "Show Attacks" : "Show Combo"}
        </Button>
        <ComboDialog />
      </div>
      <div className="overflow-auto">
        <div className={cn(!showCombo && "hidden")}>
          <div>
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
