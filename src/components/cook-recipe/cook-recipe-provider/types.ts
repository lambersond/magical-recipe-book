import type { CookingState } from '../types'
import type {
  Backpack,
  ForagedIngredient,
  IngredientsPouch,
  Recipe,
} from '@/types'
import type { Dispatch, SetStateAction } from 'react'

export type CookRecipeDataContextType = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
  cookingState: CookingState
  requiredIngredientsSelected: Record<string, boolean>
  rollResults: number
  characterId: string | undefined
  recipeId: string | undefined
}

export type CookRecipeDispatchContextType = {
  setCookingState: Dispatch<SetStateAction<CookingState>>
  setRequiredIngredientsSelected: Dispatch<
    SetStateAction<Record<string, boolean>>
  >
  setRollResults: Dispatch<SetStateAction<number>>
  onCook: (data: {
    ingredientsPouch: IngredientsPouch
    foragingLog: ForagedIngredient[]
    backpack: Backpack
  }) => void
}

export type CookRecipeProviderProps = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
  children: React.ReactNode
  onCook: (data: {
    ingredientsPouch: IngredientsPouch
    foragingLog: ForagedIngredient[]
    backpack: Backpack
  }) => void
}
