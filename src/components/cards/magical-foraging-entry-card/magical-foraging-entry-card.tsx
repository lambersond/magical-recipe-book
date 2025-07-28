import { getStatusText, getStyles } from './utils'
import { RarityChip } from '@/components/chips'
import { Card } from '@/components/common'
import type { MagicalForagingEntryCardProps } from './types'

export function MagicalForagingEntryCard({
  day,
  found = 'Free Range Air',
  rarity = 'common',
  isExpired,
  isUsed,
}: Readonly<MagicalForagingEntryCardProps>) {
  const classes = getStyles({ rarity, isExpired, isUsed })
  const statusText = getStatusText({ isExpired, isUsed })

  return (
    <Card className={classes.cardClasses} overrideViews>
      <p className={classes.itemClasses}>{found}</p>
      <span className='text-lg'>
        <p className='text-text-secondary text-sm mb-3 -mt-1'>Day {day}</p>

        <div className='flex items-center justify-between gap-2'>
          <RarityChip rarity={rarity} />
          <div className='flex items-center gap-2'>
            <div className={classes.statusIndicatorClasses} />
            <p className={classes.statusClasses}>{statusText}</p>
          </div>
        </div>
      </span>
    </Card>
  )
}
