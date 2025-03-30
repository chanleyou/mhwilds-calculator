import { WrenchIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Sharpnesses } from "@/data";
import {
  ArmorSkills,
  GroupSkills,
  SeriesSkills,
  WeaponSkills,
} from "@/data/skills";
import { useBuild, useComputed } from "@/store/builder";
import { isRanged } from "@/types";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Notice,
  Select,
} from ".";

export const ManualDialog = () => {
  const { manualSkills, manualSharpness, setManualSharpness, setManualSkills } =
    useBuild();
  const { weapon: w } = useComputed();
  const [open, setOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const length = useMemo(() => {
    return Object.values(manualSkills).length + (!!manualSharpness ? 1 : 0);
  }, [manualSkills, manualSharpness]);

  useEffect(() => {
    if (isRanged(w.type)) setManualSharpness(undefined);
  }, [w.type, setManualSharpness]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={length > 0 ? "primary" : "secondary"}>
          <WrenchIcon className="size-4" size="sm"></WrenchIcon>Overrides
          {length > 0 && <span>({length})</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="h-dvh w-[100vw] sm:h-fit sm:w-3xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between gap-2">
            <DialogTitle asChild>
              <h1>Overrides</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="size-5" />
            </Button>
          </div>
          {showNotice && (
            <Notice>
              <div className="flex justify-between gap-2">
                <p className="flex-1">
                  You can manually override weapon sharpness and skill levels
                  here.
                </p>
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => setShowNotice(false)}
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            </Notice>
          )}
          <div className="flex flex-col gap-4 overflow-auto">
            <div className="flex flex-col gap-2">
              <h2>Weapon</h2>
              <Select
                placeholder="Sharpness"
                value={manualSharpness}
                onChangeValue={setManualSharpness}
                options={[undefined, ...Sharpnesses]}
                disabledOptions={[...Sharpnesses.filter((s) => s === "Ranged")]}
                disabled={isRanged(w.type)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Weapon Skills</h2>
              <div className="lg:grid-cols- grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(WeaponSkills)
                  .filter(([k]) => {
                    if (k === "Blast Attack") return false;
                    if (k === "Paralysis Attack") return false;
                    if (k === "Poison Attack") return false;
                    if (k === "Sleep Attack") return false;
                    if (k === "Handicraft") return false;
                    return true;
                  })
                  .map(([k, skill]) => {
                    const levels =
                      "levels" in skill ? skill.levels : skill.groups[0].levels;
                    return (
                      <Select
                        key={k}
                        value={manualSkills[k]?.toString()}
                        placeholder={k}
                        labelFn={(v) =>
                          v ? (levels[Number(v)].name ?? "") : ""
                        }
                        options={[undefined, ...Object.keys(levels)]}
                        onChangeValue={(v) => {
                          setManualSkills(k, v ? Number(v) : undefined);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Armor Skills</h2>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(ArmorSkills).map(([k, skill]) => {
                  const levels =
                    "levels" in skill ? skill.levels : skill.groups[0].levels;
                  return (
                    <Select
                      key={k}
                      value={manualSkills[k]?.toString()}
                      placeholder={k}
                      labelFn={(v) => (v ? (levels[Number(v)].name ?? "") : "")}
                      options={[undefined, ...Object.keys(levels)]}
                      onChangeValue={(v) => {
                        setManualSkills(k, v ? Number(v) : undefined);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Series Skills</h2>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(SeriesSkills).map(([k, skill]) => {
                  return (
                    <Select
                      key={k}
                      value={manualSkills[k]?.toString()}
                      placeholder={k}
                      labelFn={(v) => {
                        if (!v) return "";
                        const level = Number(v);
                        return level === 2 || level === 4
                          ? (SeriesSkills[k].levels[level].name ?? "")
                          : "";
                      }}
                      options={[undefined, ...Object.keys(skill.levels)]}
                      onChangeValue={(v) => {
                        setManualSkills(k, v ? Number(v) : undefined);
                      }}
                    />
                  );
                })}
                {Object.entries(GroupSkills).map(([k, skill]) => {
                  return (
                    <Select
                      key={k}
                      value={manualSkills[k]?.toString()}
                      placeholder={k}
                      labelFn={(v) => {
                        if (!v) return "";
                        return Number(v) === 3
                          ? (GroupSkills[k].levels[3].name ?? "")
                          : "";
                      }}
                      options={[undefined, ...Object.keys(skill.levels)]}
                      onChangeValue={(v) => {
                        setManualSkills(k, v ? Number(v) : undefined);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
