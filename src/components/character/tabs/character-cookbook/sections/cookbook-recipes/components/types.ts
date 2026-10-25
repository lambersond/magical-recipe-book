import type { Recipe } from '@/types'
import type { RecipeAvailability } from '@/utils/recipe-availability'
import type { MouseEventHandler } from 'react'

export type RecipeActionsProps = {
  recipe: Recipe
  /** While the pouch lacks the recipe's ingredients */
  disabled?: boolean
}

export type RecipeIngredientsProps = Pick<
  Recipe,
  'mundaneIngredients' | 'magicalIngredients'
> & {
  onEditCommonIngredients?: MouseEventHandler<HTMLButtonElement>
  /** How many of each magical ingredient the character has, by id */
  magicalIngredientCounts?: Record<string, number>
}

export type MissingIngredientsWarningProps = {
  availability: RecipeAvailability
}

export type RecipeOutcomesProps = Pick<
  Recipe,
  'boonText' | 'baneText' | 'magicalIngredients'
>
