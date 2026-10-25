'use client'

import { useCharacter } from '@/components/character/hooks/use-character'
import { getRecipeAvailability } from '@/utils/recipe-availability'
import type { Recipe } from '@/types'

/** What the character's pouch holds of a recipe's ingredients. */
export function useRecipeAvailability(recipe: Readonly<Recipe>) {
  const { ingredientsPouch } = useCharacter()
  return getRecipeAvailability(recipe, ingredientsPouch)
}
