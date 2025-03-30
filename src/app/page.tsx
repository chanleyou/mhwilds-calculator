"use client";

// import { useState } from "react";
import {
  AttacksCard,
  BuffsCard,
  EquipmentCard,
  ExportDialogTwo,
  ImportDialogTwo,
  ManualDialog,
  // Notice,
  SkillPointCard,
  StatsCard,
  // Tab,
} from "@/components";

export default function Builder() {
  // const options = ["Builder", "Manual"] as const;
  // const [view, setView] = useState<(typeof options)[number]>(options[0]);
  // const [comboView, setComboView] = useState(false);

  return (
    <div className="max-w-9xl mx-auto flex flex-col gap-2">
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-3 justify-end gap-2">
          <ManualDialog />
          <ImportDialogTwo />
          <ExportDialogTwo />
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
              value={JSON.stringify(build, undefined, 2)}
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
