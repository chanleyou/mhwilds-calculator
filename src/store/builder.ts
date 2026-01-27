import { useMemo } from "react";
import { produce } from "immer";
import { create } from "zustand";
import {
  ArtianElementUpgrade,
  ArtianTypeToGunlanceShellType,
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
  dmg,
  round,
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
  CustomCharm,
  type Decoration,
  Flag,
  Gogmazios,
  GogmaziosFocus,
  GogmaziosReinforcement,
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
  gogmazios: Gogmazios;
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
  charmSlots: Slots;
  disabled: Record<SkillName, boolean>;
  flags: Partial<Record<Flag, boolean>>;
  manualSkills: Record<SkillName, number>;
  uptime: Record<SkillName, number>;
  manualSharpness?: Sharpness;
  charmSkills: CustomCharm;
};

const initialBuilder: InitialBuilder = {
  w: SwordAndShields[0],
  artian: { element: "No Element", infusions: [], upgrades: [] },
  gogmazios: { focus: "Attack", element: "No Element", infusions: [], reinforcements: [], groupSkills: [] },
  otherBuffs: {
    Powercharm: CombinedBuffs.Powercharm.levels[0],
  },
  helm: undefined,
  body: undefined,
  arms: undefined,
  waist: undefined,
  legs: undefined,
  charm: undefined,
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
  charmSlots: [],
  disabled: {},
  flags: {},
  manualSkills: {},
  uptime: {},
  manualSharpness: undefined,
  charmSkills: [],
};

export type Builder = InitialBuilder & {
  reset: () => void;
  setW: (w: Weapon) => void;
  setArtianType: (type: ArtianType) => void;
  setArtianInfusion: (i: number, v?: ArtianInfusion) => void;
  setArtianUpgrade: (i: number, v?: ArtianUpgrade) => void;
  setGogmaziosFocus: (focus: GogmaziosFocus) => void;
  setGogmaziosType: (type: ArtianType) => void;
  setGogmaziosInfusion: (i: number, v?: ArtianInfusion) => void;
  setGogmaziosReinforcement: (i: number, v?: GogmaziosReinforcement) => void;
  setGogmaziosGroupSkill: (i: number, v?: SkillName) => void;
  setOtherBuff: (id: string, buff?: Buff) => void;
  setHelm: (helm?: Armor) => void;
  setWaist: (waist?: Armor) => void;
  setArms: (arms?: Armor) => void;
  setBody: (body?: Armor) => void;
  setLegs: (legs?: Armor) => void;
  setCharm: (charm?: Charm) => void;
  setWeaponDecoration: (i: number) => (d?: Decoration) => void;
  setHelmDecoration: (i: number) => (d?: Decoration) => void;
  setBodyDecoration: (i: number) => (d?: Decoration) => void;
  setArmsDecoration: (i: number) => (d?: Decoration) => void;
  setWaistDecoration: (i: number) => (d?: Decoration) => void;
  setLegsDecoration: (i: number) => (d?: Decoration) => void;
  setCharmDecoration: (i: number) => (d?: Decoration) => void;
  setDisabled: (s: SkillName, a: boolean) => void;
  setFlag: (f: Flag, a: boolean) => void;
  emptyBuffs: () => void;
  setTarget: (target: Target) => void;
  setTargetValue: (key: keyof Target, value: Target[keyof Target]) => void;
  setManualSkills: (s: SkillName, v?: number) => void;
  setUptime: (s: SkillName, v: number) => void;
  setUptimes: (s: Record<SkillName, number>) => void;
  setManualSharpness: (s?: Sharpness) => void;
  setCharmSkill: (i: number) => (v?: [SkillName, number]) => void;
};

