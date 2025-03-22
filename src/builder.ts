import { produce } from "immer";
import { create } from "zustand";
import { Buffs, CombinedBuffs } from "@/data";
import {
  CombinedSkillsTwo,
  GroupAndSeriesSkills,
  UnsupportedArmorSkills,
} from "@/data/skills";
import {
  calculateAffinity,
  calculateAttack,
  calculateAverage,
  calculateBowgunElement,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "@/model";
import {
  type Armor,
  Attack,
  type Buff,
  type Charm,
  type Decoration,
  type Sharpness,
  type Skill,
  type Slots,
  type Weapon,
  isBowgun,
  isRanged,
  isSkillGroup,
} from "@/types";

export type InitialBuilder = {
  weapon: Weapon;
  attack: number;
  affinity: number;
  element: number;
  sharpness: Sharpness;
  otherBuffs: Record<string, Buff>;
  rawHzv: number;
  eleHzv: number;
  isWound: boolean;
  weaponSkills: Record<Skill, number>;
  helm?: Armor;
  body?: Armor;
  arms?: Armor;
  waist?: Armor;
  legs?: Armor;
  charm?: Charm;
  helmSlots: Slots;
  bodySlots: Slots;
  armsSlots: Slots;
  waistSlots: Slots;
  legsSlots: Slots;
  disabled: Record<Skill, boolean>;
};

const initialBuilder: InitialBuilder = {
  weapon: "Sword and Shield",
  attack: 200,
  affinity: 0,
  element: 0,
  sharpness: "White",
  otherBuffs: { Powercharm: Buffs.Powercharm.levels[0] },
  rawHzv: 80,
  eleHzv: 30,
  isWound: false,
  weaponSkills: {},
  helmSlots: [],
  bodySlots: [],
  armsSlots: [],
  waistSlots: [],
  legsSlots: [],
  disabled: {},
};

export type Builder = InitialBuilder & {
  reset: () => void;
  setWeapon: (weaponType: Weapon) => void;
  setAttack: (attack: number) => void;
  setAffinity: (affinity: number) => void;
  setElement: (element: number) => void;
  setSharpness: (sharpness: Sharpness) => void;
  setOtherBuff: (id: string, buff?: Buff) => void;
  setRawHzv: (rawHzv: number) => void;
  setEleHzv: (eleHzv: number) => void;
  setIsWound: (isWound: boolean) => void;
  setWeaponSkill: (s: Skill, n?: number) => void;
  setHelm: (helm?: Armor) => void;
  setWaist: (waist?: Armor) => void;
  setArms: (arms?: Armor) => void;
  setBody: (body?: Armor) => void;
  setLegs: (legs?: Armor) => void;
  setCharm: (charm?: Charm) => void;
  setHelmDecoration: (i: number, d?: Decoration) => void;
  setBodyDecoration: (i: number, d?: Decoration) => void;
  setArmsDecoration: (i: number, d?: Decoration) => void;
  setWaistDecoration: (i: number, d?: Decoration) => void;
  setLegsDecoration: (i: number, d?: Decoration) => void;
  setDisabled: (s: Skill, a: boolean) => void;
};

export const useBuild = create<Builder>((set) => ({
  ...initialBuilder,
  reset: () => set(initialBuilder),
  setWeapon: (weapon: Weapon) =>
    set(
      produce<Builder>((d) => {
        {
          d.weapon = weapon;

          if (isRanged(weapon)) d.sharpness = "Ranged";
          if (isBowgun(weapon)) d.element = 0;
          if (!isRanged(weapon) && d.sharpness === "Ranged") {
            d.sharpness = "White";
          }

          Object.entries(CombinedBuffs).forEach(([key, group]) => {
            if (
              "weapons" in group &&
              group.weapons &&
              !group.weapons.includes(weapon)
            ) {
              delete d.otherBuffs[key];
            }
          });
        }
      }),
    ),
  setAttack: (attack: number) => set({ attack: attack }),
  setAffinity: (affinity: number) => set({ affinity: affinity }),
  setElement: (element: number) => set({ element: element }),
  setSharpness: (sharpness: Sharpness) => set({ sharpness }),
  setRawHzv: (rawHzv: number) => set({ rawHzv }),
  setEleHzv: (eleHzv: number) => set({ eleHzv }),
  setOtherBuff: (id: string, buff?: Buff) => {
    set(
      produce((d) => {
        if (buff) d.otherBuffs[id] = buff;
        else delete d.otherBuffs[id];
      }),
    );
  },
  setIsWound: (isWound: boolean) => set({ isWound }),
  setWeaponSkill: (s, n) =>
    set(
      produce((d) => {
        if (n) d.weaponSkills[s] = n;
        else delete d.weaponSkills[s];
      }),
    ),
  setHelm: (helm?: Armor) => set({ helm, helmSlots: [] }),
  setWaist: (waist?: Armor) => set({ waist, waistSlots: [] }),
  setArms: (arms?: Armor) => set({ arms, armsSlots: [] }),
  setBody: (body?: Armor) => set({ body, bodySlots: [] }),
  setLegs: (legs?: Armor) => set({ legs, legsSlots: [] }),
  setCharm: (charm?: Charm) => set({ charm }),
  setHelmDecoration: (i, dc) => {
    set(produce((d) => void (d.helmSlots[i] = dc)));
  },
  setBodyDecoration: (i, dc) => {
    set(produce((d) => void (d.bodySlots[i] = dc)));
  },
  setArmsDecoration: (i, dc) => {
    set(produce((d) => void (d.armsSlots[i] = dc)));
  },
  setWaistDecoration: (i, dc) => {
    set(produce((d) => void (d.waistSlots[i] = dc)));
  },
  setLegsDecoration: (i, dc) => {
    set(produce((d) => void (d.legsSlots[i] = dc)));
  },
  setDisabled: (s, a) => {
    set(
      produce((d) => {
        if (a) d.disabled[s] = a;
        else delete d.disabled[s];
      }),
    );
  },
}));

export const useComputed = () => {
  const {
    weapon,
    attack,
    affinity,
    element,
    rawHzv,
    isWound,
    otherBuffs,
    weaponSkills,
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
    disabled,
  } = useBuild();

  const armor = [helm, body, arms, waist, legs].filter((n): n is Armor => !!n);

  const decorations = [helmSlots, bodySlots, armsSlots, waistSlots, legsSlots]
    .flat()
    .filter((n): n is Decoration => !!n);

  const skillPoints = [
    ...decorations,
    ...armor,
    { skills: weaponSkills },
    charm,
  ].reduce<Record<Skill, number>>((acc, i) => {
    if (!i) return acc;
    const { skills } = i;
    Object.entries(skills).forEach(([k, v]) => {
      acc[k] = acc[k] ? acc[k] + v : v;
    });
    return acc;
  }, {});

  const groupPoints = armor.reduce<Record<Skill, number>>((acc, i) => {
    const { groupSkill, seriesSkill } = i;
    if (groupSkill) {
      acc[groupSkill] = acc[groupSkill] ? acc[groupSkill] + 1 : 1;
    }
    if (seriesSkill) {
      acc[seriesSkill] = acc[seriesSkill] ? acc[seriesSkill] + 1 : 1;
    }
    return acc;
  }, {});

  const buffs = Object.entries(skillPoints).reduce<Record<Skill, Buff>>(
    (acc, [k, v]) => {
      if (disabled[k]) return acc;
      if (UnsupportedArmorSkills[k]) return acc;
      if (!CombinedSkillsTwo[k]) return acc;

      const skill = CombinedSkillsTwo[k];

      if (isSkillGroup(skill)) {
        const maxLevel = Object.values(skill.levels).length;
        v = Math.min(maxLevel, v);
        acc[k] = skill.levels[v];
      } else {
        const group = skill.groups.find((grp) => grp.weapons.includes(weapon));
        if (group) {
          const maxLevel = Object.values(group.levels).length;
          v = Math.min(maxLevel, v);
          acc[k] = group.levels[v];
        }
      }

      return acc;
    },
    { ...otherBuffs },
  );

  Object.entries(groupPoints).forEach(([k, v]) => {
    if (disabled[k]) return;
    if (!GroupAndSeriesSkills[k]) return;

    const { levels } = GroupAndSeriesSkills[k];

    for (let i = v; i > 0; i--) {
      if (!levels[v]) continue;
      buffs[k] = levels[v];
      break;
    }
  });

  const frenzy = buffs.Frenzy !== undefined;

  const uiAffinity = calculateAffinity({ affinity, buffs, rawHzv, isWound });

  const saPhial = buffs.saPhial?.saPhial;

  const uiAttack = calculateAttack({ attack, buffs, frenzy });

  const uiElement = calculateElement({
    element,
    buffs,
    frenzy,
  });

  const bowgunOffset = Object.values(buffs).reduce((acc, buff) => {
    if (buff.bowgunOffset && buff.attack) return acc + buff.attack;
    return acc;
  }, 0);

  const bowgunElement = calculateBowgunElement({
    element: uiAttack - bowgunOffset,
    frenzy,
  });

  const critMulti = buffs["Critical Boost"]?.criticalBoost ?? 1.25;
  const eleCritMulti = buffs["Critical Element"]?.criticalElement ?? 1;

  const chargeEleMul = isRanged(weapon)
    ? (buffs["Charge Master"]?.rangedChargeEleMul ?? 1)
    : (buffs["Charge Master"]?.meleeChargeEleMul ?? 1);

  return {
    skillPoints,
    groupPoints,
    buffs,
    uiAttack,
    uiElement,
    swordAttack: uiAttack, // TODO
    swordElement: uiElement, // TODO
    bowgunElement,
    uiAffinity,
    powerAxe: buffs.SwitchAxePowerAxe?.powerAxe,
    saPhial,
    critMulti: uiAffinity >= 0 ? critMulti : 0.75,
    eleCritMulti: uiAffinity >= 0 ? eleCritMulti : 1,
    chargeEleMul,
    coatingRawMul: buffs.BowCoating?.coatingRawMul ?? 1,
    artilleryShellAttack: uiAttack, // TODO
    artilleryAmmoAttack: uiAttack, // TODO
    artilleryEle: buffs.Artillery?.artilleryEle ?? 0,
    normalShotsRawMul: buffs["Normal Shots"]?.normalShotsRawMul ?? 1,
    spreadPowerShotsRawMul:
      buffs["Spread/Power Shots"]?.spreadPowerShotsRawMul ?? 1,
    specialAmmoBoostRawMul:
      buffs["Special Ammo Boost"]?.specialAmmoBoostRawMul ?? 1,
    piercingShotsRawMul: buffs["Piercing Shots"]?.piercingShotsRawMul ?? 1,
    rapidFireMul: buffs["Rapid Fire Up"]?.rapidFireMul ?? 1,
    cbShieldElement: buffs.ChargeBladeShieldElement?.cbShieldElement,
    demonBoost: buffs.DualBladesDemonBoost?.demonBoost,
    artilleryAmmoAttackMul: buffs.Artillery?.artilleryAmmoAttackMul ?? 0,
  };
};

export const useCalculated = () => {
  const b = useBuild();
  const c = useComputed();
  const calcHit = (atk: Attack) => calculateHit({ ...b, ...c, ...atk });
  const calcCrit = (atk: Attack) => calculateCrit({ ...b, ...c, ...atk });
  return {
    calcHit,
    calcCrit,
    calcAverage: (atk: Attack) => {
      const hit = calcHit(atk);
      const crit = calcCrit(atk);
      return calculateAverage(hit, crit, atk.cantCrit ? 0 : c.uiAffinity);
    },
    calcEffectiveRaw: () => {
      const params = { ...b, ...c, mv: 100, rawHzv: 100, eleHzv: 0 };
      const hit = calculateHit(params);
      const crit = calculateCrit(params);
      const avg = calculateAverage(hit, crit, c.uiAffinity);
      return avg;
    },
    calcEffectiveEle: () => {
      const params = { ...b, ...c, mv: 0, rawHzv: 0, eleHzv: 100 };
      const hit = calculateHit(params);
      const crit = calculateCrit(params);
      const avg = calculateAverage(hit, crit, c.uiAffinity);
      return avg;
    },
  };
};

export const useCalcs = () => {
  const b = useBuild();
  const c = useComputed();
  const calcHit = (atk: Attack) => calculateHit({ ...b, ...c, ...atk });
  const calcCrit = (atk: Attack) => calculateCrit({ ...b, ...c, ...atk });
  return {
    calcHit,
    calcCrit,
    calcAverage: (atk: Attack) => {
      const hit = calcHit(atk);
      const crit = calcCrit(atk);
      return calculateAverage(hit, crit, atk.cantCrit ? 0 : c.uiAffinity);
    },
    calcEffectiveRaw: () => {
      const params = { ...b, ...c, mv: 100, rawHzv: 100, eleHzv: 0 };
      const hit = calculateHit(params);
      const crit = calculateCrit(params);
      const avg = calculateAverage(hit, crit, c.uiAffinity);
      return avg;
    },
    calcEffectiveEle: () => {
      const params = { ...b, ...c, mv: 0, rawHzv: 0, eleHzv: 100 };
      const hit = calculateHit(params);
      const crit = calculateCrit(params);
      const avg = calculateAverage(hit, crit, c.uiAffinity);
      return avg;
    },
  };
};
