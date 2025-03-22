import { produce } from "immer";
import { create } from "zustand";
import { Buffs, CombinedBuffs } from "@/data";
import {
  CombinedSkillsTwo,
  GroupAndSeriesSkills,
  SeriesSkillsTwo,
  UnsupportedArmorSkills,
} from "@/data/skills";
import {
  type Armor,
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
  buffs: Record<string, Buff>;
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
  buffs: { Powercharm: Buffs.Powercharm.levels[0] },
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
  setBuff: (id: string, buff?: Buff) => void;
  setRawHzv: (rawHzv: number) => void;
  setEleHzv: (eleHzv: number) => void;
  setIsWound: (isWound: boolean) => void;
  setWeaponSkill: (s: Skill, n?: number) => void;
  setHelm: (helm: Armor) => void;
  setWaist: (waist: Armor) => void;
  setArms: (arms: Armor) => void;
  setBody: (body: Armor) => void;
  setLegs: (legs: Armor) => void;
  setCharm: (charm: Charm) => void;
  setHelmDecoration: (d: Decoration, i: number) => void;
  setBodyDecoration: (d: Decoration, i: number) => void;
  setArmsDecoration: (d: Decoration, i: number) => void;
  setWaistDecoration: (d: Decoration, i: number) => void;
  setLegsDecoration: (d: Decoration, i: number) => void;
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
              delete d.buffs[key];
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
  setBuff: (id: string, buff?: Buff) => {
    set(
      produce((d) => {
        if (buff) d.buffs[id] = buff;
        else delete d.buffs[id];
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
  setHelm: (helm: Armor) => set({ helm }),
  setWaist: (waist: Armor) => set({ waist }),
  setArms: (arms: Armor) => set({ arms }),
  setBody: (body: Armor) => set({ body }),
  setLegs: (legs: Armor) => set({ legs }),
  setCharm: (charm: Charm) => set({ charm }),
  setHelmDecoration: (dc, i) => {
    set(produce((d) => void (d.helmSlots[i] = dc)));
  },
  setBodyDecoration: (dc, i) => {
    set(produce((d) => void (d.bodySlots[i] = dc)));
  },
  setArmsDecoration: (dc, i) => {
    set(produce((d) => void (d.armsSlots[i] = dc)));
  },
  setWaistDecoration: (dc, i) => {
    set(produce((d) => void (d.waistSlots[i] = dc)));
  },
  setLegsDecoration: (dc, i) => {
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
    buffs,
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

  const effectiveBuffs = Object.entries(skillPoints).reduce<
    Record<Skill, Buff>
  >(
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
    { ...buffs },
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

  return {
    weapon,
    weaponSkills,
    armor,
    decorations,
    skillPoints,
    groupPoints,
    effectiveBuffs,
    disabled,
  };
};
