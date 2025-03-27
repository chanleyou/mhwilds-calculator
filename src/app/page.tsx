"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AttacksCard,
  BuffsCard,
  EquipmentCard,
  ExportDialogTwo,
  ImportDialogTwo,
  Notice,
  SkillPointCard,
  StatsCard,
  Tab,
} from "@/components";

const options = ["Builder", "Manual"] as const;

export default function Builder() {
  const [view, setView] = useState<(typeof options)[number]>(options[0]);
  // const [comboView, setComboView] = useState(false);

  return (
    <div className="max-w-9xl mx-auto flex flex-col gap-2">
      <Notice closable>
        {"The previous manual damage calculator can be found "}
        <Link className="font-bold underline" href="/calc">
          here
        </Link>
        .
      </Notice>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-3 justify-end gap-2">
          <ImportDialogTwo />
          <ExportDialogTwo />
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-4 flex-col gap-2">
          <EquipmentCard />
          <BuffsCard />
        </div>
        <div className="flex flex-2 flex-col gap-2">
          <StatsCard />
          <SkillPointCard />
          {/* <ArtianCard /> */}
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
