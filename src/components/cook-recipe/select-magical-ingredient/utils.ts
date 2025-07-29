import clsx from 'classnames'
import {
  isCommon,
  isEpic,
  isRare,
  isUncommon,
  isVeryRare,
} from '@/utils/rarity'
import type { IngredientsPouch, Rarity } from '@/types'

export function getContainerStyles(rarity: Rarity) {
  return clsx(
    {
      'border-rarity-common bg-rarity-common/20': isCommon(rarity),
      'border-rarity-uncommon bg-rarity-uncommon/20': isUncommon(rarity),
      'border-rarity-rare bg-rarity-rare/15 text-text-rarity-rare':
        isRare(rarity),
      'border-rarity-very-rare bg-rarity-very-rare/20': isVeryRare(rarity),
      'border-rarity-epic bg-rarity-epic/20': isEpic(rarity),
    },
    'border-1 p-3 rounded-lg flex flex-col gap-1 w-full',
  )
}

export function getButtonStyles(isSelected: boolean) {
  return clsx(
    {
      'bg-primary/90': isSelected,
      'bg-gray-700 hover:bg-gray-600': !isSelected,
    },
    'rounded-md text-text-primary w-full py-2 cursor-pointer',
  )
}

export function getButtonText(isSelected: boolean) {
  return isSelected ? 'Selected' : 'Select Ingredient'
}

export function getFoundMagicalIngredientsCount(
  ingredientId: string,
  ingredientsPouch: IngredientsPouch,
) {
  return ingredientsPouch.magicalIngredients.filter(
    ({ magicalIngredient }) => magicalIngredient?.id === ingredientId,
  ).length
}
