"use client";

import Link from "next/link";
import {
  AttacksCard,
  BuffsCard,
  Card,
  EquipmentCard,
  ExportDialogTwo,
  ImportDialogTwo,
  Notice,
  SkillPointCard,
  StatsCard,
} from "@/components";
import { useComputed } from "@/store/builder";
import { cn } from "@/utils";

export default function Builder() {
  const build = useComputed();

  // const [comboView, setComboView] = useState(false);

  return (
    <div className={cn("font-funnel max-w-10xl mx-auto flex flex-col gap-2")}>
      <Notice closable>
        {"The previous manual damage calculator can be found "}
        <Link className="font-bold underline" href="/calc">
          here
        </Link>
        .
      </Notice>
      <div className="flex justify-end gap-2">
        <ImportDialogTwo />
        <ExportDialogTwo />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-3 flex-col gap-2">
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
        <div className="flex flex-2 flex-col gap-2">
          <AttacksCard />
          {/* <ComboDialog /> */}
        </div>
      </div>
    </div>
  );
}