export const useBuild = create<Builder>((set, get) => {
  // Fixed prod helper to work as intended
  const prod = (fn: (d: InitialBuilder) => void) => set(produce(fn));

  return {
    ...initialBuilder,
    reset: () => {
      set({ ...initialBuilder });
    },
    setW: (w: Weapon) => {
      set({
        w: w,
        weaponSlots: [],
        artian: initialBuilder.artian,
        gogmazios: initialBuilder.gogmazios,
        otherBuffs: produce(get().otherBuffs, (d) => {
          Object.keys(d).forEach((k) => {
            if (
              CombinedBuffs[k]?.weapons &&
              !CombinedBuffs[k]?.weapons.includes(w.type)
            )
              delete d[k];
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
      prod((d) => void (d.artian.infusions[i] = v));
    },
    setArtianUpgrade: (i: number, v?: ArtianUpgrade) => {
      prod((d) => void (d.artian.upgrades[i] = v));
    },
    setGogmaziosFocus: (focus: GogmaziosFocus) => {
      prod((d) => void (d.gogmazios.focus = focus));
    },
    setGogmaziosType: (type: ArtianType) => {
      set(
        produce<InitialBuilder>((d) => {
          d.gogmazios.element = type;
          if (type !== "No Element" && type !== undefined) return;
          d.gogmazios.reinforcements.forEach((u, i) => {
            if (u?.type === "Element") {
              d.gogmazios.reinforcements[i] = undefined;
            }
          });
        }),
      );
    },
    setGogmaziosInfusion: (i: number, v?: ArtianInfusion) => {
      prod((d) => void (d.gogmazios.infusions[i] = v));
    },
    setGogmaziosReinforcement: (i: number, v?: GogmaziosReinforcement) => {
      prod((d) => void (d.gogmazios.reinforcements[i] = v));
    },
    setGogmaziosGroupSkill: (i: number, v?: SkillName) => {
      prod((d) => void (d.gogmazios.groupSkills[i] = v));
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
    setCharm: () => {},
    // setCharm: (charm?: Charm) => set({ charm }),
    setWeaponDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        if (dc && d.w.slots[i] < dc.level) return;
        d.weaponSlots[i] = dc;
      });
    },
    setHelmDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        if (!d.helm) return;
        if (dc && d.helm.slots[i] < dc.level) return;
        d.helmSlots[i] = dc;
      });
    },
    setBodyDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        if (!d.body) return;
        if (dc && d.body.slots[i] < dc.level) return;
        d.bodySlots[i] = dc;
      });
    },
    setArmsDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        if (!d.arms) return;
        if (dc && d.arms.slots[i] < dc.level) return;
        d.armsSlots[i] = dc;
      });
    },
    setWaistDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        if (!d.waist) return;
        if (dc && d.waist.slots[i] < dc.level) return;
        d.waistSlots[i] = dc;
      });
    },
    setLegsDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        if (!d.legs) return;
        if (dc && d.legs.slots[i] < dc.level) return;
        d.legsSlots[i] = dc;
      });
    },
    setCharmDecoration: (i: number) => (dc?: Decoration) => {
      prod((d) => {
        // if (!d.charm) return;
        // if (dc && d.charm.slots[i] < dc.level) return;
        d.charmSlots[i] = dc;
      });
    },
    setDisabled: (s, a) => {
      prod((d) => {
        if (a) d.disabled[s] = a;
        else delete d.disabled[s];
      });
    },
    setFlag: (f, a) => {
      prod((d) => {
        if (a) d.flags[f] = a;
        else delete d.flags[f];
      });
    },
    emptyBuffs: () => set({ otherBuffs: {} }),
    setManualSkills: (s, v) => {
      prod((d) => {
        if (v) d.manualSkills[s] = v;
        else delete d.manualSkills[s];
      });
    },
    setUptime: (s, v) => {
      prod((d) => {
        d.uptime[s] = v;
      });
    },
    setUptimes: (uptime) => set({ uptime }),
    setManualSharpness: (s) => set({ manualSharpness: s }),
    setCharmSkill: (i) => (v) => {
      prod((d) => {
        if (v) d.charmSkills[i] = v;
        else delete d.charmSkills[i];
      });
    },
  };
});

