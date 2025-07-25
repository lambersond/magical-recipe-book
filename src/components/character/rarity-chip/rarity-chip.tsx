import { getStyles } from './utils'
import { RARITY_LABELS } from '@/constants/rarity'
import { useRarityIcons } from '@/hooks/use-rarity-icons'
import { Rarity } from '@/types'

export function RarityChip({ rarity }: { rarity: Rarity }) {
  const RarityIcon = useRarityIcons()
  const classes = getStyles(rarity)
  const Icon = RarityIcon[rarity]
  return (
    <div className='flex items-center justify-between gap-2'>
      <div className={classes.chipClasses}>
        <Icon className={classes.iconClasses} />
        {RARITY_LABELS[rarity]}
      </div>
    </div>
  )
}
