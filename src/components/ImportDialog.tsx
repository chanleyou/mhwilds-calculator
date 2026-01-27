"use client";

import { DownloadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { ZodError } from "zod";
import { CombinedBuffs } from "@/data";
import { Armors } from "@/data/armor";
import Attacks, { OtherAttacks } from "@/data/attacks";
import { Charms } from "@/data/charms";
import { Decorations } from "@/data/decorations";
import Weapons from "@/data/weapons";
import { useBuild, useComputed } from "@/store/builder";
import { useCombo } from "@/store/combo";
import text from "@/text";
import { Armor, Decoration, Weapon } from "@/types";
import { importSchema } from "@/zod";
import { Notice } from "./Notice";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { SidebarButton } from "./ui/SidebarButton";
import { toast } from "./ui/Toast";

export const ImportDialog = () => {
  const {
    setW: setW,
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
    setGogmaziosFocus,
    setGogmaziosType,
    setGogmaziosInfusion,
    setGogmaziosReinforcement,
    setGogmaziosGroupSkill,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
    setWeaponDecoration,
    setCharmDecoration,
    setCharmSkill,
    setOtherBuff,
    emptyBuffs,
    setUptimes,
    setTarget,
  } = useBuild();

  const comboStore = useCombo();
  const { calculateAtk } = useComputed();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const process = useCallback(() => {
    const warnings: string[] = [];

    try {
      const result = importSchema.safeParse(JSON.parse(data));
      if (!result.success) throw result.error;

      reset();

      const { data: d } = result;

      const setDecoration = (
        name: string | null | undefined,
        i: number,
        eq: Weapon | Armor,
        setFn: (i: number) => (dc?: Decoration) => void,
        type: "Weapon" | "Equipment" = "Equipment",
      ) => {
        if (!name) return;
        const dc = Decorations.find((d) => d.name === name && d.type === type);
        if (!dc) {
          warnings.push(`'${name}' not found.`);
        } else if (dc && eq.slots[i] < dc.level) {
          warnings.push(
            `'${name}' does not fit in '${eq.name}' slot ${i + 1}.`,
          );
        }
        if (dc) setFn(i)(dc);
      };

      const setDecorations = (
        names: (string | null | undefined)[],
        eq: Weapon | Armor,
        setFn: (i: number) => (dc?: Decoration) => void,
        type: "Weapon" | "Equipment" = "Equipment",
      ) => {
        names.forEach((n, i) => setDecoration(n, i, eq, setFn, type));
      };

      if (d.helm) {
        const helm = Armors.find((a) => a.name === d.helm && a.type === "Helm");
        if (!helm) {
          warnings.push(`'${d.helm}' not found.`);
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
          warnings.push(`'${d.body}' not found.`);
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
          warnings.push(`'${d.arms}' not found.`);
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
          warnings.push(`'${d.waist}' not found.`);
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
          warnings.push(`'${d.legs}' not found.`);
        } else {
          setLegs(legs);
          if (d.legsSlots) {
            setDecorations(d.legsSlots, legs, setLegsDecoration);
          }
        }
      }

      if (d.charm) {
        const charm = Charms.find((c) => c.name === d.charm);
        if (charm) {
          setCharm(charm);
        } else {
          warnings.push(`'${d.charm}' not found.`);
        }
      }

      if (d.charmSlots) {
        d.charmSlots.forEach((name, i) => {
          if (!name) return;
          const dc = Decorations.find((d) => d.name === name && d.type === "Equipment");
          if (!dc) {
            warnings.push(`'${name}' not found.`);
          }
          if (dc) setCharmDecoration(i)(dc);
        });
      }

      if (d.charmSkills) {
        d.charmSkills.forEach((skill, i) => {
          setCharmSkill(i)(skill);
        });
      }

      const w = Object.values(Weapons)
        .flat()
        .find((w) => w.name === d.weapon.name && w.type === d.weapon.type);

      if (!w) {
        warnings.push(`'${d.weapon.name}' not found.`);
      } else {
        setW(w);

        if (w.artian && d.artian) {
          setArtianType(d.artian.element);
          d.artian.infusions?.forEach((u, i) => setArtianInfusion(i, u));
          d.artian.upgrades?.forEach((u, i) => setArtianUpgrade(i, u));
        }

        if (w.gogmazios && d.gogmazios) {
          setGogmaziosFocus(d.gogmazios.focus);
          setGogmaziosType(d.gogmazios.element);
          d.gogmazios.infusions?.forEach((u, i) => setGogmaziosInfusion(i, u));
          d.gogmazios.reinforcements?.forEach((r, i) => setGogmaziosReinforcement(i, r));
          d.gogmazios.groupSkills?.forEach((s, i) => setGogmaziosGroupSkill(i, s));
        }

        if (d.weaponSlots) {
          setDecorations(d.weaponSlots, w, setWeaponDecoration, "Weapon");
        }

        emptyBuffs();

        Object.entries(d.buffs).forEach(([key, value]) => {
          const buff = CombinedBuffs[key]?.levels[value - 1];
          if (buff) setOtherBuff(key, buff);
          else warnings.push(`Buff '${key} ${value}' not found.`);
        });
      }

      if (d.uptime) setUptimes(d.uptime);

      if (d.target) setTarget(d.target);

      // Import combo attacks
      if (w && d.combo && d.combo.attacks && d.combo.attacks.length > 0) {
        comboStore.reset();
        comboStore.setComboMode(d.combo.mode);

        const weaponAttacks = Attacks[w.type];
        const allAttacks = [...weaponAttacks, ...Object.values(OtherAttacks)];

        d.combo.attacks.forEach((attackName) => {
          const attack = allAttacks.find((a) => a.name === attackName);
          if (attack) {
            // Use comboStore methods directly with the imported mode
            if (d.combo!.mode === "Dynamic") {
              comboStore.addDynamic(attack);
            } else {
              const { hit, crit, avg } = calculateAtk(attack);
              comboStore.addSnapshot({ ...attack, hit, crit, avg });
            }
          } else {
            warnings.push(`Attack '${attackName}' not found for ${w.type}.`);
          }
        });
      }

      if (warnings.length === 0) {
        toast({ title: "Build imported.", type: "success" });
      } else {
        toast({
          type: "warning",
          title: "Build imported with issues:",
          description: (
            <ul className="text-tertiary list-disc pl-4 text-sm">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ),
        });
      }
    } catch (e: unknown) {
      let error = "";

      if (e instanceof SyntaxError) error = "Invalid JSON.";
      else if (e instanceof ZodError) {
        error = Object.entries(e.flatten().fieldErrors)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" ");
      } else error = "Invalid data.";

      toast({ title: error, type: "error" });
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
    setGogmaziosFocus,
    setGogmaziosType,
    setGogmaziosInfusion,
    setGogmaziosReinforcement,
    setGogmaziosGroupSkill,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
    setCharmDecoration,
    setCharmSkill,
    emptyBuffs,
    setOtherBuff,
    setUptimes,
    setTarget,
    comboStore,
    calculateAtk,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarButton icon={DownloadIcon} text="Import" />
      </DialogTrigger>
      <DialogContent title="Import" className="sm:h-fit" setOpen={setOpen}>
        <Notice>{text.EXPORT_NOTICE}</Notice>
        <textarea
          className="bg-content-alt p-2 font-mono text-sm"
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={20}
          placeholder="Paste your build here..."
        />
        <div className="flex justify-end gap-2">
          <Button onClick={process}>
            <DownloadIcon className="size-4" /> Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
