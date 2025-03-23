"use client";

import { produce } from "immer";
import { useState } from "react";
import { useBuild, useComputed } from "@/builder";
import {
  ArmorPickerDialog,
  BuffsCard,
  Card,
  CharmPickerDialog,
  Checkbox,
  ComboCard,
  DecorationPickerDialog,
  MovesTableTwo,
  NumberInput,
  SkillPointCard,
  StatsCard,
  WeaponCard,
} from "@/components";
import { Attack, ComboModeOption, SnapshotAttack } from "@/types";

export default function Builder() {
  const {
    isWound,
    rawHzv,
    eleHzv,
    helm,
    body,
    arms,
    waist,
    legs,
    charm,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
    setRawHzv,
    setEleHzv,
    setIsWound,
    setHelm,
    setBody,
    setArms,
    setWaist,
    setLegs,
    setCharm,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
  } = useBuild();
  const build = useComputed();
  const { calcHit, calcCrit, calcAverage } = build;

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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="flex flex-2 flex-col gap-2">
          <WeaponCard />
          <Card>
            <div className="flex flex-col gap-2">
              <ArmorPickerDialog type="Helm" value={helm} setValue={setHelm} />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => {
                  // if (!helm?.slots[i]) return;
                  return (
                    <DecorationPickerDialog
                      key={i}
                      value={helmSlots[i]}
                      level={helm?.slots[i] ?? 0}
                      setValue={(v) => setHelmDecoration(i, v)}
                    />
                  );
                })}
              </div>
              <ArmorPickerDialog type="Body" value={body} setValue={setBody} />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => {
                  // if (!body?.slots[i]) return;
                  return (
                    <DecorationPickerDialog
                      key={i}
                      value={bodySlots[i]}
                      level={body?.slots[i] ?? 0}
                      setValue={(v) => setBodyDecoration(i, v)}
                    />
                  );
                })}
              </div>
              <ArmorPickerDialog type="Arms" value={arms} setValue={setArms} />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => {
                  return (
                    <DecorationPickerDialog
                      key={i}
                      value={armsSlots[i]}
                      level={arms?.slots[i] ?? 0}
                      setValue={(v) => setArmsDecoration(i, v)}
                    />
                  );
                })}
              </div>
              <ArmorPickerDialog
                type="Waist"
                value={waist}
                setValue={setWaist}
              />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => {
                  return (
                    <DecorationPickerDialog
                      key={i}
                      value={waistSlots[i]}
                      level={waist?.slots[i] ?? 0}
                      setValue={(v) => setWaistDecoration(i, v)}
                    />
                  );
                })}
              </div>
              <ArmorPickerDialog type="Legs" value={legs} setValue={setLegs} />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => {
                  return (
                    <DecorationPickerDialog
                      key={i}
                      value={legsSlots[i]}
                      level={legs?.slots[i] ?? 0}
                      setValue={(v) => setLegsDecoration(i, v)}
                    />
                  );
                })}
              </div>
              <CharmPickerDialog value={charm} setValue={setCharm} />
            </div>
          </Card>
          <BuffsCard />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <StatsCard />
          <SkillPointCard />
          <Card>
            <textarea
              className="font-mono text-xs"
              value={JSON.stringify(build, undefined, 2)}
              rows={100}
              readOnly
            />
          </Card>
          <ComboCard
            comboMode={comboMode}
            setComboMode={setComboMode}
            dynamicCombo={dynamicCombo}
            snapshotCombo={snapshotCombo}
            removeAttack={removeAttack}
            resetCombo={resetCombo}
          />
        </div>
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
      </div>
    </div>
  );
}
