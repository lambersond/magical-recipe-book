import type { IngredientsPouch, Recipe } from '@/types'

export type CookingState = 'selection' | 'cooking' | 'results'

export type CookRecipeProps = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
}
