import clsx from 'classnames'
import { getRarityContainerClasses, getRarityTextColor } from '@/utils/rarity'
import type { Rarity } from '@/types'

export function getStyles(rarity: Rarity, iconOnly?: boolean) {
  const containerClasses = getRarityContainerClasses(
    rarity,
    'text-xs rounded-full px-2 py-1 border flex min-w-fit items-center',
  )
  const iconClasses = clsx(
    {
      'sm:mr-2': !iconOnly,
    },
    'inline size-4',
    getRarityTextColor(rarity, ''),
  )

  return {
    containerClasses,
    iconClasses,
  }
}
