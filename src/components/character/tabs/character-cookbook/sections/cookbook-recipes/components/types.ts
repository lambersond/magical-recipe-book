import type { Recipe } from '@/types'
import type { MouseEventHandler } from 'react'

export type RecipeActionsProps = {
  recipe: Recipe
}

export type RecipeIngredientsProps = Pick<
  Recipe,
  'mundaneIngredients' | 'magicalIngredients'
> & {
  onEditCommonIngredients?: MouseEventHandler<HTMLButtonElement>
}

export type RecipeOutcomesProps = Pick<
  Recipe,
  'boonText' | 'baneText' | 'magicalIngredients'
>
