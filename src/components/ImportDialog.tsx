"use client";

import { DownloadIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ZodError } from "zod";
import { CombinedBuffs } from "@/data";
import { useModel } from "@/store/store";
import text from "@/text";
import { importSchema } from "@/zod";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Notice } from "./Notice";

export const ImportDialog = () => {
  const {
    emptyBuffs,
    setWeapon,
    setAttack,
    setAffinity,
    setElement,
    setSharpness,
    setBuff,
    setRawHzv,
    setEleHzv,
    setIsWound,
  } = useModel();

  const [open, setOpen] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [success, setSuccess] = useState(false);

  const variant = useMemo(() => {
    if (success && warnings.length > 0) return "warning";
    if (success && warnings.length === 0) return "success";
    if (error) return "error";
    return undefined;
  }, [success, warnings, error]);

  const message = useMemo(() => {
    if (error) return error;
    if (success && warnings.length > 0)
      return ["Build imported with the following issues:", ...warnings].join(
        "\n",
      );
    if (success && warnings.length === 0) return "Build imported.";
    return undefined;
  }, [success, warnings, error]);

  const process = useCallback(() => {
    setError("");
    setSuccess(false);
    setWarnings([]);

    try {
      const result = importSchema.safeParse(JSON.parse(data));
      if (!result.success) throw result.error;

      emptyBuffs();

      Object.entries(result.data.buffs).forEach(([key, value]) => {
        const buff = CombinedBuffs[key]?.levels[value - 1];
        if (buff) setBuff(key, buff);
        else setWarnings((w) => [...w, `${key} ${value} not found.`]);
      });

      setAttack(result.data.attack);
      setAffinity(result.data.affinity ?? 0);
      setElement(result.data.element ?? 0);
      setSharpness(result.data.sharpness ?? "Ranged");
      setWeapon(result.data.weapon);
      setRawHzv(result.data.rawHzv ?? 0);
      setEleHzv(result.data.eleHzv ?? 0);
      setIsWound(result.data.isWound ?? false);

      setSuccess(true);
    } catch (e: unknown) {
      if (e instanceof SyntaxError) setError("Invalid JSON.");
      else if (e instanceof ZodError) {
        setError(
          Object.entries(e.flatten().fieldErrors)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", "),
        );
      } else setError("Invalid data.");
    }
  }, [
    data,
    setBuff,
    setAttack,
    setAffinity,
    setElement,
    setSharpness,
    setWeapon,
    setRawHzv,
    setEleHzv,
    setIsWound,
    emptyBuffs,
  ]);

  useEffect(() => {
    if (!open) setSuccess(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <DownloadIcon className="size-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <DialogTitle asChild>
            <div className="flex items-start justify-between gap-2">
              <h1>Import</h1>
              <Button variant="text" size="icon" onClick={() => setOpen(false)}>
                <XIcon className="size-4" />
              </Button>
            </div>
          </DialogTitle>
          <Notice>{text.EXPORT_NOTICE}</Notice>
          <textarea
            className="bg-content-alt rounded p-2 font-mono text-xs"
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={20}
            placeholder="Paste your build here..."
          />
          <div className="flex justify-end gap-2">
            {message && <Notice variant={variant}>{message}</Notice>}
            <Button onClick={process}>
              <DownloadIcon className="size-4" /> Import
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
