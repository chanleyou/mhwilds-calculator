import { ListCheckIcon } from "lucide-react";
import { useState } from "react";
import { useBuild } from "@/store/builder";
import { useCombo, useTotalDamage, useTotalHits } from "@/store/combo";
import { cn } from "@/utils";
import {
  Button,
  Card,
  Checkbox,
  ComboDialog,
  MovesTableTwo,
  NumberDisplay,
  NumberInput,
} from ".";
import { ComboTable } from "./ComboTable";

export const AttacksCard = () => {
  const { isWound, rawHzv, eleHzv, setRawHzv, setEleHzv, setIsWound } =
    useBuild();
  const { comboMode } = useCombo();
  const totalHits = useTotalHits();
  const totalDamage = useTotalDamage();

  const [showCombo, setShowCombo] = useState(false);

  return (
    <Card>
      <div>
        <h1>Damage</h1>
      </div>
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
          <ListCheckIcon className="size-4" />
          {showCombo ? "Show Attacks" : "Show Combo"}
        </Button>
        <ComboDialog />
      </div>
      <div className={cn(!showCombo && "hidden")}>
        <div>
          <NumberDisplay label="Combo Mode">{comboMode}</NumberDisplay>
          <NumberDisplay label="Total Average">{totalDamage}</NumberDisplay>
          <NumberDisplay label="Total Hits">{totalHits}</NumberDisplay>
        </div>
        <ComboTable />
      </div>
      <div className={cn(showCombo && "hidden")}>
        <MovesTableTwo />
      </div>
    </Card>
  );
};
