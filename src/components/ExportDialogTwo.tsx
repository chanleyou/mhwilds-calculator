"use client";

import { CopyIcon, XIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useBuild } from "@/builder";
import text from "@/text";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Notice } from "./Notice";

export const ExportDialogTwo = () => {
  const {
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
  } = useBuild();

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const data = useMemo(
    () =>
      JSON.stringify(
        {
          weapon: {
            type: weapon.type,
            name: weapon.name,
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
        <Button size="sm">
          <CopyIcon className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="max-h-dvh w-[100vw] sm:w-4xl sm:max-w-[95vw]">
          <DialogTitle asChild>
            <div className="flex items-start justify-between gap-2">
              <h1>Export</h1>
              <Button variant="text" size="icon" onClick={() => setOpen(false)}>
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          </DialogTitle>
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
              <CopyIcon className="h-4 w-4" /> Copy
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
