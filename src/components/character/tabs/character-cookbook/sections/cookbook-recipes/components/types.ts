import type { Recipe } from '@/types'

export type RecipeActionsProps = {
  recipe: Recipe
}

export type RecipeIngredientsProps = Pick<
  Recipe,
  'mundaneIngredients' | 'magicalIngredients'
>

export type RecipeOutcomesProps = Pick<
  Recipe,
  'boonText' | 'baneText' | 'magicalIngredients'
>
