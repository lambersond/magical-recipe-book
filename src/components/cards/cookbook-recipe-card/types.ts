import type { Rarity } from '@/types'

export type CookbookRecipeCardProps = {
  name: string
  description: string
  difficulty: number
  mundaneIngredients: string[]
  boonText: string
  baneText: string
  magicalIngredients: {
    ingredient: {
      id: string
      name: string
      description: string
      rarity: Rarity
      boon: string
      bane: string
    }
  }[]
}
