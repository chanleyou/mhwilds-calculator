"use client";

import { produce } from "immer";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBuild, useComputed } from "@/builder";
import {
  ArtianCard,
  BuffsCard,
  Button,
  Card,
  Checkbox,
  ComboCard,
  EquipmentCard,
  ExportDialogTwo,
  ImportDialogTwo,
  MovesTableTwo,
  Notice,
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

  const [showCombo, setShowCombo] = useState(true);
  const [showAttacks, setShowAttacks] = useState(true);
  const [showNotice, setShowNotice] = useState(true);

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
        "font-funnel mx-auto flex max-w-6xl flex-col gap-2",
        showAttacks && "max-w-10xl",
      )}
    >
      {showNotice && (
        <Notice>
          <div className="flex justify-between gap-2">
            <p>
              {
                "Set builder is new and might have bugs. The old manual damage calculator can be found "
              }
              <Link className="font-bold underline" href="/calc">
                here
              </Link>
              .
            </p>
            <Button
              variant="text"
              size="icon"
              onClick={() => setShowNotice(false)}
            >
              <XIcon className="text-info h-4 w-4" />
            </Button>
          </div>
        </Notice>
      )}
      <div className="flex justify-end gap-2">
        <ImportDialogTwo />
        <ExportDialogTwo />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-2 flex-col gap-2">
          <EquipmentCard />
          <BuffsCard />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <StatsCard />
          <SkillPointCard />
          <ArtianCard />
          <div className="hidden justify-end gap-2 lg:flex">
            <Button
              variant="secondary"
              size="sm"
              className="text-tertiary"
              onClick={() => setShowCombo(!showCombo)}
            >
              {showCombo ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeOffIcon className="h-4 w-4" />
              )}
              Combo
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-tertiary"
              onClick={() => setShowAttacks(!showAttacks)}
            >
              {showAttacks ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeOffIcon className="h-4 w-4" />
              )}
              Attacks
            </Button>
          </div>
          {showCombo && (
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
        {showAttacks && (
          <div className="flex-1">
            {/* <Card>
              <textarea
                className="font-mono text-xs"
                value={JSON.stringify(build, undefined, 2)}
                rows={100}
                readOnly
              />
            </Card> */}
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
