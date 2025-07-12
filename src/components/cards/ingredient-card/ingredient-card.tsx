import { Card } from '@/components/common'
import type { Ingredient } from '@/types'

export function IngredientCard({
  bane,
  biomes,
  boon,
  description,
  name,
  rarity,
}: Readonly<Ingredient>) {
  return (
    <Card className='w-full'>
      <h2 className='text-2xl font-semibold text-text-primary flex gap-2 items-center'>
        {name}
      </h2>
      <p className='text-text-secondary mb-4'>{description}</p>
      <p className='text-text-secondary mb-2'>
        <span className='font-semibold'>Rarity:</span> {rarity}
      </p>
      <p className='text-text-secondary mb-2'>
        <span className='font-semibold'>Boon:</span> {boon || 'None'}
      </p>
      <p className='text-text-secondary mb-2'>
        <span className='font-semibold'>Bane:</span> {bane || 'None'}
      </p>
      <p className='text-text-secondary mb-2'>
        <span className='font-semibold'>Biomes:</span>{' '}
        {biomes?.map(b => b.name).join(', ') || 'None'}
      </p>
    </Card>
  )
}
