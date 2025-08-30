'use client'

import { type MouseEventHandler } from 'react'
import {
  useCharacter,
  useCharacterApi,
} from '@/components/character/hooks/use-character'
import { useModals } from '@/hooks/use-modals'
import type {
  Backpack,
  ForagedIngredient,
  FullCharacter,
  IngredientsPouch,
  Recipe,
} from '@/types'

export function useRecipeActions(recipe: Readonly<Recipe>) {
  const { openModal } = useModals()
  const { ingredientsPouch } = useCharacter()
  const updateCharacter = useCharacterApi()

  const onCookRecipe: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    openModal('CookRecipeModal', {
      recipe,
      ingredientsPouch,
      onCook: async ({
        ingredientsPouch,
        foragingLog,
        backpack,
      }: {
        ingredientsPouch: IngredientsPouch
        foragingLog: ForagedIngredient[]
        backpack: Backpack
      }) => {
        updateCharacter((prev: FullCharacter) => ({
          ...prev,
          ingredientsPouch,
          foragingLog,
          backpack,
        }))
      },
    })
  }

  const onPrepareRecipe: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    openModal('PrepareRecipeModal', {
      recipe,
      ingredientsPouch,
      onPrepare: async ({ ingredientsPouch, foragingLog, backpack }) => {
        updateCharacter((prev: FullCharacter) => ({
          ...prev,
          ingredientsPouch,
          foragingLog,
          backpack,
        }))
      },
    })
  }

  return {
    onCookRecipe,
    onPrepareRecipe,
  }
}
