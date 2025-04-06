import { z } from "zod";
import { WeaponTypes } from "@/data";
import {
  ArtianInfusionOptions,
  ArtianTypeOptions,
  ArtianUpgradeOptions,
} from "./types";

export const importSchema = z.object({
  weapon: z.object({
    name: z.string(),
    type: z.enum(WeaponTypes),
  }),
  artian: z
    .object({
      element: z.enum(ArtianTypeOptions),
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
  buffs: z.record(z.number().int()).default({}),
  uptime: z.record(z.string(), z.number().int().min(0).max(100)).optional(),
});