export const useComputed = () => {
  const {
    w,
    artian,
    gogmazios,
    otherBuffs,
    helm,
    body,
    arms,
    waist,
    legs,
    weaponSlots,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
    charmSlots,
    disabled,
    flags,
    target,
    manualSkills,
    uptime,
    manualSharpness,
    charmSkills,
  } = useBuild();

  return useMemo(() => {
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
    charmSlots,
  ]
    .flat()
    .filter((n): n is Decoration => !!n);

  const transformedCharms = charmSkills
    .filter((n) => !!n)
    .map(([s, l]) => {
      return { skills: { [s]: l } };
    });

  const skillPoints = {
    ...[w, ...equipment, ...decorations, ...transformedCharms].reduce<
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

  // Add Gogmazios group skills to the initial accumulator
  const gogmaziosGroupSkillsAcc = gogmazios.groupSkills.reduce<Record<SkillName, number>>((acc, skill) => {
    if (skill) {
      // Each Gogmazios group skill counts as 1 piece (imitating one armor piece)
      acc[skill] = 1;
    }
    return acc;
  }, {});

  // Start equipment reduction from gogmaziosGroupSkillsAcc so values accumulate
  const groupPoints = {
    ...equipment.reduce<Record<SkillName, number>>((acc, i) => {
      const { groupSkill, seriesSkills } = i;
      if (groupSkill) {
        acc[groupSkill] = acc[groupSkill] ? acc[groupSkill] + 1 : 1;
      }
      // Handle series skills
      for (const ss of seriesSkills ?? []) {
        acc[ss] = acc[ss] ? acc[ss] + 1 : 1;
      }
      return acc;
    }, gogmaziosGroupSkillsAcc),
    ...manualSkills,
  };

  // Weapon & Armor Skills
  const buffs = Object.entries(skillPoints).reduce<Record<SkillName, Buff>>(
    (acc, [k, v]) => {
      if (disabled[k]) return acc;
      if (uptime[k] === 0) return acc;
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
    if (disabled[k] || uptime[k] === 0) return;

    if (GroupSkillsCombined[k] && v >= 3) {
      buffs[k] = GroupSkillsCombined[k].levels[3];
    }

    if (SeriesSkillsCombined[k]) {
      if (v >= 4) buffs[k] = SeriesSkillsCombined[k].levels[4];
      else if (v >= 2) buffs[k] = SeriesSkillsCombined[k].levels[2];
    }
  });

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
      delete d.element;
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

  // Gogmazios (applies on top of artian if gogmazios weapon)
  const finalWeapon = produce(weapon, (d) => {
    if (!d.gogmazios) return;

    // Apply focus bonuses
    if (gogmazios.focus === "Attack") {
      d.attack += 10;
      d.affinity -= 15;
    } else if (gogmazios.focus === "Affinity") {
      d.affinity += 10;
      d.attack -= 10;
      if (d.element) d.element.value -= 20;
      if (d.status) d.status.value -= 20;
      if (d.sharpness) {
        d.sharpness[Sharpnesses.indexOf("White")] = Math.max(0, d.sharpness[Sharpnesses.indexOf("White")] - 10);
      }
    } else if (gogmazios.focus === "Element") {
      if (d.element) d.element.value += 50;
      if (d.status) d.status.value += 50;
      d.affinity -= 5;
    }

    // Handle element/status setup (similar to artian)
    if (isGunlance(d) && gogmazios.element) {
      d.shelling.type = ArtianTypeToGunlanceShellType[gogmazios.element];
    }

    if (d.coatings) {
      d.coatings = [];
      if (
        gogmazios.element === "Thunder" ||
        gogmazios.element === "Dragon" ||
        gogmazios.element === "Blast"
      ) {
        d.coatings.push("Power");
      } else if (
        gogmazios.element === "Ice" ||
        gogmazios.element === "Paralysis" ||
        gogmazios.element === "Poison"
      ) {
        d.coatings.push("Pierce");
      } else if (
        gogmazios.element === "No Element" ||
        gogmazios.element === "Water" ||
        gogmazios.element === "Fire" ||
        gogmazios.element === "Sleep"
      ) {
        d.coatings.push("Close-range");
      }

      if (isStatusType(gogmazios.element)) d.coatings.push(gogmazios.element);
    }

    if (isWeaponBowgun(d)) {
      const rapidFire = d.type === "Light Bowgun" ? true : undefined;
      if (gogmazios.element === "Dragon") {
        d.ammo.Flaming = { levels: [1, 2], rapidFire };
        d.ammo.Dragon = { levels: [1], rapidFire };
      } else if (gogmazios.element === "Blast") {
        d.ammo.Flaming = { levels: [1, 2], rapidFire };
        d.ammo.Sticky = { levels: [1] };
      } else if (gogmazios.element === "Fire") {
        d.ammo.Flaming = { levels: [1, 2], rapidFire };
      } else if (gogmazios.element === "Ice" || gogmazios.element === "Sleep") {
        d.ammo.Freeze = { levels: [1, 2], rapidFire };
      } else if (
        gogmazios.element === "Thunder" ||
        gogmazios.element === "Paralysis"
      ) {
        d.ammo.Thunder = { levels: [1, 2], rapidFire };
      } else if (gogmazios.element === "Water" || gogmazios.element === "Poison") {
        d.ammo.Water = { levels: [1, 2], rapidFire };
      }
    }

    if (isElementType(gogmazios.element)) {
      if (d.type === "Hunting Horn") {
        d.songs = [
          "Elem Attack Boost",
          "Blight Negated",
          "Sonic Waves",
          "Restore Sharpness",
          `Echo Wave (${gogmazios.element})`,
          "Resounding Melody",
        ];
      }
      if (d.type === "Switch Axe" || d.type === "Charge Blade") {
        d.phial = "Element";
      }
      if (!isWeaponBowgun(d)) {
        d.element = { type: gogmazios.element, value: d.gogmazios.element };
      }
    } else if (isStatusType(gogmazios.element)) {
      delete d.element;
      if (d.type === "Hunting Horn") {
        d.songs = [
          "Status Attack Up",
          "Divine Protection",
          "All Ailments Negated",
          `Echo Wave (${gogmazios.element})`,
          "Offset Melody",
        ];
      }
      if (d.type === "Switch Axe") d.phial = "Power";
      if (gogmazios.element === "Blast" && d.type === "Bow") {
        d.status = { type: gogmazios.element, value: 80 };
      } else {
        d.status = { type: gogmazios.element, value: d.gogmazios.status };
      }
    }

    // Apply infusions (same as artian)
    gogmazios.infusions.forEach((i) => {
      if (i === "Attack") d.attack += 5;
      if (i === "Affinity") d.affinity += 5;
    });

    // Apply reinforcements with levels
    gogmazios.reinforcements.forEach((r) => {
      if (!r) return;

      if (r.type === "Attack") {
        if (r.level === "II") d.attack += 6;
        else if (r.level === "III") d.attack += 9;
        else if (r.level === "EX") d.attack += 12;
      }

      if (r.type === "Affinity") {
        if (r.level === "II") d.affinity += 6;
        else if (r.level === "III") d.affinity += 8;
        else if (r.level === "EX") d.affinity += 10;
      }

      if (r.type === "Element") {
        const bonus = r.level === "II" ? 60 : r.level === "EX" ? 90 : 0;
        if (d.element) d.element.value += bonus;
        if (d.status) d.status.value += bonus;
      }

      if (r.type === "Sharpness" && d.sharpness) {
        const bonus = r.level === "II" ? 30 : r.level === "EX" ? 50 : 0;
        d.sharpness[Sharpnesses.indexOf("White")] += bonus;
      }

      if (r.type === "Ammo" && isWeaponBowgun(d)) {
        // Ammo upgrades would need specific handling based on ammo types
        // For now, we'll skip the detailed implementation
        // const bonus = r.level === "II" ? 1 : r.level === "EX" ? 2 : 0;
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

  const uiAttack = calculateAttack(finalWeapon.attack, buffs);
  const uiElement = finalWeapon.element
    ? calculateElement(finalWeapon.element.value, finalWeapon.element.type, buffs)
    : 0;
  const uiStatus = finalWeapon.status
    ? calculateStatus(finalWeapon.status.value, finalWeapon.status.type, buffs)
    : 0;

  // Uptime B-Tree
  type Node = {
    skills: SkillName[];
    weight: number;
    children: Node[];
  };

  const entries = Object.entries(uptime).filter(
    ([k]) => k !== "LocalResonance" && k !== "GlobalResonance",
  );

  type Weight = { buffs: Record<string, Buff>; weight: number };
  const weights: Weight[] = [];

  const node = (
    i: number = 0,
    skills: SkillName[] = [],
    weight: number = 100,
  ): Node => {
    // if last child, build weights
    if (!entries[i]) {
      weights.push({
        buffs: produce(buffs, (d) => {
          Object.keys(d).forEach((k) => {
            if (uptime[k] !== undefined && !skills.includes(k)) delete d[k];
          });
        }),
        weight,
      });
      return { skills, weight, children: [] };
    }

    const left = node(
      i + 1,
      [...skills, entries[i][0]],
      (weight * entries[i][1]) / 100,
    );
    const right = node(i + 1, skills, weight - left.weight);

    const children: Node[] = [];

    if (left.weight > 0) children.push(left);
    if (right.weight > 0) children.push(right);

    return { skills: skills, weight, children };
  };

  // TODO: refactor this to support not just Omega Resonance
  const local = uptime["LocalResonance"] ?? 0;
  const global = uptime["GlobalResonance"] ?? 0;
  const remainder = 100 - local - global;

  const head: Node = {
    skills: [],
    weight: 100,
    children: [],
  };

  if (local > 0) head.children.push(node(0, ["LocalResonance"], local));
  if (global > 0) head.children.push(node(0, ["GlobalResonance"], global));
  if (remainder > 0) head.children.push(node(0, [], remainder));

  // can be slightly off 100 due to JavaScript floating point math
  const totalWeight = weights.reduce((acc, w) => acc + w.weight, 0);

  const uiAffinity = round(
    weights.reduce((acc, weight) => {
      if (weight.weight === 0) return acc;
      const affinity = calculateAffinity({
        affinity: finalWeapon.affinity,
        buffs: weight.buffs,
        target,
        rawType: Attacks[finalWeapon.type][0].rawType ?? "Slash",
      });

      return acc + (affinity * weight.weight) / totalWeight;
    }, 0),
    2,
  );

  const calcAtk = (atk: Attack, targetOverride?: Partial<Target>) => {
    const sums = weights.reduce(
      (acc, weight) => {
        if (weight.weight === 0) return acc;

        const hit = calculateHit(finalWeapon, weight.buffs, atk, {
          ...target,
          ...targetOverride,
        });

        const affinity = atk.cantCrit
          ? 0
          : calculateAffinity({
              affinity: finalWeapon.affinity,
              buffs: weight.buffs,
              target,
              rawType: atk.rawType ?? "Slash",
            });

        const critMulti =
          affinity >= 0
            ? (buffs["Critical Boost"]?.criticalBoost ?? 1.25)
            : 0.75;
        const eleCritMulti =
          affinity >= 0 ? (buffs["Critical Element"]?.criticalElement ?? 1) : 1;

        const crit = calculateCrit(
          finalWeapon,
          weight.buffs,
          atk,
          { ...target, ...targetOverride },
          critMulti,
          eleCritMulti,
        );

        const avg = calculateAverage(hit, crit, affinity);

        return {
          hit: acc.hit + (hit * weight.weight) / totalWeight,
          crit: acc.crit + (crit * weight.weight) / totalWeight,
          avg: acc.avg + (avg * weight.weight) / totalWeight,
        };
      },
      { hit: 0, crit: 0, avg: 0 },
    );

    return {
      hit: dmg(sums.hit),
      crit: dmg(sums.crit),
      avg: round(sums.avg, 2),
    };
  };

  const baseCritMulti =
    uiAffinity >= 0 ? (buffs["Critical Boost"]?.criticalBoost ?? 1.25) : 0.75;
  const baseEleCritMulti =
    uiAffinity >= 0 ? (buffs["Critical Element"]?.criticalElement ?? 1) : 1;

  const { avg: effectiveRaw } = calcAtk({
    name: "EFR",
    mv: 100,
    eleMul: 0,
    ignoreHzv: true,
  });
  const { avg: effectiveEle } = calcAtk(
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
      weapon: finalWeapon,
      skillPoints,
      groupPoints,
      buffs,
      uiAttack,
      uiElement,
      uiStatus,
      uiAffinity,
      critMulti: baseCritMulti,
      eleCritMulti: baseEleCritMulti,
      calculateAtk: calcAtk,
      effectiveRaw,
      effectiveEle,
      head,
      weights,
      totalWeight,
    };
  }, [
    w,
    artian,
    gogmazios,
    otherBuffs,
    helm,
    body,
    arms,
    waist,
    legs,
    weaponSlots,
    helmSlots,
    bodySlots,
    armsSlots,
    waistSlots,
    legsSlots,
    charmSlots,
    disabled,
    flags,
    target,
    manualSkills,
    uptime,
    manualSharpness,
    charmSkills,
  ]);
};
