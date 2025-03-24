import { z } from "zod";
import { Sharpnesses, WeaponTypes } from "@/data";
import {
  ArtianInfusionOptions,
  ArtianTypeOptions,
  ArtianUpgradeOptions,
} from "./types";

export const importSchema = z.object({
  weapon: z.enum(WeaponTypes),
  attack: z.number().int(),
  affinity: z.number().int().optional(),
  element: z.number().int().optional(),
  sharpness: z.enum(Sharpnesses).optional(),
  rawHzv: z.number().int().optional(),
  eleHzv: z.number().int().optional(),
  isWound: z.boolean().optional(),
  buffs: z.record(z.number().int()).default({}),
});

export const importSchemaTwo = z.object({
  weapon: z.object({
    type: z.enum(WeaponTypes),
    name: z.string(),
  }),
  artian: z
    .object({
      type: z.enum(ArtianTypeOptions),
      infusions: z.array(z.enum(ArtianInfusionOptions).optional()).max(3),
      upgrades: z.array(z.enum(ArtianUpgradeOptions).optional()).max(5),
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
});
