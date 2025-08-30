import { use } from 'react'
import {
  CharacterCookbookApiContext,
  CharacterCookbookContext,
} from '../providers/character-cookbook-provider'
import type { FullCharacter } from '@/types'

export function useCharacterCookbook() {
  const data = use(CharacterCookbookContext)

  const filter = (item: FullCharacter['cookbook']['knownRecipes'][number]) => {
    // Search string filter
    if (data.searchString) {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(data.searchString.toLowerCase())
      if (!matchesSearch) return false
    }
    return true
  }

  return {
    filter,
    sort: 'TBD',
    viewMode: data.viewMode,
  }
}

export function useCharacterCookbookApi() {
  return use(CharacterCookbookApiContext)
}
