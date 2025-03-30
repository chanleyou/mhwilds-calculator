import { produce } from "immer";
import { create } from "zustand";
import {
  ArtianElementUpgrade,
  ArtianTypeToGunlanceShellType,
  Buffs,
  CombinedBuffs,
  Sharpnesses,
} from "@/data";
import Attacks from "@/data/attacks";
import {
  GroupSkillsCombined,
  SeriesSkillsCombined,
  WeaponArmorSkills,
} from "@/data/skills";
import {
  calculateAffinity,
  calculateAttack,
  calculateAverage,
  calculateCrit,
  calculateElement,
  calculateHandicraft,
  calculateHit,
  calculateStatus,
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
  Sharpness,
  type SkillName,
  type Slots,
  Target,
  Weapon,
  WeaponSharpness,
  isElementType,
  isGunlance,
  isMeleeWeapon,
  isSkillGroup,
  isStatusType,
  isWeaponBowgun,
} from "@/types";
import { SwordAndShields } from "../data/weapons/SwordAndShields";

export type InitialBuilder = {
  w: Weapon;
  artian: Artian;
  otherBuffs: Record<string, Buff>;
  target: Target;
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
  disabled: Record<SkillName, boolean>;
  flags: Partial<Record<Flag, boolean>>;
  manualSkills: Record<SkillName, number>;
  manualSharpness?: Sharpness;
  uptime: Record<SkillName, number>;
};

const initialBuilder: InitialBuilder = {
  w: SwordAndShields[0],
  artian: { element: "No Element", infusions: [], upgrades: [] },
  otherBuffs: { Powercharm: Buffs.Powercharm.levels[0] },
  target: {
    wound: false,
    Slash: 80,
    Blunt: 80,
    Shot: 80,
    Fire: 30,
    Water: 30,
    Thunder: 30,
    Ice: 30,
    Dragon: 30,
  },
  weaponSlots: [],
  helmSlots: [],
  bodySlots: [],
  armsSlots: [],
  waistSlots: [],
  legsSlots: [],
  disabled: {},
  flags: {},
  manualSkills: {
    Ambush: 3,
    Agitator: 5,
    "Offensive Guard": 3,
  },
  uptime: {
    Ambush: 50,
    Agitator: 50,
    "Offensive Guard": 50,
  },
};

export type Builder = InitialBuilder & {
  reset: () => void;
  setW: (w: Weapon) => void;
  setArtianType: (type: ArtianType) => void;
  setArtianInfusion: (i: number, v?: ArtianInfusion) => void;
  setArtianUpgrade: (i: number, v?: ArtianUpgrade) => void;
  setOtherBuff: (id: string, buff?: Buff) => void;
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
  setDisabled: (s: SkillName, a: boolean) => void;
  setFlag: (f: Flag, a: boolean) => void;
  emptyBuffs: () => void;
  setTarget: (target: Target) => void;
  setTargetValue: (key: keyof Target, value: Target[keyof Target]) => void;
  setManualSkills: (s: SkillName, v?: number) => void;
  setManualSharpness: (s?: Sharpness) => void;
  setUptime: (s: SkillName, v: number) => void;
};

