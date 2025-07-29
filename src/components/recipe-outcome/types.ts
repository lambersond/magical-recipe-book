import type { Recipe } from '@/types'

export type RecipeOutcomeProps = {
  type: 'success' | 'failure'
  flavorText?: string
  ingredients: Recipe['magicalIngredients']
}
