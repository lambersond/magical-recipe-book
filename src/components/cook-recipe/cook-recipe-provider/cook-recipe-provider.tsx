import { useState } from 'react'
import { CookingState } from '../types'
import {
  CookRecipeDataContext,
  CookRecipeDispatchContext,
} from './cook-recipe-contexts'
import type { IngredientsPouch, Recipe } from '@/types'

export function CookRecipeProvider({
  children,
  recipe,
  ingredientsPouch,
}: {
  children: React.ReactNode
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
}) {
  const [cookingState, setCookingState] = useState<CookingState>('selection')
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
  }
  const dispatchValue = {
    setCookingState,
    setRequiredIngredientsSelected,
    setRollResults,
  }

  return (
    <CookRecipeDispatchContext.Provider value={dispatchValue}>
      <CookRecipeDataContext.Provider value={value}>
        {children}
      </CookRecipeDataContext.Provider>
    </CookRecipeDispatchContext.Provider>
  )
}
