"use client";

// import { useState } from "react";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import {
  AttacksCard,
  BuffsCard,
  Button,
  ManualSkillsCard,
  ManualWeaponCard,
  Notice,
  // Notice,
  SkillPointCard,
  StatsCard,
  // Tab,
} from "@/components";

export default function Calculator() {
  return (
    <div className="max-w-9xl mx-auto flex flex-col gap-2">
      <Notice closable>
        {`Damage numbers are averaged when uptime sliders are in use. TU1
        updates are in. Wet/Bubbleblight uptime for Slicked Blade can be set in the Buffs section.`}
      </Notice>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-1 justify-end gap-2">
          <Button variant="secondary" className="text-accent-alt" asChild>
            <Link href="/">
              <LinkIcon className="size-4" />
              Build Planner
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-4 flex-col gap-2">
          <ManualWeaponCard />
          <ManualSkillsCard />
          <BuffsCard />
        </div>
        <div className="flex flex-2 flex-col gap-2">
          <StatsCard />
          <SkillPointCard />
          {/* <Card>
            <h1>Debug</h1>
            <h1>Total Weight: {totalWeight}</h1>
            <textarea
              className="font-mono text-xs"
              value={JSON.stringify(weights, undefined, 2)}
              rows={60}
              readOnly
            />
            <textarea
              className="font-mono text-xs"
              value={JSON.stringify(head, undefined, 2)}
              rows={60}
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
