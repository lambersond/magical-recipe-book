import { use } from 'react'
import {
  CharacterCookbookApiContext,
  CharacterCookbookContext,
} from '../providers/character-cookbook-provider'
import { useCharacter } from './use-character'
import { compareByRarity, getRecipeRarity } from '@/utils/rarity'
import { getRecipeAvailability } from '@/utils/recipe-availability'
import type { FullCharacter } from '@/types'

type KnownRecipe = FullCharacter['cookbook']['knownRecipes'][number]

export function useCharacterCookbook() {
  const data = use(CharacterCookbookContext)
  const { ingredientsPouch } = useCharacter()

  const matchesSearch = (item: KnownRecipe) =>
    !data.searchString ||
    Boolean(item.name?.toLowerCase().includes(data.searchString.toLowerCase()))

  const filter = (item: KnownRecipe) => {
    // Search string filter
    if (!matchesSearch(item)) return false
    // Recipes the pouch lacks ingredients for, while they're hidden
    if (!data.showMissingIngredients) {
      return getRecipeAvailability(item, ingredientsPouch).canMake
    }
    return true
  }

  const sort = compareByRarity<KnownRecipe>(
    data.sortBy,
    recipe => getRecipeRarity(recipe.magicalIngredients),
    recipe => recipe.name,
  )

  return {
    filter,
    matchesSearch,
    sort,
    sortBy: data.sortBy,
    viewMode: data.viewMode,
    showMissingIngredients: data.showMissingIngredients,
  }
}

export function useCharacterCookbookApi() {
  return use(CharacterCookbookApiContext)
}
