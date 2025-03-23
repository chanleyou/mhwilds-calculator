"use client";

import { produce } from "immer";
import { useState } from "react";
import { useBuild, useComputed } from "@/builder";
import {
  BuffsCard,
  Button,
  Card,
  Checkbox,
  ComboCard,
  EquipmentCard,
  MovesTableTwo,
  NumberInput,
  SkillPointCard,
  StatsCard,
} from "@/components";
import { Attack, ComboModeOption, SnapshotAttack } from "@/types";
import { cn } from "@/utils";

export default function Builder() {
  const { isWound, rawHzv, eleHzv, setRawHzv, setEleHzv, setIsWound } =
    useBuild();
  const build = useComputed();
  const { calcHit, calcCrit, calcAverage } = build;

  const [showDamage, setShowDamage] = useState(false);

  const [comboMode, setComboMode] = useState<ComboModeOption>("Dynamic");

  const addAttack = (a: Attack) => {
    if (comboMode === "Snapshot") {
      setSnapshotCombo(
        produce(
          (d) =>
            void d.push({
              name: a.name ?? "",
              hit: calcHit(a),
              crit: calcCrit(a),
              avg: calcAverage(a),
              cantCrit: a.cantCrit,
            }),
        ),
      );
    } else {
      setDynamicCombo(produce((d) => void d.push(a)));
    }
  };

  const [dynamicCombo, setDynamicCombo] = useState<Attack[]>([]);
  const [snapshotCombo, setSnapshotCombo] = useState<SnapshotAttack[]>([]);

  const removeAttack = (i: number) => {
    if (comboMode === "Snapshot") {
      setSnapshotCombo(produce((d) => void d.splice(i, 1)));
    } else {
      setDynamicCombo(produce((d) => void d.splice(i, 1)));
    }
  };

  const resetCombo = () => {
    if (comboMode === "Snapshot") setSnapshotCombo([]);
    else setDynamicCombo([]);
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-7xl flex-col gap-2",
        showDamage && "w-10xl",
      )}
    >
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-2 flex-col gap-2">
          <EquipmentCard />
          <BuffsCard />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <StatsCard />
          <SkillPointCard />
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => setShowDamage(!showDamage)}
            >
              Damage
            </Button>
          </div>
          {/* <Card>
            <textarea
              className="font-mono text-xs"
              value={JSON.stringify(build, undefined, 2)}
              rows={100}
              readOnly
            />
          </Card> */}
          {showDamage && (
            <ComboCard
              comboMode={comboMode}
              setComboMode={setComboMode}
              dynamicCombo={dynamicCombo}
              snapshotCombo={snapshotCombo}
              removeAttack={removeAttack}
              resetCombo={resetCombo}
            />
          )}
        </div>
        {showDamage && (
          <div className="flex-1">
            <Card>
              <h1>Attacks</h1>
              <div className="flex place-items-center">
                <Checkbox
                  label="Wound"
                  value={isWound}
                  onChangeValue={setIsWound}
                />
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
              <MovesTableTwo onClick={addAttack} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
