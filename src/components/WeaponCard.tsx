import { useBuild } from "@/builder";
import {
  Card,
  DecorationPickerDialog,
  SkillSelect,
  WeaponPickerDialog,
} from "@/components";
import { WeaponBuffs } from "@/data";

export const WeaponCard = () => {
  const {
    weapon: w,
    weaponSlots,
    otherBuffs: buffs,
    setOtherBuff: setBuff,
    setWeaponDecoration,
  } = useBuild();
  return (
    <Card>
      <div>
        <h1>Equipment</h1>
      </div>
      <div className="flex flex-col gap-2">
        <WeaponPickerDialog />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => {
            // if (!helm?.slots[i]) return;
            return (
              <DecorationPickerDialog
                key={i}
                type="Weapon"
                value={weaponSlots[i]}
                level={w.slots[i] ?? 0}
                setValue={(v) => setWeaponDecoration(i, v)}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {Object.entries(WeaponBuffs).map(([k, s]) => {
            if (!s.weapons?.includes(w.type)) return undefined;
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
      </div>
    </Card>
  );
};
