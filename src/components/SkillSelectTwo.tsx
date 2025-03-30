import type { Buff, Skill, SkillWeaponGroup } from "@/types";
import { Select, type SelectProps } from ".";

type Props = Omit<SelectProps<[string, Buff] | undefined>, "options"> & {
  skill: Skill | SkillWeaponGroup;
};

export function SkillSelectTwo({
  skill,
  onChangeValue,
  label,
  placeholder,
  value,
}: Props) {
  const levels = Object.entries(
    "levels" in skill ? skill.levels : skill.groups[0].levels,
  );

  const options = [undefined, ...levels];

  return (
    <Select
      options={options}
      label={label}
      value={value}
      labelFn={(opt) => (opt ? (opt[1].name ?? "") : "")}
      onChangeValue={onChangeValue}
      placeholder={placeholder}
      // description={""}
    />
  );
}
