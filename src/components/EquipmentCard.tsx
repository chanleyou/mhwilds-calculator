import {
  ArmorPickerDialog,
  ArtianDialog,
  Card,
  CharmSkillSelect,
  DecorationPickerDialog,
  WeaponPickerDialog,
} from "@/components";
import { useBuild } from "@/store/builder";

export const EquipmentCard = () => {
  const {
    w: w,
    weaponSlots,
    setWeaponDecoration,
    helm,
    body,
    arms,
    waist,
    legs,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
    setHelm,
    setBody,
    setArms,
    setWaist,
    setLegs,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
    charmSlots,
    setCharmDecoration,
    charmSkills,
    setCharmSkill,
  } = useBuild();

  return (
    <Card>
      <h1>Equipment</h1>
      <p className="text-sm">Weapon</p>
      <div className="flex gap-2">
        <WeaponPickerDialog />
        {w.artian && <ArtianDialog />}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          // if (!helm?.slots[i]) return;
          return (
            <DecorationPickerDialog
              key={i}
              type="Weapon"
              value={weaponSlots[i]}
              level={w.slots[i] ?? 0}
              setValue={setWeaponDecoration(i)}
            />
          );
        })}
      </div>
      {/* <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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
        </div> */}
      <div></div>
      <p className="text-sm">Armor</p>
      <ArmorPickerDialog type="Helm" value={helm} setValue={setHelm} />
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          // if (!helm?.slots[i]) return;
          return (
            <DecorationPickerDialog
              key={i}
              value={helmSlots[i]}
              level={helm?.slots[i] ?? 0}
              setValue={setHelmDecoration(i)}
            />
          );
        })}
      </div>
      <ArmorPickerDialog type="Body" value={body} setValue={setBody} />
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          // if (!body?.slots[i]) return;
          return (
            <DecorationPickerDialog
              key={i}
              value={bodySlots[i]}
              level={body?.slots[i] ?? 0}
              setValue={setBodyDecoration(i)}
            />
          );
        })}
      </div>
      <ArmorPickerDialog type="Arms" value={arms} setValue={setArms} />
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          return (
            <DecorationPickerDialog
              key={i}
              value={armsSlots[i]}
              level={arms?.slots[i] ?? 0}
              setValue={setArmsDecoration(i)}
            />
          );
        })}
      </div>
      <ArmorPickerDialog type="Waist" value={waist} setValue={setWaist} />
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          return (
            <DecorationPickerDialog
              key={i}
              value={waistSlots[i]}
              level={waist?.slots[i] ?? 0}
              setValue={setWaistDecoration(i)}
            />
          );
        })}
      </div>
      <ArmorPickerDialog type="Legs" value={legs} setValue={setLegs} />
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          return (
            <DecorationPickerDialog
              key={i}
              value={legsSlots[i]}
              level={legs?.slots[i] ?? 0}
              setValue={setLegsDecoration(i)}
            />
          );
        })}
      </div>
      <div></div>
      <p className="text-sm">Charm</p>
      {[0, 1].map((i) => (
        <CharmSkillSelect
          key={i}
          placeholder="Skill"
          value={charmSkills[i]}
          onChangeValue={setCharmSkill(i)}
        />
      ))}
      <div className="grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          return (
            <DecorationPickerDialog
              type={i === 0 ? "Both" : "Equipment"}
              key={i}
              value={charmSlots[i]}
              level={i === 0 ? 3 : 1}
              setValue={setCharmDecoration(i)}
            />
          );
        })}
      </div>
    </Card>
  );
};
