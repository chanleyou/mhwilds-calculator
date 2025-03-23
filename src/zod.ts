import { z } from "zod";
import { Sharpnesses, WeaponTypes } from "@/data";

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
