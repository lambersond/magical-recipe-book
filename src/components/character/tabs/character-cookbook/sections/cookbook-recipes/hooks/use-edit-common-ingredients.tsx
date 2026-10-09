'use client'

import { type MouseEventHandler } from 'react'
import {
  useCharacter,
  useCharacterApi,
} from '@/components/character/hooks/use-character'
import { useModals } from '@/hooks/use-modals'
import type { CookbookRecipe, FullCharacter } from '@/types'

export function useEditCommonIngredients(recipe: Readonly<CookbookRecipe>) {
  const { openModal } = useModals()
  const { id: characterId } = useCharacter()
  const updateCharacter = useCharacterApi()

  const saveCommonIngredients = async (mundaneIngredients: string[]) => {
    const response = await fetch(
      `/api/characters/${characterId}/cookbook/${recipe.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mundaneIngredients }),
      },
    )
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error ?? 'Could not save changes')
    }

    updateCharacter((prev: FullCharacter) => ({
      ...prev,
      cookbook: {
        ...prev.cookbook,
        knownRecipes: prev.cookbook.knownRecipes.map(known =>
          known.id === data.id
            ? { ...known, mundaneIngredients: data.mundaneIngredients }
            : known,
        ),
      },
    }))
  }

  const onEditCommonIngredients: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    openModal('EditCommonIngredientsModal', {
      recipeName: recipe.name,
      mundaneIngredients: recipe.mundaneIngredients,
      defaultMundaneIngredients: recipe.defaultMundaneIngredients,
      onSubmit: saveCommonIngredients,
    })
  }

  return { onEditCommonIngredients }
}
