import { getStyles } from './utils'
import { RARITY_LABELS } from '@/constants/rarity'
import { useRarityIcons } from '@/hooks/use-rarity-icons'
import { Rarity } from '@/types'

export function RarityChip({
  rarity,
  iconOnly,
}: Readonly<{ rarity: Rarity; iconOnly?: boolean }>) {
  const RarityIcon = useRarityIcons()
  const classes = getStyles(rarity, iconOnly)
  const Icon = RarityIcon[rarity]

  if (iconOnly) {
    return <Icon className={classes.iconClasses} />
  }

  return (
    <div className={classes.containerClasses}>
      <Icon className={classes.iconClasses} />
      <p className='hidden sm:block'>{RARITY_LABELS[rarity]}</p>
    </div>
  )
}
