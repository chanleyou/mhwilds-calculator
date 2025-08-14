import { CircleCheckIcon, SettingsIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useBuild } from "@/store/builder";
import {
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

  const combined = useMemo(
    () => [...artian.infusions, ...artian.upgrades],
    [artian],
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
      ["Sleep", "Poison", "Paralysis"].some((t) => t === artian.element)
    )
      return true;

    if (![...ElementTypes, ...StatusTypes].some((t) => t === artian.element)) {
      return true;
    }
    if (combined.filter((o) => o === "Element").length >= 4) return true;
    return false;
  }, [weapon.type, artian.element, combined]);

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
            value={artian.element}
            placeholder="Type"
            labelFn={(v) => v ?? ""}
            options={[...ArtianTypeOptions]}
            onChangeValue={(v) => setArtianType(v)}
          />
          <div className="flex flex-col gap-2">
            <label className="text-xs">Infusion</label>
            {[0, 1, 2].map((i) => (
              <Select
                key={i}
                value={artian.infusions[i]}
                placeholder={`Infusion ${i + 1}`}
                options={[undefined, ...ArtianInfusionOptions]}
                disabledOptions={disabledArtianInfusionOptions}
                labelFn={(v) => v ?? ""}
                onChangeValue={(v) => setArtianInfusion(i, v)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs">Reinforcement</label>
            {[0, 1, 2, 3, 4].map((i) => (
              <Select
                key={i}
                value={artian.upgrades[i]}
                placeholder={`Reinforcement ${i + 1}`}
                options={[undefined, ...ArtianUpgradeOptions]}
                disabledOptions={disabledArtianUpgradeOptions}
                labelFn={(v) => v ?? ""}
                onChangeValue={(v) => setArtianUpgrade(i, v)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
            <CircleCheckIcon className="size-4" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