export const useBuild = create<Builder>((set, get) => ({
  ...initialBuilder,
  reset: () => set(initialBuilder),
  setW: (w: Weapon) => {
    set({
      w: w,
      weaponSlots: [],
      artian: initialBuilder.artian,
      otherBuffs: produce(get().otherBuffs, (d) => {
        Object.keys(d).forEach((k) => {
          if (!CombinedBuffs[k]?.weapons?.includes(w.type)) delete d[k];
        });
      }),
    });
  },
  setArtianType: (type: ArtianType) => {
    set(
      produce<InitialBuilder>((d) => {
        d.artian.element = type;
        if (type !== "No Element" && type !== undefined) return;
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
  setOtherBuff: (id, buff?) => {
    set(
      produce((d) => {
        if (buff) d.otherBuffs[id] = buff;
        else delete d.otherBuffs[id];
      }),
    );
  },
  setTarget: (target: Target) => set({ target }),
  setTargetValue: (key, value) =>
    set(produce((d) => void (d.target[key] = value))),
  setHelm: (helm?) => set({ helm, helmSlots: [] }),
  setWaist: (waist?) => set({ waist, waistSlots: [] }),
  setArms: (arms?) => set({ arms, armsSlots: [] }),
  setBody: (body?) => set({ body, bodySlots: [] }),
  setLegs: (legs?) => set({ legs, legsSlots: [] }),
  setCharm: (charm?: Charm) => set({ charm }),
  setWeaponDecoration: (i: number, dc?: Decoration) => {
    set(
      produce<InitialBuilder>((d) => {
        if (dc && d.w.slots[i] < dc.level) return;
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
  emptyBuffs: () => set({ otherBuffs: {} }),
  setManualSkills: (s, v) => {
    set(
      produce<Builder>((d) => {
        if (v) d.manualSkills[s] = v;
        else delete d.manualSkills[s];
      }),
    );
  },
  setManualSharpness: (s) => set({ manualSharpness: s }),
  setUptime: (s, v) => {
    set(
      produce<Builder>((d) => {
        if (v === 100) delete d.uptime[s];
        else d.uptime[s] = v;
      }),
    );
  },
}));

export const useComputed = () => {
  const {
    w,
    artian,
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
    target,
    manualSkills,
    manualSharpness,
    uptime,
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

  const skillPoints = {
    ...[w, ...equipment, ...decorations, charm].reduce<
      Record<SkillName, number>
    >((acc, i) => {
      if (!i) return acc;
      const { skills } = i;
      Object.entries(skills).forEach(([k, v]) => {
        acc[k] = acc[k] ? acc[k] + v : v;
      });
      return acc;
    }, {}),
    ...manualSkills,
  };

  const groupPoints = {
    ...equipment.reduce<Record<SkillName, number>>((acc, i) => {
      const { groupSkill, seriesSkill } = i;
      if (groupSkill) {
        acc[groupSkill] = acc[groupSkill] ? acc[groupSkill] + 1 : 1;
      }
      if (seriesSkill) {
        acc[seriesSkill] = acc[seriesSkill] ? acc[seriesSkill] + 1 : 1;
      }
      return acc;
    }, {}),
    ...manualSkills,
  };

  // Weapon & Armor Skills
  const buffs = Object.entries(skillPoints).reduce<Record<SkillName, Buff>>(
    (acc, [k, v]) => {
      if (disabled[k]) return acc;
      if (!WeaponArmorSkills[k]) return acc;

      const skill = WeaponArmorSkills[k];

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

  // Group Skills
  Object.entries(groupPoints).forEach(([k, v]) => {
    if (disabled[k]) return;

    if (GroupSkillsCombined[k] && v >= 3) {
      buffs[k] = GroupSkillsCombined[k].levels[3];
    }

    if (SeriesSkillsCombined[k]) {
      if (v >= 4) buffs[k] = SeriesSkillsCombined[k].levels[4];
      else if (v >= 2) buffs[k] = SeriesSkillsCombined[k].levels[2];
    }
  });

  // Frenzy
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
      if (manualSharpness) {
        const array = [0, 0, 0, 0, 0, 0, 0] as WeaponSharpness;
        const sharpnessIndex = Sharpnesses.indexOf(manualSharpness);
        array[sharpnessIndex] = 150;
        d.sharpness = array;
        d.handicraft = [50, 0, 0, 0];
      }

      d.sharpness = calculateHandicraft(
        d,
        Math.min(skillPoints["Handicraft"] ?? 0, 5),
      );
    }

    // Artian
    if (!d.artian) return;
    if (isGunlance(d) && artian.element) {
      d.shelling.type = ArtianTypeToGunlanceShellType[artian.element];
    }

    if (d.coatings) {
      d.coatings = [];
      if (
        artian.element === "Thunder" ||
        artian.element === "Dragon" ||
        artian.element === "Blast"
      ) {
        d.coatings.push("Power");
      } else if (
        artian.element === "Ice" ||
        artian.element === "Paralysis" ||
        artian.element === "Poison"
      ) {
        d.coatings.push("Pierce");
      } else if (
        artian.element === "No Element" ||
        artian.element === "Water" ||
        artian.element === "Fire" ||
        artian.element === "Sleep"
      ) {
        d.coatings.push("Close-range");
      }

      if (isStatusType(artian.element)) d.coatings.push(artian.element);
    }

    if (isWeaponBowgun(d)) {
      const rapidFire = d.type === "Light Bowgun" ? true : undefined;
      if (artian.element === "Dragon") {
        d.ammo.Flaming = { levels: [1, 2], rapidFire };
        d.ammo.Dragon = { levels: [1], rapidFire };
      } else if (artian.element === "Blast") {
        d.ammo.Flaming = { levels: [1, 2], rapidFire };
        d.ammo.Sticky = { levels: [1] };
      } else if (artian.element === "Fire") {
        d.ammo.Flaming = { levels: [1, 2], rapidFire };
      } else if (artian.element === "Ice" || artian.element === "Sleep") {
        d.ammo.Freeze = { levels: [1, 2], rapidFire };
      } else if (
        artian.element === "Thunder" ||
        artian.element === "Paralysis"
      ) {
        d.ammo.Thunder = { levels: [1, 2], rapidFire };
      } else if (artian.element === "Water" || artian.element === "Poison") {
        d.ammo.Water = { levels: [1, 2], rapidFire };
      }
    }

    if (isElementType(artian.element)) {
      if (d.type === "Hunting Horn") {
        d.songs = [
          "Elem Attack Boost",
          "Blight Negated",
          "Sonic Waves",
          "Restore Sharpness",
          `Echo Wave (${artian.element})`,
          "Resounding Melody",
        ];
      }
      if (d.type === "Switch Axe" || d.type === "Charge Blade") {
        d.phial = "Element";
      }
      if (!isWeaponBowgun(d)) {
        d.element = { type: artian.element, value: d.artian.element };
      }
    } else if (isStatusType(artian.element)) {
      if (d.type === "Hunting Horn") {
        d.songs = [
          "Status Attack Up",
          "Divine Protection",
          "All Ailments Negated",
          `Echo Wave (${artian.element})`,
          "Offset Melody",
        ];
      }
      if (d.type === "Switch Axe") d.phial = "Power";
      if (artian.element === "Blast" && d.type === "Bow") {
        d.status = { type: artian.element, value: 80 };
      } else {
        d.status = { type: artian.element, value: d.artian.status };
      }
    }

    [...artian.infusions, ...artian.upgrades].forEach((i) => {
      if (i === "Attack") d.attack += 5;
      if (i === "Affinity") d.affinity += 5;

      if (i === "Element" && d.element) {
        d.element.value += ArtianElementUpgrade[d.type];
      }

      if (i === "Element" && d.status) {
        d.status.value += ArtianElementUpgrade[d.type];
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
    affinity: weapon.affinity,
    buffs,
    target,
    rawType: Attacks[weapon.type][0].rawType ?? "Slash",
  });

  const uiAttack = calculateAttack(weapon.attack, buffs);
  const uiElement = weapon.element
    ? calculateElement(weapon.element.value, weapon.element.type, buffs)
    : 0;
  const uiStatus = weapon.status
    ? calculateStatus(weapon.status.value, weapon.status.type, buffs)
    : 0;

  const critMulti =
    uiAffinity >= 0 ? (buffs["Critical Boost"]?.criticalBoost ?? 1.25) : 0.75;
  const eleCritMulti =
    uiAffinity >= 0 ? (buffs["Critical Element"]?.criticalElement ?? 1) : 1;

  // Uptime Binary Tree
  type Node = {
    keys: SkillName[];
    weight: number;
    left?: Node;
    right?: Node;
  };

  const entries = Object.entries(uptime);

  const node = (
    i: number = 0,
    keys: SkillName[] = [],
    weight: number = 100,
  ): Node => {
    if (!entries[i]) return { keys, weight };

    const left = node(
      i + 1,
      [...keys, entries[i][0]],
      (weight * entries[i][1]) / 100,
    );
    const right = node(i + 1, keys, weight - left.weight);

    return { keys, weight, left, right };
  };

  const head = node(0);
  const weights: [string[], number][] = [];

  const weight = (node: Node) => {
    if (!node.left && !node.right) weights.push([node.keys, node.weight]);
    if (node.left) weight(node.left);
    if (node.right) weight(node.right);
  };

  weight(head);

  const calcHit = (atk: Attack, targetOverride?: Partial<Target>) => {
    return calculateHit(weapon, buffs, atk, {
      ...target,
      ...targetOverride,
    });
  };

  const calcCrit = (atk: Attack, targetOverride?: Partial<Target>) => {
    return calculateCrit(
      weapon,
      buffs,
      atk,
      { ...target, ...targetOverride },
      critMulti,
      eleCritMulti,
    );
  };

  const calcAverage = (atk: Attack, targetOverride?: Partial<Target>) => {
    const hit = calcHit(atk, targetOverride);
    const crit = calcCrit(atk, targetOverride);
    const affinity = atk.cantCrit
      ? 0
      : calculateAffinity({
          affinity: weapon.affinity,
          buffs,
          target,
          rawType: atk.rawType ?? "Slash",
        });
    return calculateAverage(hit, crit, affinity);
  };

  const effectiveRaw = calcAverage({
    name: "EFR",
    mv: 100,
    eleMul: 0,
    ignoreHzv: true,
  });
  const effectiveEle = calcAverage(
    { name: "EFE", mv: 0 },
    {
      Fire: 100,
      Ice: 100,
      Thunder: 100,
      Dragon: 100,
      Water: 100,
    },
  );

  // TODO: separate these into slices
  return {
    weapon,
    skillPoints,
    groupPoints,
    buffs,
    uiAttack,
    uiElement,
    uiStatus,
    uiAffinity,
    critMulti,
    eleCritMulti,
    calcHit,
    calcCrit,
    calcAverage,
    effectiveRaw,
    effectiveEle,
    head,
    weights,
  };
};
