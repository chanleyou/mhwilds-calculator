"use client";

// import { useState } from "react";
import { CalculatorIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AttacksCard,
  BuffsCard,
  Button,
  Card,
  EquipmentCard,
  ExportDialog,
  ImportDialog,
  OverridesDialog,
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
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-3 justify-end gap-2">
          <OverridesDialog />
          <ImportDialog />
          <ExportDialog />
          <Button className="bg-accent-alt group" asChild>
            <Link href="/">
              <CalculatorIcon className="size-4" />
              <span className="hidden group-hover:inline-block">
                Calculator
              </span>
            </Link>
          </Button>
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
