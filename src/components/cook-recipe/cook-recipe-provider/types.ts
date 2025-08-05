import type { CookingState, RecipeAction } from '../types'
import type { CookedDish, IngredientsPouch, Recipe } from '@/types'
import type { Dispatch, SetStateAction } from 'react'

export type CookRecipeDataContextType = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch | undefined
  cookingState: CookingState
  requiredIngredientsSelected: Record<string, boolean>
  rollResults: number
  characterId: string | undefined
  recipeId: string | undefined
  cookedDishId?: string | undefined
}

export type CookRecipeDispatchContextType = {
  setCookingState: Dispatch<SetStateAction<CookingState>>
  setRequiredIngredientsSelected: Dispatch<
    SetStateAction<Record<string, boolean>>
  >
  setRollResults: Dispatch<SetStateAction<number>>
  onCook: RecipeAction | ((data: CookedDish) => void)
}

export type CookRecipeProviderProps =
  | {
      cookedDishId?: string
      characterId: string
      recipe: Recipe
      ingredientsPouch: IngredientsPouch
      children: React.ReactNode
      startingState?: CookingState
      onCook: RecipeAction
    }
  | {
      cookedDishId: string
      characterId: string
      ingredientsPouch?: IngredientsPouch
      recipe: Recipe
      children: React.ReactNode
      startingState: CookingState
      onCook: (data: CookedDish) => void
    }
