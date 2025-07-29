import { getStyles } from './utils'
import { RARITY_LABELS } from '@/constants/rarity'
import { useRarityIcons } from '@/hooks/use-rarity-icons'
import { Rarity } from '@/types'

export function RarityChip({ rarity }: { rarity: Rarity }) {
  const RarityIcon = useRarityIcons()
  const classes = getStyles(rarity)
  const Icon = RarityIcon[rarity]
  return (
    <div className={classes.containerClasses}>
      <Icon className='inline sm:mr-2 size-4' />
      <p className='hidden sm:block'>{RARITY_LABELS[rarity]}</p>
    </div>
  )
}
