import clsx from 'classnames'
import { RARITY_DC, RARITY_WEIGHTS } from '@/constants/rarity'
import { Rarity, RaritySort } from '@/types'

export function getDCColor(dc: number) {
  if (dc <= RARITY_DC.common)
    return 'text-text-rarity-common bg-rarity-common/10'
  if (dc <= RARITY_DC.uncommon)
    return 'text-text-rarity-uncommon bg-rarity-uncommon/10'
  if (dc <= RARITY_DC.rare) return 'text-text-rarity-rare bg-rarity-rare/10'
  if (dc <= RARITY_DC['very-rare'])
    return 'text-text-rarity-very-rare bg-rarity-very-rare/10'
  if (dc <= RARITY_DC.epic) return 'text-text-rarity-epic bg-rarity-epic/10'
  if (dc <= RARITY_DC.legendary)
    return 'text-text-rarity-legendary bg-rarity-legendary/10'
}

export function isUncommon(rarity: string = ''): rarity is 'uncommon' {
  return rarity === 'uncommon'
}
export function isCommon(rarity: string = ''): rarity is 'common' {
  return rarity === 'common'
}
export function isRare(rarity: string = ''): rarity is 'rare' {
  return rarity === 'rare'
}
export function isVeryRare(rarity: string = ''): rarity is 'very-rare' {
  return rarity === 'very-rare'
}
export function isEpic(rarity: string = ''): rarity is 'epic' {
  return rarity === 'epic'
}
export function isLegendary(rarity: string = ''): rarity is 'legendary' {
  return rarity === 'legendary'
}

export function getRarityContainerClasses(rarity: Rarity, defaultClasses = '') {
  return clsx(
    {
      'border-rarity-common bg-rarity-common/20 text-text-rarity-common':
        isCommon(rarity),
      'border-rarity-uncommon bg-rarity-uncommon/20 text-text-rarity-uncommon':
        isUncommon(rarity),
      'border-rarity-rare bg-rarity-rare/20 text-text-rarity-rare':
        isRare(rarity),
      'border-rarity-very-rare bg-rarity-very-rare/20 text-text-rarity-very-rare':
        isVeryRare(rarity),
      'border-rarity-epic bg-rarity-epic/20 text-text-rarity-epic':
        isEpic(rarity),
      'border-rarity-legendary bg-rarity-legendary/20 text-text-rarity-legendary':
        isLegendary(rarity),
    },
    defaultClasses,
  )
}

export function getRarityContainerClassesFaint(
  rarity: Rarity,
  defaultClasses = '',
) {
  return clsx(
    {
      'border-rarity-common bg-rarity-common/6 text-text-rarity-common':
        isCommon(rarity),
      'border-rarity-uncommon bg-rarity-uncommon/6 text-text-rarity-uncommon':
        isUncommon(rarity),
      'border-rarity-rare bg-rarity-rare/6 text-text-rarity-rare':
        isRare(rarity),
      'border-rarity-very-rare bg-rarity-very-rare/6 text-text-rarity-very-rare':
        isVeryRare(rarity),
      'border-rarity-epic bg-rarity-epic/6 text-text-rarity-epic':
        isEpic(rarity),
      'border-rarity-legendary bg-rarity-legendary/6 text-text-rarity-legendary':
        isLegendary(rarity),
    },
    defaultClasses,
  )
}

export function getRarityTextColor(rarity: Rarity, defaultClasses = '') {
  return clsx(
    {
      'text-text-rarity-common': isCommon(rarity),
      'text-text-rarity-uncommon': isUncommon(rarity),
      'text-text-rarity-rare': isRare(rarity),
      'text-text-rarity-very-rare': isVeryRare(rarity),
      'text-text-rarity-epic': isEpic(rarity),
      'text-text-rarity-legendary': isLegendary(rarity),
    },
    defaultClasses,
  )
}

export function getBorderColorByRarity(rarity: Rarity) {
  return clsx({
    'border-rarity-common': isCommon(rarity),
    'border-rarity-uncommon': isUncommon(rarity),
    'border-rarity-rare': isRare(rarity),
    'border-rarity-very-rare': isVeryRare(rarity),
    'border-rarity-epic ': isEpic(rarity),
    'border-rarity-legendary': isLegendary(rarity),
  })
}

export function getRarityWeight(rarity?: string | null) {
  return RARITY_WEIGHTS[rarity as Rarity] ?? 0
}

/** A recipe is as rare as its rarest magical ingredient. */
export function getRecipeRarity(
  magicalIngredients: ReadonlyArray<{ ingredient: { rarity: string } }>,
): Rarity | undefined {
  let rarest: Rarity | undefined
  for (const { ingredient } of magicalIngredients) {
    if (getRarityWeight(ingredient.rarity) > getRarityWeight(rarest)) {
      rarest = ingredient.rarity as Rarity
    }
  }
  return rarest
}

/**
 * Builds a comparator for `toSorted` that orders items by rarity, breaking
 * ties by name. `default` keeps the existing order.
 */
export function compareByRarity<T>(
  sort: RaritySort,
  getRarity: (item: T) => string | null | undefined,
  getName: (item: T) => string = () => '',
) {
  return (a: T, b: T) => {
    if (sort === 'default') return 0
    const direction = sort === 'rarest' ? -1 : 1
    const byRarity =
      (getRarityWeight(getRarity(a)) - getRarityWeight(getRarity(b))) *
      direction
    return byRarity || getName(a).localeCompare(getName(b))
  }
}
