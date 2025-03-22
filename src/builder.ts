import { produce } from "immer";
import { create } from "zustand";
import type {
  Armor,
  Buff,
  BuffGroup,
  Decoration,
  Skill,
  SkillGroup,
  Slots,
  Weapon,
  WeaponSkillGroup,
} from "@/types";

export type InitialBuilder = {
  weapon: Weapon;
  helm?: Armor;
  body?: Armor;
  arms?: Armor;
  waist?: Armor;
  legs?: Armor;
  helmSlots: Slots;
  bodySlots: Slots;
  armsSlots: Slots;
  waistSlots: Slots;
  legsSlots: Slots;
  disabled: Record<Skill, boolean>;
};

const initialBuilder: InitialBuilder = {
  weapon: "Sword and Shield",
  helmSlots: [],
  bodySlots: [],
  armsSlots: [],
  waistSlots: [],
  legsSlots: [],
  disabled: {},
};

export type Builder = InitialBuilder & {
  reset: () => void;
  setHelm: (helm: Armor) => void;
  setWaist: (waist: Armor) => void;
  setArms: (arms: Armor) => void;
  setBody: (body: Armor) => void;
  setLegs: (legs: Armor) => void;
  setHelmDecoration: (d: Decoration, i: number) => void;
  setBodyDecoration: (d: Decoration, i: number) => void;
  setArmsDecoration: (d: Decoration, i: number) => void;
  setWaistDecoration: (d: Decoration, i: number) => void;
  setLegsDecoration: (d: Decoration, i: number) => void;
  setDisabled: (s: Skill, a: boolean) => void;
};

export const useBuilder = create<Builder>((set) => ({
  ...initialBuilder,
  reset: () => set(initialBuilder),
  setHelm: (helm: Armor) => set({ helm }),
  setWaist: (waist: Armor) => set({ waist }),
  setArms: (arms: Armor) => set({ arms }),
  setBody: (body: Armor) => set({ body }),
  setLegs: (legs: Armor) => set({ legs }),
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
    set(produce((d) => void (d.toggles[s] = a)));
  },
}));

const ArmorSkills: Record<Skill, SkillGroup | WeaponSkillGroup> = {
  ["Adrenaline Rush"]: {
    toggle: true,
    levels: {
      1: { name: "Adrenaline Rush 1", attack: 10 },
      2: { name: "Adrenaline Rush 2", attack: 15 },
      3: { name: "Adrenaline Rush 3", attack: 20 },
      4: { name: "Adrenaline Rush 4", attack: 25 },
      5: { name: "Adrenaline Rush 5", attack: 30 },
    },
  },
  ["Coalescence"]: {
    toggle: true,
    groups: [
      {
        weapons: [
          "Long Sword",
          "Dual Blades",
          "Sword and Shield",
          "Lance",
          "Insect Glaive",
          "Bow",
        ],
        levels: {
          1: { name: "Coalescence 1", elementMul: 1.05 },
          2: { name: "Coalescence 2", elementMul: 1.1 },
          3: { name: "Coalescence 3", elementMul: 1.15 },
        },
      },
      {
        weapons: [
          "Great Sword",
          "Hammer",
          "Hunting Horn",
          "Gunlance",
          "Switch Axe",
          "Charge Blade",
          "Light Bowgun",
          "Heavy Bowgun",
        ],
        levels: {
          1: { name: "Coalescence 1", elementMul: 1.1 },
          2: { name: "Coalescence 2", elementMul: 1.2 },
          3: { name: "Coalescence 3", elementMul: 1.3 },
        },
      },
    ],
  },
};

const GroupSkills: Record<Skill, SkillGroup> = {
  ["Gore Magala's Tyranny"]: {
    levels: {
      2: { name: "Black Eclipse I" },
      4: {
        name: "Black Eclipse II",
        attack: 10,
        frenzy: { attack: 5 },
      },
    },
  },
};

const isSkillGroup = (s: SkillGroup | WeaponSkillGroup): s is SkillGroup => {
  return "levels" in s;
};

export const useBuild = () => {
  const {
    weapon,
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
    setHelmDecoration,
    setBodyDecoration,
    setArmsDecoration,
    setWaistDecoration,
    setLegsDecoration,
    disabled,
  } = useBuilder();

  const armor = [helm, body, arms, waist, legs].filter((n): n is Armor => !!n);

  const decorations = [helmSlots, bodySlots, armsSlots, waistSlots, legsSlots]
    .flat()
    .filter((n): n is Decoration => !!n);

  const skillPoints = [...decorations, ...armor].reduce<Record<Skill, number>>(
    (acc, i) => {
      const { skills } = i;
      Object.entries(skills).forEach(([k, v]) => {
        acc[k] = acc[k] ? acc[k] + v : v;
      });
      return acc;
    },
    {},
  );

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

  const buffs = Object.entries(skillPoints).reduce<Buff[]>((acc, [k, v]) => {
    if (disabled[k] === false) return acc;
    if (!ArmorSkills[k]) return acc;

    const skill = ArmorSkills[k];

    if (isSkillGroup(skill)) {
      const maxLevel = Object.values(skill.levels).length;
      v = Math.min(maxLevel, v);
      acc.push(skill.levels[v]);
    } else {
      const group = skill.groups.find((grp) => grp.weapons.includes(weapon));
      if (group) {
        const maxLevel = Object.values(group.levels).length;
        v = Math.min(maxLevel, v);
        acc.push(group.levels[v]);
      }
    }

    return acc;
  }, []);

  Object.entries(groupPoints).forEach(([k, v]) => {
    if (disabled[k]) return;
    if (!GroupSkills[k]) return;

    const { levels } = GroupSkills[k];

    for (let i = v; i > 0; i--) {
      if (!levels[v]) continue;
      buffs.push(levels[v]);
      break;
    }
  });

  return { weapon, armor, decorations, skillPoints, groupPoints, buffs };
};
