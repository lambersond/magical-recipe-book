import { z } from 'zod'

/** A Survival check made while foraging a biome for a magical ingredient. */
export const forageBiomeSchema = z.object({
  biomeId: z
    .string({ error: 'Choose a biome to forage' })
    .min(1, 'Choose a biome to forage'),
  roll: z
    .number({ error: 'Enter your roll result' })
    .int('Roll result must be a whole number')
    .min(-20, 'Roll result is too low')
    .max(100, 'Roll result is too high'),
})

export type ForageBiomeFields = z.infer<typeof forageBiomeSchema>
