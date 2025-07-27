export type CharacterCardProps = {
  id: string
  details?: 'lite' | 'full'
  name: string
  currentDay: number
  description?: string | null
  image?: string | null
  recipes?: number
  commonIngredients?: number
  magicalIngredients?: number
  updatedAt: Date
}

export type CharacterCardStatProps = {
  label: string
  sublabel: string
  value: number
  icon: string
  details?: 'lite' | 'full'
}
