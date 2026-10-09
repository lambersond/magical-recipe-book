import { z } from 'zod'

export const COMMON_INGREDIENT_NAME_MAX_LENGTH = 50

/** A cookbook recipe's common ingredient names, as the character calls them. */
export const commonIngredientsSchema = z.object({
  mundaneIngredients: z.array(
    z
      .string()
      .trim()
      .min(1, 'Ingredient name is required')
      .max(
        COMMON_INGREDIENT_NAME_MAX_LENGTH,
        `Ingredient name cannot exceed ${COMMON_INGREDIENT_NAME_MAX_LENGTH} characters`,
      ),
  ),
})

export type CommonIngredientsFields = z.infer<typeof commonIngredientsSchema>
