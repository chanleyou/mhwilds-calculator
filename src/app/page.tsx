"use client";

// import { useState } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AttacksCard,
  BuffsCard,
  Card,
  EquipmentCard,
  ExportDialog,
  ImportDialog,
  ManualDialog,
  Notice,
  // Notice,
  SkillPointCard,
  StatsCard,
  // Tab,
} from "@/components";
import { useBuild, useComputed } from "@/store/builder";

export default function Builder() {
  const { reset, uptime } = useBuild();
  const { buffs } = useComputed();

  const [hasReset, setHasReset] = useState(false);

  useEffect(() => {
    if (!hasReset) {
      reset();
      setHasReset(true);
    }
  }, [reset, hasReset]);

  return (
    <div className="max-w-9xl mx-auto flex flex-col gap-2">
      <Notice closable>
        The manual damage calculator can be found{" "}
        <Link href="/calc" className="font-bold underline">
          here
        </Link>
        {`. Damage numbers are averaged when uptime sliders are in use. TU1
        updates are in. Wet/Bubbleblight uptime for Slicked Blade can be set in the Buffs section.`}
      </Notice>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-3 justify-end gap-2">
          <ManualDialog />
          <ImportDialog />
          <ExportDialog />
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-4 flex-col gap-2">
          {/* <ManualWeaponCard />
          <ManualSkillsCard /> */}
          <EquipmentCard />
          <BuffsCard />
        </div>
        <div className="flex flex-2 flex-col gap-2">
          <StatsCard />
          <SkillPointCard />
          {/* <Card>
            <h1>Debug</h1>
            <textarea
              className="font-mono text-xs"
              value={JSON.stringify({ buffs, uptime }, undefined, 2)}
              rows={30}
              readOnly
            />
          </Card> */}
        </div>
        <div className="flex-3">
          <AttacksCard />
        </div>
      </div>
    </div>
  );
}
