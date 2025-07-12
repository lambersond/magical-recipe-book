import { Card } from '@/components/common'
import type { Biome } from '@/types'

export function BiomeCard({
  description,
  image,
  name,
  ingredients,
}: Readonly<Biome>) {
  return (
    <Card>
      <h2 className='text-2xl font-semibold text-text-primary flex gap-2 items-center'>
        <p className='text-4xl'>{image}</p> {name}
      </h2>
      <p className='text-text-secondary mb-4'>{description}</p>

      <p className='text-text-secondary mb-2'>
        <span className='font-semibold'>Ingredients:</span>{' '}
        {ingredients?.length || 0}
      </p>
      <p className='text-text-secondary mb-2'>
        {ingredients?.map(ingredient => ingredient.name).join(', ')}
      </p>
    </Card>
  )
}
