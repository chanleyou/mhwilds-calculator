import { produce } from "immer";
import { create } from "zustand";
import { ArtianTypeToGunlanceShellType, Buffs, Sharpnesses } from "@/data";
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
  calculateHandicraft,
  calculateHitTwo,
} from "@/model";
import {
  type Armor,
  Artian,
  ArtianInfusion,
  ArtianType,
  ArtianUpgrade,
  Attack,
  type Buff,
  type Charm,
  type Decoration,
  Flag,
  type Skill,
  type Slots,
  Weapon,
  isElementType,
  isGunlance,
  isMeleeWeapon,
  isSkillGroup,
  isStatusType,
} from "@/types";
import { SwordAndShields } from "./data/weapons/SwordAndShields";

export type InitialBuilder = {
  weapon: Weapon;
  artian: Artian;
  otherBuffs: Record<string, Buff>;
  rawHzv: number;
  eleHzv: number;
  isWound: boolean;
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
  artian: { type: undefined, infusions: [], upgrades: [] },
  otherBuffs: { Powercharm: Buffs.Powercharm.levels[0] },
  rawHzv: 80,
  eleHzv: 30,
  isWound: false,
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
  setArtianType: (type?: ArtianType) => void;
  setArtianInfusion: (i: number, v?: ArtianInfusion) => void;
  setArtianUpgrade: (i: number, v?: ArtianUpgrade) => void;
  setOtherBuff: (id: string, buff?: Buff) => void;
  setRawHzv: (rawHzv: number) => void;
  setEleHzv: (eleHzv: number) => void;
  setIsWound: (isWound: boolean) => void;
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
  setW: (w: Weapon) =>
    set({ weapon: w, weaponSlots: [], artian: initialBuilder.artian }),
  setArtianType: (type?: ArtianType) => {
    set(
      produce<InitialBuilder>((d) => {
        d.artian.type = type;
        if (type !== "Non-Element" && type !== undefined) return;
        d.artian.upgrades.forEach((u, i) => {
          if (u === "Element") {
            d.artian.upgrades[i] = undefined;
          }
        });
      }),
    );
  },
  setArtianInfusion: (i: number, v?: ArtianInfusion) => {
    set(produce((d) => void (d.artian.infusions[i] = v)));
  },
  setArtianUpgrade: (i: number, v?: ArtianUpgrade) => {
    set(produce((d) => void (d.artian.upgrades[i] = v)));
  },
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
  setHelm: (helm?) => set({ helm, helmSlots: [] }),
  setWaist: (waist?) => set({ waist, waistSlots: [] }),
  setArms: (arms?) => set({ arms, armsSlots: [] }),
  setBody: (body?) => set({ body, bodySlots: [] }),
  setLegs: (legs?) => set({ legs, legsSlots: [] }),
  setCharm: (charm?: Charm) => set({ charm }),
  setWeaponDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (dc && d.weapon.slots[i] < dc.level) return;
        d.weaponSlots[i] = dc;
      }),
    );
  },
  setHelmDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (!d.helm) return;
        if (dc && d.helm.slots[i] < dc.level) return;
        d.helmSlots[i] = dc;
      }),
    );
  },
  setBodyDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (!d.body) return;
        if (dc && d.body.slots[i] < dc.level) return;
        d.bodySlots[i] = dc;
      }),
    );
  },
  setArmsDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (!d.arms) return;
        if (dc && d.arms.slots[i] < dc.level) return;
        d.armsSlots[i] = dc;
      }),
    );
  },
  setWaistDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (!d.waist) return;
        if (dc && d.waist.slots[i] < dc.level) return;
        d.waistSlots[i] = dc;
      }),
    );
  },
  setLegsDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (!d.legs) return;
        if (dc && d.legs.slots[i] < dc.level) return;
        d.legsSlots[i] = dc;
      }),
    );
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
    weapon: w,
    artian,
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
  } = useBuild.getState();

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

  const skillPoints = [w, ...equipment, ...decorations, charm].reduce<
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
          return g.weapons.includes(w.type);
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
      if (!levels[i]) continue;
      buffs[k] = levels[i];
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

  const weapon = produce(w, (d) => {
    // Handicraft
    if (isMeleeWeapon(d)) {
      d.sharpness = calculateHandicraft(
        d,
        Math.min(skillPoints["Handicraft"] ?? 0, 5),
      );
    }

    // Artian
    if (!d.artian) return;
    if (isGunlance(d) && artian.type) {
      d.shelling.type = ArtianTypeToGunlanceShellType[artian.type];
    }

    if (isElementType(artian.type)) {
      if (d.type === "Switch Axe" || d.type === "Charge Blade") {
        d.phial = "Element";
      }
      d.element = { type: artian.type, value: d.artian.element };
    } else if (isStatusType(artian.type)) {
      if (d.type === "Switch Axe") d.phial = "Power";
      d.status = { type: artian.type, value: d.artian.status };
    }

    [...artian.infusions, ...artian.upgrades].forEach((i) => {
      if (i === "Attack") d.attack += 5;
      if (i === "Affinity") d.affinity += 5;

      // TODO: refactor
      if (i === "Element" && d.element) {
        if (d.type === "Great Sword") d.element.value += 80;
        if (d.type === "Lance") d.element.value += 50;
        if (d.type === "Charge Blade") d.element.value += 50;
        if (d.type === "Long Sword") d.element.value += 50;
        if (d.type === "Hammer") d.element.value += 50;
        if (d.type === "Gunlance") d.element.value += 50;
        if (d.type === "Hunting Horn") d.element.value += 50;
        if (d.type === "Sword and Shield") d.element.value += 30;
        if (d.type === "Switch Axe") d.element.value += 30;
        if (d.type === "Insect Glaive") d.element.value += 30;
        if (d.type === "Bow") d.element.value += 30;
        if (d.type === "Dual Blades") d.element.value += 20;
      }

      if (i === "Element" && d.status) {
        if (d.type === "Great Sword") d.status.value += 80;
        if (d.type === "Lance") d.status.value += 50;
        if (d.type === "Charge Blade") d.status.value += 50;
        if (d.type === "Long Sword") d.status.value += 50;
        if (d.type === "Hammer") d.status.value += 50;
        if (d.type === "Gunlance") d.status.value += 50;
        if (d.type === "Hunting Horn") d.status.value += 50;
        if (d.type === "Sword and Shield") d.status.value += 30;
        if (d.type === "Switch Axe") d.status.value += 30;
        if (d.type === "Insect Glaive") d.status.value += 30;
        if (d.type === "Bow") d.status.value += 30;
        if (d.type === "Dual Blades") d.status.value += 20;
      }

      if (i === "Sharpness" && d.sharpness) {
        d.sharpness[Sharpnesses.indexOf("White")] += 30;
      }
    });
  });

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
  const uiElement = weapon.element
    ? calculateElementTwo(weapon.element.value, weapon.element.type, buffs)
    : 0;

  const critMulti = buffs["Critical Boost"]?.criticalBoost ?? 1.25;
  const eleCritMulti = buffs["Critical Element"]?.criticalElement ?? 1;

  const calcHit = (atk: Attack, eleHzvOverride?: number) => {
    return calculateHitTwo(
      weapon,
      buffs,
      atk,
      rawHzv,
      eleHzvOverride ?? eleHzv,
    );
  };

  const calcCrit = (atk: Attack, eleHzvOverride?: number) => {
    return calculateCritTwo(
      weapon,
      buffs,
      atk,
      rawHzv,
      eleHzvOverride ?? eleHzv,
      critMulti,
      eleCritMulti,
    );
  };

  const calcAverage = (atk: Attack, eleHzvOverride?: number) => {
    const hit = calcHit(atk, eleHzvOverride);
    const crit = calcCrit(atk, eleHzvOverride);
    return calculateAverage(hit, crit, atk.cantCrit ? 0 : uiAffinity);
  };

  const effectiveRaw = calcAverage({ mv: 100, eleMul: 0, ignoreHzv: true });
  const effectiveEle = calcAverage({ mv: 0 }, 100);

  return {
    weapon,
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
