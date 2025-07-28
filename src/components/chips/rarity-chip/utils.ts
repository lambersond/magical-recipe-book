import clsx from 'classnames'
import { Rarity } from '@/types'
import {
  isCommon,
  isEpic,
  isLegendary,
  isRare,
  isUncommon,
  isVeryRare,
} from '@/utils/rarity'

export function getStyles(rarity: Rarity) {
  const iconClasses = clsx(
    {
      'text-rarity-common': isCommon(rarity),
      'text-rarity-uncommon': isUncommon(rarity),
      'text-rarity-rare': isRare(rarity),
      'text-rarity-very-rare': isVeryRare(rarity),
      'text-rarity-epic': isEpic(rarity),
      'text-rarity-legendary': isLegendary(rarity),
    },
    'inline sm:mr-2 size-4',
  )
  const chipClasses = clsx(
    {
      'border-rarity-common bg-rarity-common/10': isCommon(rarity),
      'border-rarity-uncommon bg-rarity-uncommon/10': isUncommon(rarity),
      'border-rarity-rare bg-rarity-rare/10': isRare(rarity),
      'border-rarity-very-rare bg-rarity-very-rare/10': isVeryRare(rarity),
      'border-rarity-epic bg-rarity-epic/10': isEpic(rarity),
      'border-rarity-legendary bg-rarity-legendary/10': isLegendary(rarity),
    },
    'text-xs rounded-full px-2 py-1 border flex min-w-fit items-center',
  )

  return {
    iconClasses,
    chipClasses,
  }
}
