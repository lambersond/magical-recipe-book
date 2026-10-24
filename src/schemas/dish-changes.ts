import { z } from 'zod'
import {
  ABILITIES,
  BONUS_ROLLS,
  CONDITIONS,
  DAMAGE_TYPES,
  ROLL_MODES,
  SENSES,
  SKILLS,
} from '@/constants/dish-changes'

const ability = z.enum(ABILITIES)
const skill = z.enum(SKILLS)
const mode = z.enum(ROLL_MODES)
const damageType = z.enum(DAMAGE_TYPES)
const modifier = z
  .number()
  .int()
  .min(-10)
  .max(10)
  .refine(value => value !== 0, 'A change of 0 changes nothing')

/**
 * One change a magical ingredient's boon or bane makes to a character, as
 * stored with the ingredient. Its maximum hit points may be dice, such as
 * `3+1d6`, rolled once when the dish is sent; `sign` -1 loses them.
 */
export const ingredientChangeSchema = z.union([
  z.strictObject({
    type: z.literal('abilityScore'),
    ability,
    value: modifier,
  }),
  z.strictObject({
    type: z.literal('rollMode'),
    roll: z.enum(['check', 'save']),
    ability,
    mode,
  }),
  z.strictObject({
    type: z.literal('rollMode'),
    roll: z.literal('skill'),
    skill,
    mode,
  }),
  z.strictObject({
    type: z.literal('rollBonus'),
    roll: z.enum(BONUS_ROLLS),
    value: modifier,
  }),
  z.strictObject({ type: z.literal('maxHitPoints'), value: modifier }),
  z.strictObject({
    type: z.literal('maxHitPoints'),
    roll: z.string().regex(/^(\d+\+)?\d*d\d+(\+\d+)?$/, 'Not a dice formula'),
    sign: z.union([z.literal(1), z.literal(-1)]),
  }),
  z.strictObject({ type: z.literal('damageResistance'), damageType }),
  z.strictObject({ type: z.literal('damageVulnerability'), damageType }),
  z.strictObject({
    type: z.literal('conditionImmunity'),
    condition: z.enum(CONDITIONS),
  }),
  z.strictObject({
    type: z.literal('sense'),
    sense: z.enum(SENSES),
    range: z.number().int().positive(),
  }),
  z.strictObject({
    type: z.literal('exhaustion'),
    levels: z.number().int().min(1).max(6),
  }),
])

export const ingredientChangesSchema = z.array(ingredientChangeSchema)

export type IngredientChange = z.infer<typeof ingredientChangeSchema>
