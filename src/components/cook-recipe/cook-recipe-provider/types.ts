import type { CookingState } from '../types'
import type { IngredientsPouch, Recipe } from '@/types'
import type { Dispatch, SetStateAction } from 'react'

export type CookRecipeDataContextType = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
  cookingState: CookingState
  requiredIngredientsSelected: Record<string, boolean>
  rollResults: number
}

export type CookRecipeDispatchContextType = {
  setCookingState: Dispatch<SetStateAction<CookingState>>
  setRequiredIngredientsSelected: Dispatch<
    SetStateAction<Record<string, boolean>>
  >
  setRollResults: Dispatch<SetStateAction<number>>
}
