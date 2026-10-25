import type { Rarity } from '@/types'

export type MagicalIngredientProps = {
  name: string
  rarity: Rarity
  description: string
  /** How many the character has; shown when it's more than one */
  count?: number
}
