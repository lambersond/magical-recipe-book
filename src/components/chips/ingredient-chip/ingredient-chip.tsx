import { getStyles } from './utils'
import { Tooltip } from '@/components/common'
import { useRarityIcons } from '@/hooks/use-rarity-icons'
import type { IngredientChipProps } from './types'

export function IngredientChip({
  rarity,
  name,
  description,
  bane,
  boon,
}: Readonly<IngredientChipProps>) {
  const RarityIcon = useRarityIcons()
  const classes = getStyles(rarity)
  const Icon = RarityIcon[rarity]
  return (
    <Tooltip
      placement='top'
      contentContainerClasses='bg-paper border border-border rounded-sm max-w-xs'
      title={
        <div className='text-xs p-2 flex flex-col gap-1'>
          <p className='text-text-secondary italic mb-1'>{description}</p>
          {boon && (
            <p className='text-success'>
              <b>Boon:</b> {boon}
            </p>
          )}
          {bane && (
            <p className='text-danger'>
              <b>Bane:</b> {bane}
            </p>
          )}
        </div>
      }
      asChild
    >
      <div className={classes.containerClasses}>
        <Icon className='hidden sm:inline sm:mr-2 size-4' />
        <p className=''>{name}</p>
      </div>
    </Tooltip>
  )
}
