import { useBuild, useComputed } from "@/builder";
import { Card, Checkbox } from "@/components";
import {
  CombinedSkillsTwo,
  GroupSkillsTwo,
  SeriesSkillsTwo,
} from "@/data/skills";
import { cn } from "@/utils";

export const SkillPointCard = () => {
  const { disabled, setDisabled } = useBuild();
  const { skillPoints, groupPoints } = useComputed();

  return (
    <Card>
      <h1>Skills</h1>
      <div className="flex flex-col gap-2">
        {Object.entries(groupPoints)
          .filter(([k, v]) => {
            if (k in GroupSkillsTwo && v < 3) return false;
            if (k in SeriesSkillsTwo && v < 2) return false;
            return true;
          })
          .sort(([, v1], [, v2]) => {
            return v2 - v1;
          })
          .map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className={cn("text-sm", disabled[k] && "line-through")}>
                  {k}
                </p>
                <div className="flex gap-1">
                  {(k in SeriesSkillsTwo ? [2, 4] : [3]).map((i) => {
                    return (
                      <div
                        key={i}
                        className={cn(
                          "border-placeholder bg-divider h-4 w-4",
                          v >= i && "border-accent-alt bg-accent-alt/75",
                        )}
                      />
                    );
                  })}
                </div>
              </div>
              {SeriesSkillsTwo[k]?.toggle && (
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
          .map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className={cn("text-sm", disabled[k] && "line-through")}>
                  {k}
                </p>
                <div className="flex gap-1">
                  {Object.entries(
                    "levels" in CombinedSkillsTwo[k]
                      ? CombinedSkillsTwo[k].levels
                      : CombinedSkillsTwo[k].groups[0].levels,
                  ).map((k, i) => (
                    <div
                      key={i}
                      className={cn(
                        "border-divider h-4 w-4 border",
                        v > i && "border-accent bg-accent/75",
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
            </div>
          ))}
      </div>
    </Card>
  );
};
