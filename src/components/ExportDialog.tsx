"use client";

import { SaveIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { CombinedBuffs } from "@/data";
import { useBuild } from "@/store/builder";
import { useCombo } from "@/store/combo";
import text from "@/text";
import { Notice } from "./Notice";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { SidebarButton } from "./ui/SidebarButton";
import { toast } from "./ui/Toast";

export const ExportDialog = () => {
  const {
    w: weapon,
    artian,
    gogmazios,
    helm,
    body,
    arms,
    waist,
    legs,
    charm,
    weaponSlots,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
    charmSlots,
    charmSkills,
    otherBuffs,
    uptime,
    target,
  } = useBuild();

  const { mode: comboMode, dynamic, snapshot } = useCombo();

  const [open, setOpen] = useState(false);

  const data = useMemo(
    () => {
      // Helper to filter out null/undefined from arrays
      const filterArray = <T,>(arr: (T | null | undefined)[]): T[] | undefined => {
        const filtered = arr.filter((item): item is T => item != null);
        return filtered.length > 0 ? filtered : undefined;
      };

      return JSON.stringify(
        {
          weapon: {
            name: weapon.name,
            type: weapon.type,
          },
          artian: weapon.artian
            ? {
                element: artian.element,
                infusions: filterArray(artian.infusions),
                upgrades: filterArray(artian.upgrades),
              }
            : undefined,
          gogmazios: weapon.gogmazios
            ? {
                focus: gogmazios.focus,
                element: gogmazios.element,
                infusions: filterArray(gogmazios.infusions),
                reinforcements: filterArray(gogmazios.reinforcements),
                groupSkills: filterArray(gogmazios.groupSkills),
              }
            : undefined,
          helm: helm?.name,
          body: body?.name,
          arms: arms?.name,
          waist: waist?.name,
          legs: legs?.name,
          charm: charm?.name,
          weaponSlots: filterArray(weaponSlots.map((s) => s?.name)),
          helmSlots: filterArray(helmSlots.map((s) => s?.name)),
          bodySlots: filterArray(bodySlots.map((s) => s?.name)),
          armsSlots: filterArray(armsSlots.map((s) => s?.name)),
          waistSlots: filterArray(waistSlots.map((s) => s?.name)),
          legsSlots: filterArray(legsSlots.map((s) => s?.name)),
          charmSlots: filterArray(charmSlots.map((s) => s?.name)),
          charmSkills: filterArray(charmSkills),
          buffs: Object.entries(otherBuffs).reduce(
            (a, [k, v]) => {
              const buff = CombinedBuffs[k];
              if (!buff) return a;
              const i = buff.levels.findIndex((l) => l.name === v.name);
              if (i === -1) return a;
              return { ...a, [k]: i + 1 };
            },
            {} as Record<string, number>,
          ),
          uptime,
          target,
          combo:
            dynamic.length > 0 || snapshot.length > 0
              ? {
                  mode: comboMode,
                  attacks:
                    comboMode === "Dynamic"
                      ? dynamic.flatMap((a) =>
                          Array(a.count).fill(a.name),
                        )
                      : snapshot.flatMap((a) =>
                          Array(a.count).fill(a.name),
                        ),
                }
              : undefined,
        },
        null,
        2,
      );
    },
    [
      weapon,
      artian,
      gogmazios,
      helm,
      body,
      arms,
      waist,
      legs,
      charm,
      weaponSlots,
      helmSlots,
      bodySlots,
      armsSlots,
      waistSlots,
      legsSlots,
      charmSlots,
      charmSkills,
      otherBuffs,
      uptime,
      target,
      comboMode,
      dynamic,
      snapshot,
    ],
  );

  const copy = () => {
    navigator.clipboard.writeText(data);
    toast({ title: "Copied to clipboard.", type: "success" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarButton icon={SaveIcon} text="Export" />
      </DialogTrigger>
      <DialogContent title="Export" setOpen={setOpen} className="sm:h-fit">
        <Notice>{text.EXPORT_NOTICE}</Notice>
        <textarea
          className="bg-content-alt p-2 font-mono text-sm"
          value={data}
          rows={20}
          readOnly
        />
        <div className="flex justify-end gap-2">
          <Button onClick={copy}>
            <SaveIcon className="size-4" /> Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
