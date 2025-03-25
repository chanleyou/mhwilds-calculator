import {
  ArmorPickerDialog,
  ArtianDialog,
  Card,
  CharmPickerDialog,
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
    charm,
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
    setCharm,
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
  } = useBuild();
  return (
    <Card>
      <h1>Equipment</h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Weapon</p>
        <div className="flex gap-2">
          <WeaponPickerDialog />
          {w.artian && <ArtianDialog />}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => {
            // if (!helm?.slots[i]) return;
            return (
              <DecorationPickerDialog
                key={i}
                value={helmSlots[i]}
                level={helm?.slots[i] ?? 0}
                setValue={(v) => setHelmDecoration(i, v)}
              />
            );
          })}
        </div>
        <ArmorPickerDialog type="Body" value={body} setValue={setBody} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => {
            // if (!body?.slots[i]) return;
            return (
              <DecorationPickerDialog
                key={i}
                value={bodySlots[i]}
                level={body?.slots[i] ?? 0}
                setValue={(v) => setBodyDecoration(i, v)}
              />
            );
          })}
        </div>
        <ArmorPickerDialog type="Arms" value={arms} setValue={setArms} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => {
            return (
              <DecorationPickerDialog
                key={i}
                value={armsSlots[i]}
                level={arms?.slots[i] ?? 0}
                setValue={(v) => setArmsDecoration(i, v)}
              />
            );
          })}
        </div>
        <ArmorPickerDialog type="Waist" value={waist} setValue={setWaist} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => {
            return (
              <DecorationPickerDialog
                key={i}
                value={waistSlots[i]}
                level={waist?.slots[i] ?? 0}
                setValue={(v) => setWaistDecoration(i, v)}
              />
            );
          })}
        </div>
        <ArmorPickerDialog type="Legs" value={legs} setValue={setLegs} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => {
            return (
              <DecorationPickerDialog
                key={i}
                value={legsSlots[i]}
                level={legs?.slots[i] ?? 0}
                setValue={(v) => setLegsDecoration(i, v)}
              />
            );
          })}
        </div>
        <div></div>
        <p className="text-sm">Charm</p>
        <CharmPickerDialog value={charm} setValue={setCharm} />
      </div>
    </Card>
  );
};
