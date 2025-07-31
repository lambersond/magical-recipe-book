import { getRarityContainerClasses } from '@/utils/rarity'
import type { Rarity } from '@/types'

export function getStyles(rarity: Rarity) {
  const containerClasses = getRarityContainerClasses(
    rarity,
    'text-xs rounded-sm px-2 py-1 border flex min-w-fit items-center',
  )

  return {
    containerClasses,
  }
}
