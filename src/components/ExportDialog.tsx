"use client";

import { CopyIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { CombinedBuffs } from "@/data";
import { useBuild } from "@/store/builder";
import text from "@/text";
import { Notice } from "./Notice";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export const ExportDialog = () => {
  const {
    w: weapon,
    artian,
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
    otherBuffs,
    uptime,
  } = useBuild();

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const data = useMemo(
    () =>
      JSON.stringify(
        {
          weapon: {
            name: weapon.name,
            type: weapon.type,
          },
          artian: weapon.artian ? artian : undefined,
          helm: helm?.name,
          body: body?.name,
          arms: arms?.name,
          waist: waist?.name,
          legs: legs?.name,
          charm: charm?.name,
          weaponSlots:
            weaponSlots.length > 0
              ? weaponSlots.map((s) => s?.name)
              : undefined,
          helmSlots:
            helmSlots.length > 0 ? helmSlots.map((s) => s?.name) : undefined,
          bodySlots:
            bodySlots.length > 0 ? bodySlots.map((s) => s?.name) : undefined,
          armsSlots:
            armsSlots.length > 0 ? armsSlots.map((s) => s?.name) : undefined,
          waistSlots:
            waistSlots.length > 0 ? waistSlots.map((s) => s?.name) : undefined,
          legsSlots:
            legsSlots.length > 0 ? legsSlots.map((s) => s?.name) : undefined,
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
        },
        null,
        2,
      ),
    [
      weapon,
      artian,
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
      otherBuffs,
      uptime,
    ],
  );

  const interval = useRef<NodeJS.Timeout>(undefined);

  const copy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    interval.current = setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent-alt group h-9.5">
          <CopyIcon className="size-4" />
          <span className="hidden group-hover:inline-block">Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent title="Export" setOpen={setOpen} className="sm:h-fit">
        <Notice>{text.EXPORT_NOTICE}</Notice>
        <textarea
          className="bg-content-alt rounded p-2 font-mono text-xs"
          value={data}
          rows={20}
          readOnly
        />
        <div className="flex justify-end gap-2">
          {copied && <Notice variant="success">Copied to clipboard.</Notice>}
          <Button onClick={copy}>
            <CopyIcon className="size-4" /> Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
