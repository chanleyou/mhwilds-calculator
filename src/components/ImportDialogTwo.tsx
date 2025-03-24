"use client";

import { DownloadIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ZodError } from "zod";
import { useBuild } from "@/builder";
import { Armors } from "@/data/armor";
import { Charms } from "@/data/charms";
import { Decorations } from "@/data/decorations";
import Weapons from "@/data/weapons";
import text from "@/text";
import { Armor, Decoration, Weapon } from "@/types";
import { importSchemaTwo } from "@/zod";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Notice } from "./Notice";

export const ImportDialogTwo = () => {
  const {
    setW,
    setHelm,
    setBody,
    setArms,
    setWaist,
    setLegs,
    setCharm,
    reset,
    setArtianType,
    setArtianInfusion,
    setArtianUpgrade,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
    setWeaponDecoration,
  } = useBuild();

  const [open, setOpen] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [success, setSuccess] = useState(false);

  const addWarning = (warning: string) => setWarnings((w) => [...w, warning]);

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
      const result = importSchemaTwo.safeParse(JSON.parse(data));
      if (!result.success) throw result.error;

      reset();

      const { data: d } = result;

      const setDecoration = (
        name: string | undefined,
        i: number,
        eq: Weapon | Armor,
        setFn: (i: number, dc?: Decoration) => void,
        type: "Weapon" | "Equipment" = "Equipment",
      ) => {
        if (!name) return;
        const dc = Decorations.find((d) => d.name === name && d.type === type);
        if (!dc) {
          addWarning(`${name} not found.`);
        } else if (dc && eq.slots[i] < dc.level) {
          addWarning(`${name} does not fit in ${eq.name} slot ${i + 1}.`);
        }
        if (dc) setFn(i, dc);
      };

      const setDecorations = (
        names: (string | undefined)[],
        eq: Weapon | Armor,
        setFn: (i: number, dc?: Decoration) => void,
        type: "Weapon" | "Equipment" = "Equipment",
      ) => {
        names.forEach((n, i) => setDecoration(n, i, eq, setFn, type));
      };

      if (d.helm) {
        const helm = Armors.find((a) => a.name === d.helm && a.type === "Helm");
        if (!helm) {
          addWarning(`${d.helm} not found.`);
        } else {
          setHelm(helm);
          if (d.helmSlots) {
            setDecorations(d.helmSlots, helm, setHelmDecoration);
          }
        }
      }

      if (d.body) {
        const body = Armors.find((a) => a.name === d.body && a.type === "Body");
        if (!body) {
          addWarning(`${d.body} not found.`);
        } else {
          setBody(body);
          if (d.bodySlots) {
            setDecorations(d.bodySlots, body, setBodyDecoration);
          }
        }
      }

      if (d.arms) {
        const arms = Armors.find((a) => a.name === d.arms && a.type === "Arms");
        if (!arms) {
          addWarning(`${d.arms} not found.`);
        } else {
          setArms(arms);
          if (d.armsSlots) {
            setDecorations(d.armsSlots, arms, setArmsDecoration);
          }
        }
      }

      if (d.waist) {
        const waist = Armors.find(
          (a) => a.name === d.waist && a.type === "Waist",
        );
        if (!waist) {
          addWarning(`${d.waist} not found.`);
        } else {
          setWaist(waist);
          if (d.waistSlots) {
            setDecorations(d.waistSlots, waist, setWaistDecoration);
          }
        }
      }

      if (d.legs) {
        const legs = Armors.find((a) => a.name === d.legs && a.type === "Legs");
        if (!legs) {
          addWarning(`${d.legs} not found.`);
        } else {
          setLegs(legs);
          if (d.legsSlots) {
            setDecorations(d.legsSlots, legs, setLegsDecoration);
          }
        }
      }

      if (d.charm) {
        const charm = Charms.find((c) => c.name === d.charm);
        if (charm) setCharm(charm);
        else addWarning(`${d.charm} not found.`);
      }

      const w = Object.values(Weapons)
        .flat()
        .find((w) => w.name === d.weapon.name && w.type === d.weapon.type);

      if (!w) {
        addWarning(`${d.weapon.name} not found.`);
      } else {
        setW(w);

        if (w.artian && d.artian) {
          setArtianType(d.artian.type);
          d.artian.infusions.forEach((u, i) => setArtianInfusion(i, u));
          d.artian.upgrades.forEach((u, i) => setArtianUpgrade(i, u));
        }

        if (d.weaponSlots) {
          setDecorations(d.weaponSlots, w, setWeaponDecoration, "Weapon");
        }
      }

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
    setW,
    setHelm,
    setBody,
    setArms,
    setWaist,
    setLegs,
    setCharm,
    reset,
    setWeaponDecoration,
    setArtianType,
    setArtianInfusion,
    setArtianUpgrade,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
  ]);

  useEffect(() => {
    if (!open) setSuccess(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <DownloadIcon className="h-4 w-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <DialogTitle asChild>
            <div className="flex items-start justify-between gap-2">
              <h1>Import</h1>
              <Button variant="text" size="icon" onClick={() => setOpen(false)}>
                <XIcon className="h-4 w-4" />
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
              <DownloadIcon className="h-4 w-4" /> Import
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
