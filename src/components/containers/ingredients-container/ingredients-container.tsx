import { Ingredients } from '@/components/ingredients'
import { ingredientsService } from '@/server/ingredients'
import type { Ingredient } from '@/types'

export async function IngredientsContainer() {
  const ingredients =
    (await ingredientsService.getAllIngredients()) as any as Ingredient[]

  return <Ingredients ingredients={ingredients} />
}
