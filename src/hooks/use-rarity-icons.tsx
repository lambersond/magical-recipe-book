import {
  D10Icon,
  D12Icon,
  D4Icon,
  D6Icon,
  D8Icon,
} from '@/components/common/icons'
import type { Rarity } from '@/types'

export function useRarityIcons(): Record<Rarity, React.ComponentType<any>> {
  return {
    common: D4Icon,
    uncommon: D6Icon,
    rare: D8Icon,
    'very-rare': D10Icon,
    epic: D12Icon,
  }
}
