import clsx from 'classnames'
import type { MagicalForagingEntryCardProps } from './types'

export function getStyles({
  rarity,
  isExpired,
  isUsed,
}: Pick<MagicalForagingEntryCardProps, 'rarity' | 'isExpired' | 'isUsed'>) {
  const cardClasses = clsx(
    'max-w-xl py-3 rounded-xl px-2',
    'border border-border bg-card',
  )
  const itemClasses = clsx('text-xl font-bold', `text-rarity-${rarity}`)
  const statusClasses = clsx('text-xs', 'font-semibold', 'text-text-secondary')
  const statusIndicatorClasses = clsx(
    {
      'bg-success': !isExpired && !isUsed,
      'bg-error': isExpired,
      'bg-info': isUsed,
    },
    'size-2 rounded-full',
  )

  return {
    cardClasses,
    itemClasses,
    statusClasses,
    statusIndicatorClasses,
  }
}

export function getStatusText({
  isExpired,
  isUsed,
}: Pick<MagicalForagingEntryCardProps, 'isExpired' | 'isUsed'>) {
  if (isUsed) {
    return 'Used'
  } else if (isExpired) {
    return 'Expired'
  }
  return 'Available'
}
