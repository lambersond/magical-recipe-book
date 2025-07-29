import { getRarityContainerClassesFaint } from '@/utils/rarity'
import type { Rarity } from '@/types'

export function getStyles(rarity: Rarity) {
  const containerClasses = getRarityContainerClassesFaint(
    rarity,
    'border rounded-lg p-3',
  )
  return { containerClasses }
}
