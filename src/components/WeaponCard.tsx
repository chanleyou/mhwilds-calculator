import { useBuild } from "@/builder";
import {
  Card,
  NumberInput,
  Select,
  SkillSelect,
  SkillSelectTwo,
} from "@/components";
import { WeaponBuffs } from "@/data";
import { Sharpnesses, Weapons } from "@/data";
import { WeaponSkillsTwo } from "@/data/skills";
import { useModel } from "@/store";
import { getSkillLevels, isRanged } from "@/types";

export const WeaponCard = ({ showSkills }: { showSkills?: boolean }) => {
  const {
    weapon,
    attack,
    element,
    affinity,
    sharpness,
    buffs,
    setWeapon,
    setAttack,
    setElement,
    setAffinity,
    setSharpness,
    setBuff,
  } = useModel();
  const { weaponSkills, setWeaponSkill } = useBuild();
  return (
    <Card>
      <div>
        <h1>Weapon</h1>
        <h3>
          {`Enable "Display Without Coefficient" in game options. Don't divide Element by 10.`}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-4">
          <Select
            label="Weapon"
            value={weapon}
            options={[...Weapons]}
            onChangeValue={setWeapon}
          />
        </div>
        <NumberInput
          label="Attack"
          value={attack}
          onChangeValue={setAttack}
          min={0}
          step={5}
        />
        <NumberInput
          label="Element"
          value={element}
          onChangeValue={setElement}
          min={0}
          step={10}
          disabled={["Light Bowgun", "Heavy Bowgun"].includes(weapon)}
        />
        <NumberInput
          label="Affinity"
          value={affinity}
          onChangeValue={setAffinity}
          step={5}
          min={-100}
          max={100}
        />
        <Select
          label="Sharpness"
          value={sharpness}
          disabled={isRanged(weapon)}
          onChangeValue={setSharpness}
          options={[...Sharpnesses]}
          // description={`Raw: ${sharpnessRaw[sharpness]} Element: ${sharpnessEle[sharpness]}`}
        />
        {Object.entries(WeaponBuffs).map(([k, s]) => {
          if (!s.weapons?.includes(weapon)) return undefined;
          return (
            <SkillSelect
              key={k}
              skill={s}
              value={buffs[k]}
              label={s.name}
              placeholder=""
              onChangeValue={(buff) => setBuff(k, buff)}
            />
          );
        })}
      </div>
      {showSkills && (
        <div className="flex flex-col gap-2">
          <p className="pl-0.5 text-xs">Skills</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(WeaponSkillsTwo).map(([k, s]) => {
              return (
                <SkillSelectTwo
                  key={k}
                  placeholder={k}
                  skill={s}
                  value={Object.entries(getSkillLevels(s))[weaponSkills[k] - 1]}
                  onChangeValue={(s) => {
                    setWeaponSkill(k, s ? Number(s[0]) : undefined);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};
