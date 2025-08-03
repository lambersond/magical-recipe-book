import { useState } from 'react'
import { CookingState } from '../types'
import {
  CookRecipeDataContext,
  CookRecipeDispatchContext,
} from './cook-recipe-contexts'
import type { CookRecipeProviderProps } from './types'

export function CookRecipeProvider({
  children,
  recipe,
  ingredientsPouch,
  startingState = 'selection',
  onCook,
}: Readonly<CookRecipeProviderProps>) {
  const [cookingState, setCookingState] = useState<CookingState>(startingState)
  const [rollResults, setRollResults] = useState<number>(0)
  const [requiredIngredientsSelected, setRequiredIngredientsSelected] =
    useState<Record<string, boolean>>(() => {
      const initialSelection: Record<string, boolean> = {}
      for (const { ingredient } of recipe.magicalIngredients) {
        initialSelection[ingredient.id] = false
      }
      return initialSelection
    })
  const value = {
    recipe,
    ingredientsPouch,
    cookingState,
    requiredIngredientsSelected,
    rollResults,
    characterId: ingredientsPouch.characterId,
    recipeId: recipe.id,
  }
  const dispatchValue = {
    setCookingState,
    setRequiredIngredientsSelected,
    setRollResults,
    onCook,
  }

  return (
    <CookRecipeDispatchContext.Provider value={dispatchValue}>
      <CookRecipeDataContext.Provider value={value}>
        {children}
      </CookRecipeDataContext.Provider>
    </CookRecipeDispatchContext.Provider>
  )
}
