import { IngredientChip } from '@/components/chips'
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
      <span className='flex gap-3 items-center mb-4'>
        <p className='text-4xl'>{image}</p>
        <span className='flex flex-col'>
          <p className='text-2xl'>{name}</p>
          <span className='flex gap-1 text-text-secondary'>
            <p className='font-bold'>Ingredients:</p>
            <p>{ingredients?.length}</p>
          </span>
        </span>
      </span>
      <p className='text-text-secondary mb-4 border-b border-border pb-4'>
        {description}
      </p>
      <div className='flex gap-1 flex-wrap'>
        {ingredients?.map(({ ingredient }) => (
          <IngredientChip key={ingredient.id} {...ingredient} />
        ))}
      </div>
    </Card>
  )
}
