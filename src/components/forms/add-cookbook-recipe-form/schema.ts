import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const AddCookbookRecipeSchema = z.object({
  recipeId: z.string(),
})

export const AddCookbookRecipeResolver = zodResolver(AddCookbookRecipeSchema)
export type AddCookbookRecipeFields = z.infer<typeof AddCookbookRecipeSchema>
