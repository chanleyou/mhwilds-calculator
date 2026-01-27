import { CircleCheckIcon, SettingsIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/store/builder";
import {
  Artian,
  ArtianInfusion,
  ArtianInfusionOptions,
  ArtianTypeOptions,
  ArtianUpgrade,
  ArtianUpgradeOptions,
  ElementTypes,
  StatusTypes,
  isBowgun,
  isRanged,
} from "@/types";
import { Select } from "./Select";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export const ArtianDialog = () => {
  const {
    w: weapon,
    artian,
    setArtianType,
    setArtianInfusion,
    setArtianUpgrade,
  } = useBuild();
  const [open, setOpen] = useState(false);

  // Local state for editing
  const [localArtian, setLocalArtian] = useState<Artian>(artian);

  // Initialize local state when dialog opens
  useEffect(() => {
    if (open) {
      setLocalArtian(artian);
    }
  }, [open, artian]);

  const combined = useMemo(
    () => [...localArtian.infusions, ...localArtian.upgrades],
    [localArtian],
  );

  const noAmmo = useMemo(() => {
    if (!isBowgun(weapon.type)) return true;
    if (combined.filter((o) => o === "Ammo").length >= 2) return true;
    return false;
  }, [weapon.type, combined]);

  const noSharpness = useMemo(() => {
    if (isRanged(weapon.type)) return true;
    if (combined.filter((o) => o === "Sharpness").length >= 2) return true;
    return false;
  }, [weapon.type, combined]);

  const noAffinity = useMemo(() => {
    if (combined.filter((o) => o === "Affinity").length >= 6) return true;
    return false;
  }, [combined]);

  const noElement = useMemo(() => {
    if (isBowgun(weapon.type)) return true;
    if (
      weapon.type === "Bow" &&
      ["Sleep", "Poison", "Paralysis"].some((t) => t === localArtian.element)
    )
      return true;

    if (![...ElementTypes, ...StatusTypes].some((t) => t === localArtian.element)) {
      return true;
    }
    if (combined.filter((o) => o === "Element").length >= 4) return true;
    return false;
  }, [weapon.type, localArtian.element, combined]);

  const disabledArtianInfusionOptions = useMemo(() => {
    const disabled: ArtianInfusion[] = [];
    if (noAffinity) disabled.push("Affinity");
    return disabled;
  }, [noAffinity]);

  const disabledArtianUpgradeOptions = useMemo(() => {
    const disabled: ArtianUpgrade[] = [];
    if (noAmmo) disabled.push("Ammo");
    if (noSharpness) disabled.push("Sharpness");
    if (noAffinity) disabled.push("Affinity");
    if (noElement) disabled.push("Element");
    return disabled;
  }, [noAmmo, noSharpness, noAffinity, noElement]);

  const handleSave = () => {
    setArtianType(localArtian.element);
    localArtian.infusions.forEach((u, i) => setArtianInfusion(i, u));
    localArtian.upgrades.forEach((u, i) => setArtianUpgrade(i, u));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="primary" className="bg-accent-alt">
          <SettingsIcon className="size-4" />
          Artian
        </Button>
      </DialogTrigger>
      <DialogContent
        title="Artian Weapon"
        setOpen={setOpen}
        className="sm:h-fit sm:w-xl"
      >
        <div className="flex flex-col gap-4">
          <Select
            label="Element"
            value={localArtian.element}
            placeholder="Type"
            labelFn={(v) => v ?? ""}
            options={[...ArtianTypeOptions]}
            onChangeValue={(v) => setLocalArtian({ ...localArtian, element: v })}
          />
          <div className="flex flex-col gap-2">
            <label className="text-xs">Infusion</label>
            {[0, 1, 2].map((i) => (
              <Select
                key={i}
                value={localArtian.infusions[i]}
                placeholder={`Infusion ${i + 1}`}
                options={[undefined, ...ArtianInfusionOptions]}
                disabledOptions={disabledArtianInfusionOptions}
                labelFn={(v) => v ?? ""}
                onChangeValue={(v) => {
                  const newInfusions = [...localArtian.infusions] as [ArtianInfusion?, ArtianInfusion?, ArtianInfusion?];
                  newInfusions[i] = v;
                  setLocalArtian({ ...localArtian, infusions: newInfusions });
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs">Reinforcement</label>
            {[0, 1, 2, 3, 4].map((i) => (
              <Select
                key={i}
                value={localArtian.upgrades[i]}
                placeholder={`Reinforcement ${i + 1}`}
                options={[undefined, ...ArtianUpgradeOptions]}
                disabledOptions={disabledArtianUpgradeOptions}
                labelFn={(v) => v ?? ""}
                onChangeValue={(v) => {
                  const newUpgrades = [...localArtian.upgrades] as [ArtianUpgrade?, ArtianUpgrade?, ArtianUpgrade?, ArtianUpgrade?, ArtianUpgrade?];
                  newUpgrades[i] = v;
                  setLocalArtian({ ...localArtian, upgrades: newUpgrades });
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={handleSave}>
            <CircleCheckIcon className="size-4" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
