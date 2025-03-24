import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useBuild, useComputed } from "@/builder";
import { Card, Checkbox, TooltipContent } from "@/components";
import {
  GroupSkillsTwo,
  SeriesSkillsTwo,
  WeaponArmorSkills,
} from "@/data/skills";
import { Buff, isSkillGroup } from "@/types";
import { cn } from "@/utils";

export const SkillPointCard = ({ className }: { className?: string }) => {
  const { disabled, flags, setDisabled, setFlag } = useBuild();
  const { skillPoints, groupPoints } = useComputed();

  return (
    <Card className={className}>
      <h1>Skills</h1>
      <div className="flex flex-col gap-2">
        {Object.entries(groupPoints)
          .sort(([, v1], [, v2]) => {
            return v2 - v1;
          })
          .map(([k, v]) => {
            if (v < 2) return;
            const skill = SeriesSkillsTwo[k];
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
                            "border-divider bg-background h-4 w-4 border",
                            v >= l && "border-accent-alt/50 bg-accent-alt",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
                {skill.toggle && (
                  <Checkbox
                    value={!disabled[k]}
                    onChangeValue={() => setDisabled(k, !disabled[k])}
                  />
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
              <div key={k} className="flex justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col gap-1">
                      <p
                        className={cn("text-sm", disabled[k] && "line-through")}
                      >
                        {k} {Math.min(v, entries.length)}
                      </p>
                      <div className="flex gap-1">
                        {entries.map((_, i) => (
                          <div
                            key={`${k}-${i}`}
                            className={cn(
                              "border-divider bg-background h-4 w-4 border",
                              v > i && "border-accent/50 bg-accent",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </TooltipTrigger>
                  {skill.description && (
                    <TooltipContent>
                      <p>{skill.description}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
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
            );
          })}
        {Object.entries(groupPoints)
          .sort(([, v1], [, v2]) => {
            return v2 - v1;
          })
          .map(([k, v]) => {
            if (v < 3) return;
            const skill = GroupSkillsTwo[k];
            if (!skill) return;
            const level = skill.levels[3];

            return (
              <div key={k} className="flex justify-between">
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
                            "border-divider bg-background h-4 w-4 border",
                            v >= i && "border-indigo-400/50 bg-indigo-400",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
                {skill.toggle && (
                  <Checkbox
                    value={!disabled[k]}
                    onChangeValue={() => setDisabled(k, !disabled[k])}
                  />
                )}
              </div>
            );
          })}
      </div>
    </Card>
  );
};
