import { use } from 'react'
import {
  CharacterCookbookApiContext,
  CharacterCookbookContext,
} from '../providers/character-cookbook-provider'
import { compareByRarity, getRecipeRarity } from '@/utils/rarity'
import type { FullCharacter } from '@/types'

type KnownRecipe = FullCharacter['cookbook']['knownRecipes'][number]

export function useCharacterCookbook() {
  const data = use(CharacterCookbookContext)

  const filter = (item: KnownRecipe) => {
    // Search string filter
    if (data.searchString) {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(data.searchString.toLowerCase())
      if (!matchesSearch) return false
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
    sort,
    sortBy: data.sortBy,
    viewMode: data.viewMode,
  }
}

export function useCharacterCookbookApi() {
  return use(CharacterCookbookApiContext)
}
