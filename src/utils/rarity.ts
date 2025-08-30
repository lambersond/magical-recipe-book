import clsx from 'classnames'
import { RARITY_DC } from '@/constants/rarity'
import { Rarity } from '@/types'

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
