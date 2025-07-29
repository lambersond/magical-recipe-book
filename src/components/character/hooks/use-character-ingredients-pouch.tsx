import { use } from 'react'
import {
  CharacterIngredientsPouchApiContext,
  CharacterIngredientsPouchContext,
} from '../providers/character-ingredients-pouch-provider'
import type { ForagedIngredient } from '@/types'

export function useCharacterIngredientsPouch() {
  const data = use(CharacterIngredientsPouchContext)

  const filter = (item: ForagedIngredient) => {
    // Search string filter
    if (data.searchString) {
      const matchesSearch = item.magicalIngredient?.name
        ?.toLowerCase()
        .includes(data.searchString.toLowerCase())
      if (!matchesSearch) return false
    }

    // Status filter
    if (data.filterStatus && data.filterStatus !== 'all') {
      const statusChecks = {
        available: !item.isExpired && !item.isUsed,
        expired: item.isExpired,
        used: item.isUsed,
      }

      if (!statusChecks[data.filterStatus as keyof typeof statusChecks]) {
        return false
      }
    }
    return true
  }

  return {
    filter,
    sort: 'TBD',
  }
}

export function useCharacterIngredientsPouchApi() {
  return use(CharacterIngredientsPouchApiContext)
}
