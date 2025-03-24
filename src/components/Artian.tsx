import { CheckCircleIcon, SettingsIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useBuild } from "@/builder";
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
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { NumberDisplay } from "./NumberDisplay";
import { Select } from "./Select";

export const ArtianDialog = () => {
  const { weapon, artian, setArtianType, setArtianInfusion, setArtianUpgrade } =
    useBuild();
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
      ["Sleep", "Poison", "Paralysis"].some((t) => t === artian.type)
    )
      return true;

    if (![...ElementTypes, ...StatusTypes].some((t) => t === artian.type)) {
      return true;
    }
    if (combined.filter((o) => o === "Element").length >= 4) return true;
    return false;
  }, [weapon.type, artian.type, combined]);

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
        <Button size="sm" variant="primary" className="bg-teal-500">
          <SettingsIcon className="h-4 w-4" />
          Artian
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-dvh w-[100vw] sm:h-auto sm:w-xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between overflow-auto p-2">
            <DialogTitle asChild>
              <h1>Artian Weapon</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Select
              label="Type"
              value={artian.type}
              placeholder="Type"
              labelFn={(v) => v ?? ""}
              options={[...ArtianTypeOptions]}
              onChangeValue={(v) => setArtianType(v)}
            />
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
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
              <CheckCircleIcon className="h-4 w-4" />
              Done
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export const ArtianCard = () => {
  const { weapon, artian } = useBuild();

  if (!weapon.artian) return;
  return (
    <Card>
      <h1>Artian</h1>
      <div>
        <NumberDisplay label="Type">{artian.type}</NumberDisplay>
        <NumberDisplay label="Infusion" className="text-right">
          {ArtianInfusionOptions.map((o) => {
            const length = artian.infusions.filter((i) => i === o).length;
            if (length === 0) return;
            return (
              <p key={o}>
                {length}x {o}
              </p>
            );
          })}
        </NumberDisplay>
        <NumberDisplay label="Reinforcement" className="text-right">
          {ArtianUpgradeOptions.map((o) => {
            const length = artian.upgrades.filter((i) => i === o).length;
            if (length === 0) return;
            return (
              <p key={o}>
                {length}x {o}
              </p>
            );
          })}
        </NumberDisplay>
      </div>
    </Card>
  );
};
