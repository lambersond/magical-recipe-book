import type { Rarity } from '@/types'

export type MagicalForagingEntryCardProps = {
  day: number
  found?: string
  rarity?: Rarity
  isExpired?: boolean
  isUsed?: boolean
}
