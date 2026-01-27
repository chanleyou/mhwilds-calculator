import { CircleCheckIcon, SettingsIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/store/builder";
import {
  ArtianInfusion,
  ArtianInfusionOptions,
  ArtianTypeOptions,
  ArtianUpgrade,
  ArtianUpgradeOptions,
  ElementTypes,
  Gogmazios,
  GogmaziosFocusOptions,
  GogmaziosReinforcementLevel,
  SkillName,
  StatusTypes,
  isBowgun,
  isRanged,
} from "@/types";
import { GroupSkillsCombined, SeriesSkillsCombined } from "@/data/skills";
import { Select } from "./Select";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export const GogmaziosDialog = () => {
  const {
    w: weapon,
    gogmazios,
    setGogmaziosFocus,
    setGogmaziosType,
    setGogmaziosInfusion,
    setGogmaziosReinforcement,
    setGogmaziosGroupSkill,
  } = useBuild();
  const [open, setOpen] = useState(false);

  // Local state for editing
  const [localGogmazios, setLocalGogmazios] = useState<Gogmazios>(gogmazios);

  // Initialize local state when dialog opens
  useEffect(() => {
    if (open) {
      setLocalGogmazios(gogmazios);
    }
  }, [open, gogmazios]);

  const combined = useMemo(
    () => [
      ...localGogmazios.infusions,
      ...localGogmazios.reinforcements.map((r) => r?.type),
    ],
    [localGogmazios],
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
      ["Sleep", "Poison", "Paralysis"].some((t) => t === localGogmazios.element)
    )
      return true;

    if (
      ![...ElementTypes, ...StatusTypes].some((t) => t === localGogmazios.element)
    ) {
      return true;
    }
    if (combined.filter((o) => o === "Element").length >= 4) return true;
    return false;
  }, [weapon.type, localGogmazios.element, combined]);

  const disabledInfusionOptions = useMemo(() => {
    const disabled: ArtianInfusion[] = [];
    if (noAffinity) disabled.push("Affinity");
    return disabled;
  }, [noAffinity]);

  const disabledReinforcementTypeOptions = useMemo(() => {
    const disabled: ArtianUpgrade[] = [];
    if (noAmmo) disabled.push("Ammo");
    if (noSharpness) disabled.push("Sharpness");
    if (noAffinity) disabled.push("Affinity");
    if (noElement) disabled.push("Element");
    return disabled;
  }, [noAmmo, noSharpness, noAffinity, noElement]);

  // Get available group/series skills
  const availableGroupSkills = useMemo(() => {
    return [
      ...Object.keys(GroupSkillsCombined),
      ...Object.keys(SeriesSkillsCombined),
    ].sort();
  }, []);

  // Check which reinforcement levels are available for each type
  const getAvailableLevels = (type: ArtianUpgrade): GogmaziosReinforcementLevel[] => {
    if (type === "Attack" || type === "Affinity") {
      return ["II", "III", "EX"];
    } else if (type === "Element" || type === "Sharpness" || type === "Ammo") {
      return ["II", "EX"]; // No level III for these
    }
    return [];
  };

  const handleSave = () => {
    setGogmaziosFocus(localGogmazios.focus);
    setGogmaziosType(localGogmazios.element);
    localGogmazios.infusions.forEach((u, i) => setGogmaziosInfusion(i, u));
    localGogmazios.reinforcements.forEach((r, i) => setGogmaziosReinforcement(i, r));
    localGogmazios.groupSkills.forEach((s, i) => setGogmaziosGroupSkill(i, s));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="primary" className="bg-accent-alt">
          <SettingsIcon className="size-4" />
          Gogmazios
        </Button>
      </DialogTrigger>
      <DialogContent
        title="Gogmazios Weapon"
        setOpen={setOpen}
        className="sm:h-fit sm:w-xl sm:max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col gap-4">
          {/* Focus Selection */}
          <Select
            label="Focus"
            value={localGogmazios.focus}
            placeholder="Focus Type"
            labelFn={(v) => v ?? ""}
            options={[...GogmaziosFocusOptions]}
            onChangeValue={(v) => setLocalGogmazios({ ...localGogmazios, focus: v })}
          />

          {/* Element Selection */}
          <Select
            label="Element"
            value={localGogmazios.element}
            placeholder="Type"
            labelFn={(v) => v ?? ""}
            options={[...ArtianTypeOptions]}
            onChangeValue={(v) => setLocalGogmazios({ ...localGogmazios, element: v })}
          />

          {/* Infusions */}
          <div className="flex flex-col gap-2">
            <label className="text-xs">Infusion</label>
            {[0, 1, 2].map((i) => (
              <Select
                key={i}
                value={localGogmazios.infusions[i]}
                placeholder={`Infusion ${i + 1}`}
                options={[undefined, ...ArtianInfusionOptions]}
                disabledOptions={disabledInfusionOptions}
                labelFn={(v) => v ?? ""}
                onChangeValue={(v) => {
                  const newInfusions = [...localGogmazios.infusions] as [ArtianInfusion?, ArtianInfusion?, ArtianInfusion?];
                  newInfusions[i] = v;
                  setLocalGogmazios({ ...localGogmazios, infusions: newInfusions });
                }}
              />
            ))}
          </div>

          {/* Reinforcements with Levels */}
          <div className="flex flex-col gap-2">
            <label className="text-xs">Reinforcement</label>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-2">
                <div className="flex-1">
                  <Select
                    value={localGogmazios.reinforcements[i]?.type}
                    placeholder={`Type ${i + 1}`}
                    options={[undefined, ...ArtianUpgradeOptions]}
                    disabledOptions={disabledReinforcementTypeOptions}
                    labelFn={(v) => v ?? ""}
                    onChangeValue={(v) => {
                      const newReinforcements = [...localGogmazios.reinforcements];
                      if (!v) {
                        newReinforcements[i] = undefined;
                      } else {
                        const level = localGogmazios.reinforcements[i]?.level ?? "II";
                        newReinforcements[i] = { type: v, level };
                      }
                      setLocalGogmazios({ ...localGogmazios, reinforcements: newReinforcements as Gogmazios["reinforcements"] });
                    }}
                  />
                </div>
                {localGogmazios.reinforcements[i]?.type && (
                  <div className="w-24">
                    <Select
                      value={localGogmazios.reinforcements[i]?.level}
                      placeholder="Level"
                      options={getAvailableLevels(
                        localGogmazios.reinforcements[i]!.type,
                      )}
                      labelFn={(v) => v ?? ""}
                      onChangeValue={(v) => {
                        const newReinforcements = [...localGogmazios.reinforcements];
                        const type = localGogmazios.reinforcements[i]!.type;
                        newReinforcements[i] = {
                          type,
                          level: v as GogmaziosReinforcementLevel,
                        };
                        setLocalGogmazios({ ...localGogmazios, reinforcements: newReinforcements as Gogmazios["reinforcements"] });
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Group Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-xs">Group/Series Skills</label>
            {[0, 1].map((i) => (
              <Select
                key={i}
                value={localGogmazios.groupSkills[i]}
                placeholder={`Skill ${i + 1}`}
                options={[undefined, ...availableGroupSkills]}
                labelFn={(v) => v ?? ""}
                onChangeValue={(v) => {
                  const newGroupSkills = [...localGogmazios.groupSkills] as [SkillName?, SkillName?];
                  newGroupSkills[i] = v;
                  setLocalGogmazios({ ...localGogmazios, groupSkills: newGroupSkills });
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
