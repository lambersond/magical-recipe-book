import { useContext } from 'react'
import {
  CookRecipeDataContext,
  CookRecipeDispatchContext,
} from '../cook-recipe-provider'
import type { CookingResult } from '../types'

export function useDishActions() {
  const { setCookingState, onCook } = useContext(CookRecipeDispatchContext)
  const { recipeId, characterId, cookedDishId } = useContext(
    CookRecipeDataContext,
  )
  const cookingResults = useCookingResults()

  async function cook() {
    const hasCookedDishId = Boolean(cookedDishId)

    if (hasCookedDishId) {
      await finishCooking()
      return
    }

    const data = {
      recipeId,
      status: cookingResults.cookedDishStatus,
      isConsumed: cookingResults.cookedDishStatus !== 'prepared',
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

  async function prepare() {
    const data = {
      recipeId,
    }

    const response = await fetch(`/api/characters/${characterId}/prepare`, {
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
    onCook(json)
  }

  async function finishCooking() {
    const data = {
      status: cookingResults.cookedDishStatus,
    }

    const response = await fetch(
      `/api/characters/${characterId}/cooked-dish/${cookedDishId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to finish cooking')
    }
    const json = await response.json()

    onCook(json)
    setCookingState('results')
  }

  return { cook, prepare }
}

export function useCookingApi() {
  const { setCookingState, setRequiredIngredientsSelected, setRollResults } =
    useContext(CookRecipeDispatchContext)

  const startCooking = () => {
    setCookingState('cooking')
  }

  const startPreparing = () => {
    setCookingState('prepare')
  }

  const resetCooking = () => {
    setCookingState('selection')
    setRollResults(0)
    setRequiredIngredientsSelected({})
  }

  return {
    startCooking,
    startPreparing,
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

export function useIsCooking() {
  return useContext(CookRecipeDataContext).cookingState === 'selection'
}

export function useRequiredIngredientsSelected() {
  return useContext(CookRecipeDataContext).requiredIngredientsSelected
}

export function useIsReady() {
  const ingredients = useRequiredIngredientsSelected()
  const recipe = useCookingRecipe()
  const ingredientsPouch = useCookingIngredientsPouch()
  const hasCommonIngredients =
    ingredientsPouch!.commonIngredients >= recipe.mundaneIngredients.length

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
