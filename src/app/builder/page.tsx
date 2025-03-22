"use client";

import { useBuild, useBuilder } from "@/builder";
import { ArmorPickerDialog, Card, DecorationPickerDialog } from "@/components";

export default function Builder() {
  const {
    helm,
    body,
    arms,
    waist,
    legs,
    helmSlots,
    setHelm,
    setBody,
    setArms,
    setWaist,
    setLegs,
    setHelmDecoration,
  } = useBuilder();
  const skills = useBuild();

  return (
    <div className="flex flex-row gap-2">
      <Card className="flex-1">
        <div className="flex flex-col gap-2">
          <h1>Armor</h1>
          <ArmorPickerDialog type="Helm" value={helm} setValue={setHelm} />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[0, 1, 2].map((i) => {
              return (
                <DecorationPickerDialog
                  key={i}
                  value={helmSlots[i]}
                  level={helm?.slots[i]}
                  setValue={(v) => setHelmDecoration(v, i)}
                />
              );
            })}
          </div>
        </div>
        <ArmorPickerDialog type="Body" value={body} setValue={setBody} />
        <ArmorPickerDialog type="Arms" value={arms} setValue={setArms} />
        <ArmorPickerDialog type="Waist" value={waist} setValue={setWaist} />
        <ArmorPickerDialog type="Legs" value={legs} setValue={setLegs} />
      </Card>
      <Card className="flex-1">
        <textarea
          className="font-mono text-xs"
          value={JSON.stringify(skills, undefined, 2)}
          rows={100}
          readOnly
        />
      </Card>
    </div>
  );
}
