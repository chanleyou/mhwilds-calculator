import {
  ArmorSkills,
  GroupSkills,
  SeriesSkills,
  WeaponSkills,
} from "@/data/skills";
import { useBuild } from "@/store/builder";
import { Card, Select } from ".";

export const ManualSkillsCard = () => {
  const { manualSkills, setManualSkills } = useBuild();
  return (
    <Card>
      <h1>Skills</h1>
      <h2>Weapon</h2>
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
                labelFn={(v) => (v ? (levels[Number(v)].name ?? "") : "")}
                options={[undefined, ...Object.keys(levels)]}
                onChangeValue={(v) => {
                  setManualSkills(k, v ? Number(v) : undefined);
                }}
              />
            );
          })}
      </div>
      <h2>Armor</h2>
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
      <h2>Series</h2>
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
      </div>
      <h2>Group</h2>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </Card>
  );
};
