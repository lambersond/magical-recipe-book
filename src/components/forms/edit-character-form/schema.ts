import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const EditCharacterSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const EditCharacterResolver = zodResolver(EditCharacterSchema)
export type EditCharacterFields = z.infer<typeof EditCharacterSchema>
