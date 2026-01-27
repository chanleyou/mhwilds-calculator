import { z } from "zod";
import { WeaponTypes } from "@/data";
import {
  ArtianInfusionOptions,
  ArtianTypeOptions,
  ArtianUpgradeOptions,
  ComboModeOptions,
  GogmaziosFocusOptions,
  GogmaziosReinforcementLevels,
} from "./types";

export const importSchema = z.object({
  weapon: z.object({
    name: z.string(),
    type: z.enum(WeaponTypes),
  }),
  artian: z
    .object({
      element: z.enum(ArtianTypeOptions),
      infusions: z.array(z.enum(ArtianInfusionOptions)).max(3).optional(),
      upgrades: z.array(z.enum(ArtianUpgradeOptions)).max(5).optional(),
    })
    .optional(),
  gogmazios: z
    .object({
      focus: z.enum(GogmaziosFocusOptions),
      element: z.enum(ArtianTypeOptions),
      infusions: z.array(z.enum(ArtianInfusionOptions)).max(3).optional(),
      reinforcements: z.array(
        z.object({
          type: z.enum(ArtianUpgradeOptions),
          level: z.enum(GogmaziosReinforcementLevels),
        })
      ).max(5).optional(),
      groupSkills: z.array(z.string()).max(2).optional(),
    })
    .optional(),
  helm: z.string().optional(),
  body: z.string().optional(),
  arms: z.string().optional(),
  waist: z.string().optional(),
  legs: z.string().optional(),
  charm: z.string().optional(),
  weaponSlots: z.array(z.string().optional().nullable()).max(3).optional(),
  helmSlots: z.array(z.string().optional().nullable()).max(3).optional(),
  bodySlots: z.array(z.string().optional().nullable()).max(3).optional(),
  armsSlots: z.array(z.string().optional().nullable()).max(3).optional(),
  waistSlots: z.array(z.string().optional().nullable()).max(3).optional(),
  legsSlots: z.array(z.string().optional().nullable()).max(3).optional(),
  charmSlots: z.array(z.string().optional().nullable()).max(3).optional(),
  charmSkills: z.array(z.tuple([z.string(), z.number().int()])).optional(),
  buffs: z.record(z.number().int()).default({}),
  uptime: z.record(z.string(), z.number().int().min(0).max(100)).optional(),
  target: z
    .object({
      wound: z.boolean(),
      Slash: z.number(),
      Blunt: z.number(),
      Shot: z.number(),
      Fire: z.number(),
      Water: z.number(),
      Thunder: z.number(),
      Ice: z.number(),
      Dragon: z.number(),
    })
    .optional(),
  combo: z
    .object({
      mode: z.enum(ComboModeOptions),
      attacks: z.array(z.string()).optional(),
    })
    .optional(),
});

export const comboImportSchema = z.object({
  mode: z.enum(ComboModeOptions),
  attacks: z.array(z.string()),
});
