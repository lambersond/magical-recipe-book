import clsx from 'classnames'
import { BiomeChip, RarityChip } from '@/components/chips'
import { Card, Tooltip } from '@/components/common'
import { RARITY_LABELS } from '@/constants/rarity'
import { getBorderColorByRarity } from '@/utils/rarity'
import type { Ingredient } from '@/types'

export function IngredientCard({
  bane,
  biomes,
  boon,
  description,
  name,
  rarity,
}: Readonly<Ingredient>) {
  const cardClasses = clsx(
    'border-t-2 flex flex-col',
    getBorderColorByRarity(rarity),
  )

  return (
    <Card className={cardClasses}>
      <div className='flex items-center items-center justify-between mb-2'>
        <p className='text-xl font-semibold text-text-primary'>{name}</p>
        <Tooltip title={RARITY_LABELS[rarity]}>
          <RarityChip rarity={rarity} iconOnly />
        </Tooltip>
      </div>
      <div className='text-text-tertiary mb-4 font-thin italic text-sm'>
        {description}
      </div>
      <div className='flex flex-col space-y-1 text-sm'>
        {boon && (
          <span className='font-semibold text-text-tertiary'>
            Boon:{' '}
            <span className='text-text-primary font-normal text-text-secondary'>
              {boon}
            </span>
          </span>
        )}
        {bane && (
          <span className='font-semibold text-text-tertiary'>
            Bane:{' '}
            <span className='text-text-primary font-normal text-text-secondary'>
              {bane}
            </span>
          </span>
        )}
      </div>
      {biomes && (
        <div className='mt-4 text-sm text-text-tertiary flex gap-1 flex-wrap'>
          {biomes.map(({ biome }) => (
            <BiomeChip
              key={biome.id}
              name={biome.name}
              description={biome.description ?? ''}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
