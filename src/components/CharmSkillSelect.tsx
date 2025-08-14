"use client";

import { WeaponArmorSkills } from "@/data/skills";
import { SkillName } from "@/types";
import { Select, SelectProps } from "./Select";

const options = Object.entries(WeaponArmorSkills).flatMap(([skill, entry]) => {
  const levels = Object.entries(
    "levels" in entry ? entry.levels : entry.groups[0].levels,
  );

  return levels.map<[SkillName, number]>(([level]) => [skill, Number(level)]);
});

console.log({ options });

type Props = Omit<SelectProps<[SkillName, number] | undefined>, "options"> & {};

export function CharmSkillSelect({
  label,
  value,
  onChangeValue,
  placeholder,
}: Props) {
  return (
    <Select
      options={[undefined, ...options]}
      label={label}
      value={value}
      labelFn={(opt) => (opt ? `${opt[0]} ${opt[1]}` : "")}
      onChangeValue={onChangeValue}
      placeholder={placeholder}
    />
  );
}
