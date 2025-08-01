import { useContext } from 'react'
import {
  CookRecipeDataContext,
  CookRecipeDispatchContext,
} from '../cook-recipe-provider'
import type { CookingResult } from '../types'

export function useFinishCooking() {
  const { setCookingState, onCook } = useContext(CookRecipeDispatchContext)
  const { recipeId, characterId } = useContext(CookRecipeDataContext)
  const cookingResults = useCookingResults()

  async function finishCooking() {
    const data = {
      recipeId,
      status: cookingResults.cookedDishStatus,
      isConsumed: true, // TODO: remove once backpack is implemented
    }

    const response = await fetch(`/api/characters/${characterId}/cook`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to finish cooking')
    }
    const json = await response.json()

    setCookingState('results')
    onCook(json)
  }

  return finishCooking
}

export function useCookingApi() {
  const { setCookingState, setRequiredIngredientsSelected, setRollResults } =
    useContext(CookRecipeDispatchContext)

  const startCooking = () => {
    setCookingState('cooking')
  }

  const resetCooking = () => {
    setCookingState('selection')
    setRollResults(0)
    setRequiredIngredientsSelected({})
  }

  return {
    startCooking,
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
  const recipe = useCookingRecipe()
  const ingredientsPouch = useCookingIngredientsPouch()
  const hasCommonIngredients =
    ingredientsPouch?.commonIngredients >= recipe.mundaneIngredients.length

  return hasCommonIngredients && Object.values(ingredients).every(Boolean)
}

export function useCookingResults(): CookingResult {
  const rollResults = useContext(CookRecipeDataContext).rollResults
  const dc = useCookingRecipe().difficulty
  const difference = rollResults - dc

  if (difference <= -5) {
    return {
      emoji: '💀',
      type: 'failure',
      text: 'Critical Failure',
      flavorText: 'baneText',
      unlocksMagicModifiers: true,
      cookedDishStatus: 'bane',
    }
  }

  if (difference < 0) {
    const emojiMap: Record<number, string> = {
      [-4]: '🤮',
      [-3]: '🤢',
      [-2]: '🥴',
      [-1]: '🤯',
    }

    return {
      emoji: emojiMap[difference] || '🤮',
      type: 'failure',
      text: 'Failure',
      flavorText: 'baneText',
      unlocksMagicModifiers: false,
      cookedDishStatus: 'failure',
    }
  }

  if (difference >= 5) {
    return {
      emoji: '✨',
      type: 'success',
      text: 'Critical Success',
      flavorText: 'boonText',
      unlocksMagicModifiers: true,
      cookedDishStatus: 'boon',
    }
  }

  const successEmojiMap: Record<number, string> = {
    [0]: '👌',
    [1]: '😋',
    [2]: '🤤',
    [3]: '🤩',
    [4]: '🥳',
  }

  return {
    emoji: successEmojiMap[difference] || '👌',
    type: 'success',
    text: 'Success',
    flavorText: 'boonText',
    unlocksMagicModifiers: false,
    cookedDishStatus: 'success',
  }
}

export function useSetCookingResults() {
  return useContext(CookRecipeDispatchContext).setRollResults
}
