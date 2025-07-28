import clsx from 'classnames'
import {
  isCommon,
  isEpic,
  isRare,
  isUncommon,
  isVeryRare,
} from '@/utils/rarity'
import type { Rarity } from '@/types'

export function makeStyles(rarity: Rarity) {
  const wrapperClasses = clsx(
    {
      'text-rarity-common': isCommon(rarity),
      'text-rarity-uncommon': isUncommon(rarity),
      'text-rarity-rare bg-rarity-rare/3': isRare(rarity),
      'text-rarity-very-rare': isVeryRare(rarity),
      'text-rarity-epic': isEpic(rarity),
    },
    'border rounded-lg p-3',
  )
  return { wrapperClasses }
}
