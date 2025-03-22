"use client";

import { useBuild, useComputed } from "@/builder";
import {
  ArmorPickerDialog,
  BuffsCard,
  Card,
  CharmPickerDialog,
  Checkbox,
  DecorationPickerDialog,
  MovesTable,
  NumberInput,
  SkillPointCard,
  StatsCard,
  WeaponCard,
} from "@/components";

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

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-2 flex-col gap-2">
        <WeaponCard />
        <Card>
          <div className="flex flex-col gap-2">
            <h1>Equipment</h1>
          </div>
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
            <ArmorPickerDialog type="Waist" value={waist} setValue={setWaist} />
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
        {/* <Card>
          <textarea
          className="font-mono text-xs"
          value={JSON.stringify(build, undefined, 2)}
          rows={100}
          readOnly
          />
          </Card> */}
        <SkillPointCard />
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
          <MovesTable />
        </Card>
      </div>
    </div>
  );
}
