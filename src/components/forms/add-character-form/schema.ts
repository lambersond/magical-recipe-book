import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const AddCharacterSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const AddCharacterResolver = zodResolver(AddCharacterSchema)
export type AddCharacterFields = z.infer<typeof AddCharacterSchema>
