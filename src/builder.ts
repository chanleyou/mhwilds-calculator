import { produce } from "immer";
import { create } from "zustand";
import { Buffs } from "@/data";
import {
  CombinedSkillsTwo,
  GroupAndSeriesSkills,
  UnsupportedArmorSkills,
} from "@/data/skills";
import {
  calculateAffinity,
  calculateAttackTwo,
  calculateAverage,
  calculateCritTwo,
  calculateElementTwo,
  calculateHitTwo,
} from "@/model";
import {
  type Armor,
  Attack,
  type Buff,
  type Charm,
  type Decoration,
  Flag,
  type Skill,
  type Slots,
  Weapon,
  isSkillGroup,
} from "@/types";
import { SwordAndShields } from "./data/weapons/SwordAndShields";

export type InitialBuilder = {
  weapon: Weapon;
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
  weaponSlots: Slots;
  helmSlots: Slots;
  bodySlots: Slots;
  armsSlots: Slots;
  waistSlots: Slots;
  legsSlots: Slots;
  disabled: Record<Skill, boolean>;
  flags: Partial<Record<Flag, boolean>>;
};

const initialBuilder: InitialBuilder = {
  weapon: SwordAndShields[0],
  otherBuffs: { Powercharm: Buffs.Powercharm.levels[0] },
  rawHzv: 80,
  eleHzv: 30,
  isWound: false,
  weaponSkills: {},
  weaponSlots: [],
  helmSlots: [],
  bodySlots: [],
  armsSlots: [],
  waistSlots: [],
  legsSlots: [],
  disabled: {},
  flags: {},
};

export type Builder = InitialBuilder & {
  reset: () => void;
  setW: (w: Weapon) => void;
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
  setWeaponDecoration: (i: number, d?: Decoration) => void;
  setHelmDecoration: (i: number, d?: Decoration) => void;
  setBodyDecoration: (i: number, d?: Decoration) => void;
  setArmsDecoration: (i: number, d?: Decoration) => void;
  setWaistDecoration: (i: number, d?: Decoration) => void;
  setLegsDecoration: (i: number, d?: Decoration) => void;
  setDisabled: (s: Skill, a: boolean) => void;
  setFlag: (f: Flag, a: boolean) => void;
};

export const useBuild = create<Builder>((set) => ({
  ...initialBuilder,
  reset: () => set(initialBuilder),
  setW: (w: Weapon) => set({ weapon: w }),
  setRawHzv: (rawHzv) => set({ rawHzv }),
  setEleHzv: (eleHzv) => set({ eleHzv }),
  setOtherBuff: (id, buff?) => {
    set(
      produce((d) => {
        if (buff) d.otherBuffs[id] = buff;
        else delete d.otherBuffs[id];
      }),
    );
  },
  setIsWound: (isWound) => set({ isWound }),
  setWeaponSkill: (s, n) =>
    set(
      produce((d) => {
        if (n) d.weaponSkills[s] = n;
        else delete d.weaponSkills[s];
      }),
    ),
  setHelm: (helm?) => set({ helm, helmSlots: [] }),
  setWaist: (waist?) => set({ waist, waistSlots: [] }),
  setArms: (arms?) => set({ arms, armsSlots: [] }),
  setBody: (body?) => set({ body, bodySlots: [] }),
  setLegs: (legs?) => set({ legs, legsSlots: [] }),
  setCharm: (charm?: Charm) => set({ charm }),
  setWeaponDecoration: (i, dc) => {
    set(produce((d) => void (d.weaponSlots[i] = dc)));
  },
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
  setFlag: (f, a) => {
    set(
      produce((d) => {
        if (a) d.flags[f] = a;
        else delete d.flags[f];
      }),
    );
  },
}));

export const useComputed = () => {
  const {
    weapon,
    rawHzv,
    eleHzv,
    isWound,
    otherBuffs,
    helm,
    body,
    arms,
    waist,
    legs,
    charm,
    weaponSlots,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
    disabled,
    flags,
  } = useBuild();

  const equipment = [helm, body, arms, waist, legs].filter(
    (n): n is Armor => !!n,
  );

  const decorations = [
    weaponSlots,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
  ]
    .flat()
    .filter((n): n is Decoration => !!n);

  const skillPoints = [weapon, ...equipment, ...decorations, charm].reduce<
    Record<Skill, number>
  >((acc, i) => {
    if (!i) return acc;
    const { skills } = i;
    Object.entries(skills).forEach(([k, v]) => {
      acc[k] = acc[k] ? acc[k] + v : v;
    });
    return acc;
  }, {});

  const groupPoints = equipment.reduce<Record<Skill, number>>((acc, i) => {
    const { groupSkill, seriesSkill } = i;
    if (groupSkill) {
      acc[groupSkill] = acc[groupSkill] ? acc[groupSkill] + 1 : 1;
    }
    if (seriesSkill) {
      console.log(seriesSkill, acc[seriesSkill]);
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
        const group = skill.groups.find((g) => {
          return g.weapons.includes(weapon.type);
        });
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
      console.log(k, v, levels);
      buffs[k] = levels[v];
      break;
    }
  });

  const frenzy = buffs.Frenzy !== undefined;

  if (frenzy) {
    Object.entries(buffs).forEach(([k, v]) => {
      if (!v.frenzy) return;
      buffs["Frenzy" + k] = v.frenzy;
    });
  }

  // Tetrad Shot
  const tetradBuff = buffs["Tetrad Shot"]?.tetrad;

  const tetradAffinityBuff = tetradBuff
    ? { affinity: tetradBuff.affinity }
    : {};
  const tetradAttackBuff = tetradBuff ? { ...tetradBuff, affinity: 0 } : {};

  if (tetradBuff) {
    if (flags.TetradAffinity) buffs["Tetrad Affinity"] = tetradAffinityBuff;
    if (flags.TetradAttack) buffs["Tetrad Attack"] = tetradAttackBuff;
  }

  const uiAffinity = calculateAffinity({
    affinity: weapon.affinity ?? 0,
    buffs,
    rawHzv,
    isWound,
  });

  const uiAttack = calculateAttackTwo(weapon.attack, buffs);
  const uiElement = calculateElementTwo(weapon.element, buffs);

  const critMulti = buffs["Critical Boost"]?.criticalBoost ?? 1.25;
  const eleCritMulti = buffs["Critical Element"]?.criticalElement ?? 1;

  const calcHit = (atk: Attack) => {
    return calculateHitTwo(weapon, buffs, atk, rawHzv, eleHzv);
  };

  const calcCrit = (atk: Attack) => {
    return calculateCritTwo(
      weapon,
      buffs,
      atk,
      rawHzv,
      eleHzv,
      critMulti,
      eleCritMulti,
    );
  };

  const calcAverage = (atk: Attack) => {
    const hit = calcHit(atk);
    const crit = calcCrit(atk);
    return calculateAverage(hit, crit, atk.cantCrit ? 0 : uiAffinity);
  };

  const effectiveRaw = calcAverage({ mv: 100, eleMul: 0 });
  const effectiveEle = calcAverage({ mv: 0, eleMul: 100 });

  return {
    skillPoints,
    groupPoints,
    buffs,
    uiAttack,
    uiElement,
    uiAffinity,
    critMulti: uiAffinity >= 0 ? critMulti : 0.75,
    eleCritMulti: uiAffinity >= 0 ? eleCritMulti : 1,
    calcHit,
    calcCrit,
    calcAverage,
    effectiveRaw,
    effectiveEle,
  };
};
