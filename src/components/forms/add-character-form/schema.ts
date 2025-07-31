import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const addCharacterSchema = (existingNames: string[]) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Character name is required')
      .max(100, 'Character name cannot exceed 100 characters')
      .refine(
        name =>
          !existingNames.some(
            existing => existing.toLowerCase() === name.toLowerCase(),
          ),
        'You already have a character with this name',
      ),
    description: z
      .string()
      .max(1000, 'Character description cannot exceed 1000 characters')
      .optional(),
  })

export type AddCharacterFields = z.infer<ReturnType<typeof addCharacterSchema>>
export const addCharacterResolver = (existingNames: string[]) =>
  zodResolver(addCharacterSchema(existingNames))
