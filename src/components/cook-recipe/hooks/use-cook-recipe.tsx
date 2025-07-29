import { useContext } from 'react'
import {
  CookRecipeDataContext,
  CookRecipeDispatchContext,
} from '../cook-recipe-provider'

export function useCookingApi() {
  const { setCookingState, setRequiredIngredientsSelected } = useContext(
    CookRecipeDispatchContext,
  )

  const startCooking = () => {
    setCookingState('cooking')
  }

  const resetCooking = () => {
    setCookingState('selection')
    setRequiredIngredientsSelected({})
  }

  const finishCooking = () => {
    setCookingState('results')
  }

  return {
    startCooking,
    finishCooking,
    resetCooking,
  }
}

export function useCookingRequiredIngredientsApi() {
  const { setRequiredIngredientsSelected } = useContext(
    CookRecipeDispatchContext,
  )

  return (ingredientId: string) => {
    setRequiredIngredientsSelected(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }))
  }
}

export function useCookingRecipe() {
  return useContext(CookRecipeDataContext).recipe
}

export function useCookingIngredientsPouch() {
  return useContext(CookRecipeDataContext).ingredientsPouch
}

export function useCookingState() {
  return useContext(CookRecipeDataContext).cookingState
}

export function useRequiredIngredientsSelected() {
  return useContext(CookRecipeDataContext).requiredIngredientsSelected
}

export function useIsReady() {
  const ingredients = useRequiredIngredientsSelected()
  return Object.values(ingredients).every(Boolean)
}

export function useCookingResults() {
  return useContext(CookRecipeDataContext).rollResults
}

export function useSetCookingResults() {
  return useContext(CookRecipeDispatchContext).setRollResults
}
