import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Card, Checkbox, Slider, TooltipContent } from "@/components";
import {
  GroupSkillsCombined,
  SeriesSkillsCombined,
  WeaponArmorSkills,
} from "@/data/skills";
import { useBuild, useComputed } from "@/store/builder";
import { Buff, isSkillGroup } from "@/types";
import { cn } from "@/utils";

export const SkillPointCard = ({ className }: { className?: string }) => {
  const { disabled, flags, setFlag, uptime, setUptime, setDisabled } =
    useBuild();
  const { skillPoints, groupPoints } = useComputed();

  return (
    <Card className={className}>
      <h1>Skills</h1>
      {Object.entries(groupPoints)
        .sort(([, v1], [, v2]) => {
          return v2 - v1;
        })
        .map(([k, v]) => {
          if (v < 2) return;
          const skill = SeriesSkillsCombined[k];
          if (!skill) return;
          const levels = skill.levels;

          const level = Object.entries(levels).reduce<Buff | undefined>(
            (acc, [l, b]) => {
              if (v >= Number(l)) return b;
              return acc;
            },
            undefined,
          );

          return (
            <div key={k} className="flex flex-col gap-1">
              <div key={k} className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-secondary text-xs">{k}</p>
                    {level && (
                      <p
                        className={cn("text-sm", disabled[k] && "line-through")}
                      >
                        {level.name}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[2, 4].map((l) => {
                      return (
                        <div
                          key={l}
                          className={cn(
                            "border-divider bg-background size-4 border",
                            v >= l && "border-none bg-cyan-300",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {skill.uptime && (
                <div className="flex items-center justify-between gap-2">
                  <Slider
                    skill={k}
                    value={[uptime[k] ?? 100]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setUptime(k, v[0])}
                  />
                  <div className="text-sm">{uptime[k] ?? 100}%</div>
                </div>
              )}
            </div>
          );
        })}
      {Object.entries(skillPoints)
        .sort(([, v1], [, v2]) => {
          return v2 - v1;
        })
        .map(([k, v]) => {
          const skill = WeaponArmorSkills[k];
          if (!skill) return;
          const levels = isSkillGroup(skill)
            ? skill.levels
            : skill.groups[0].levels;

          const entries = Object.entries(levels);
          return (
            <div key={k} className="flex flex-col gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-3 flex-col gap-1">
                      <p
                        className={cn(
                          "text-sm",
                          disabled[k] || (uptime[k] === 0 && "line-through"),
                        )}
                      >
                        {k} {Math.min(v, entries.length)}{" "}
                        {v > entries.length && `(${v})`}
                      </p>
                      <div className="flex gap-1">
                        {entries.map((_, i) => (
                          <div
                            key={`${k}-${i}`}
                            className={cn(
                              "border-divider bg-background size-4 border",
                              v > i && "border-none bg-amber-500",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    {/* {skill.uptime && (
                      <NumberInputTwo
                        className="flex-1"
                        hideButtons
                        value={uptime[k] ?? 100}
                        onChangeValue={(v) => setUptime(k, v)}
                        label="Uptime %"
                      />
                    )} */}
                    {skill.toggle && (
                      <Checkbox
                        value={!disabled[k]}
                        onChangeValue={() => setDisabled(k, !disabled[k])}
                      />
                    )}
                    {k === "Tetrad Shot" && (
                      <div className="flex gap-2">
                        <Checkbox
                          // label="Affinity"
                          value={"TetradAffinity" in flags}
                          onChangeValue={(v) => setFlag("TetradAffinity", v)}
                        />
                        <Checkbox
                          // label="Attack"
                          value={"TetradAttack" in flags}
                          onChangeValue={(v) => setFlag("TetradAttack", v)}
                        />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                {skill.description && (
                  <TooltipContent>
                    <h2>{k}</h2>
                    <p>{skill.description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
              {skill.uptime && (
                <div className="flex items-center justify-between gap-2">
                  <Slider
                    skill={k}
                    value={[uptime[k] ?? 100]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setUptime(k, v[0])}
                  />
                  <div className="text-sm">{uptime[k] ?? 100}%</div>
                </div>
              )}
            </div>
          );
        })}
      {Object.entries(groupPoints)
        .sort(([, v1], [, v2]) => {
          return v2 - v1;
        })
        .map(([k, v]) => {
          if (v < 3) return;
          const skill = GroupSkillsCombined[k];
          if (!skill) return;
          const level = skill.levels[3];

          return (
            <div key={k} className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-secondary text-xs">{k}</p>
                    {v >= 3 && level && (
                      <p
                        className={cn("text-sm", disabled[k] && "line-through")}
                      >
                        {level.name}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[3].map((i) => {
                      return (
                        <div
                          key={i}
                          className={cn(
                            "border-divider bg-background size-4 border",
                            v >= i && "border-none bg-indigo-300",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {skill.uptime && (
                <div className="flex items-center justify-between gap-2">
                  <Slider
                    skill={k}
                    value={[uptime[k] ?? 100]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setUptime(k, v[0])}
                  />
                  <div className="text-sm">{uptime[k] ?? 100}%</div>
                </div>
              )}
            </div>
          );
        })}
    </Card>
  );
};
