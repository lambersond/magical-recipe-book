import { use } from 'react'
import {
  CharacterIngredientsPouchApiContext,
  CharacterIngredientsPouchContext,
} from '../providers/character-ingredients-pouch-provider'
import { compareByRarity } from '@/utils/rarity'
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

  const sort = compareByRarity<ForagedIngredient>(
    data.sortBy,
    item => item.magicalIngredient?.rarity,
    item => item.magicalIngredient?.name ?? '',
  )

  return {
    filter,
    sort,
    sortBy: data.sortBy,
  }
}

export function useCharacterIngredientsPouchApi() {
  return use(CharacterIngredientsPouchApiContext)
}
