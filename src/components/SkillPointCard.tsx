import { useBuild, useComputed } from "@/builder";
import { Card, Checkbox } from "@/components";
import {
  CombinedSkillsTwo,
  GroupSkillsTwo,
  SeriesSkillsTwo,
} from "@/data/skills";
import { cn } from "@/utils";

export const SkillPointCard = ({ className }: { className?: string }) => {
  const { disabled, flags, setDisabled, setFlag } = useBuild();
  const { skillPoints, groupPoints, buffs } = useComputed();

  return (
    <Card className={className}>
      <h1>Skills</h1>
      <div className="flex flex-col gap-2">
        {Object.entries(groupPoints)
          .filter(([k, v]) => {
            if (!(k in SeriesSkillsTwo)) return false;
            if (v < 2) return false;
            return true;
          })
          .sort(([, v1], [, v2]) => {
            return v2 - v1;
          })
          .map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <div className="flex flex-col gap-1">
                <div>
                  <p className="text-secondary text-xs">{k}</p>
                  {buffs[k] && (
                    <p className={cn("text-sm", disabled[k] && "line-through")}>
                      {buffs[k].name}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  {(k in SeriesSkillsTwo ? [2, 4] : [3]).map((i) => {
                    return (
                      <div
                        key={i}
                        className={cn(
                          "border-divider bg-background h-4 w-4 border",
                          v >= i && "border-accent-alt/50 bg-accent-alt",
                        )}
                      />
                    );
                  })}
                </div>
              </div>
              {CombinedSkillsTwo[k]?.toggle && (
                <Checkbox
                  value={!disabled[k]}
                  onChangeValue={() => setDisabled(k, !disabled[k])}
                />
              )}
            </div>
          ))}
        {Object.entries(skillPoints)
          .filter(([k]) => k in CombinedSkillsTwo)
          .sort(([, v1], [, v2]) => {
            return v2 - v1;
          })
          .map(([k, v]) => {
            const levels =
              "levels" in CombinedSkillsTwo[k]
                ? CombinedSkillsTwo[k].levels
                : CombinedSkillsTwo[k].groups[0].levels;

            const entries = Object.entries(levels);
            return (
              <div key={k} className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <p className={cn("text-sm", disabled[k] && "line-through")}>
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
                {CombinedSkillsTwo[k]?.toggle && (
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
          .filter(([k, v]) => {
            if (!(k in GroupSkillsTwo)) return false;
            if (v < 3) return false;
            return true;
          })
          .sort(([, v1], [, v2]) => {
            return v2 - v1;
          })
          .map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <div className="flex flex-col gap-1">
                <div>
                  <p className="text-secondary text-xs">{k}</p>
                  {buffs[k] && (
                    <p className={cn("text-sm", disabled[k] && "line-through")}>
                      {buffs[k].name}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  {(k in SeriesSkillsTwo ? [2, 4] : [3]).map((i) => {
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
              {CombinedSkillsTwo[k]?.toggle && (
                <Checkbox
                  value={!disabled[k]}
                  onChangeValue={() => setDisabled(k, !disabled[k])}
                />
              )}
            </div>
          ))}
      </div>
    </Card>
  );
};
