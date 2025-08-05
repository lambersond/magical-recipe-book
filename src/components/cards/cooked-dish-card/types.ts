import type { CookedDish, CookedDishRecipe, Nullish } from '@/types'

export type StatusChipProps = {
  cookedOnDay: number
  consumedOnDay: Nullish<number>
  currentDay: number
  isExpired: boolean
  isPrepared: boolean
}

export type ActionButtonProps = {
  onClick: VoidFunction
  type: 'discard' | 'consume'
}

export type BonusesListClasses = {
  bonuses: string[]
  show?: boolean
  type: 'boon' | 'bane'
  isPrepared: boolean
}

export type CoookedDishCardProps = CookedDish & {
  currentDay: number
  onConsume: ({ id, recipe }: { id: string; recipe: CookedDishRecipe }) => void
  onDiscard: (id: string) => void
}
