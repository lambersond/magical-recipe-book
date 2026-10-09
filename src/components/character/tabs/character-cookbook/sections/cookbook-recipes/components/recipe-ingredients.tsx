import { Pencil } from 'lucide-react'
import { CommonChip } from '@/components/chips'
import { MagicalIngredient } from '@/components/magical-ingredient'
import type { RecipeIngredientsProps } from './types'

export function RecipeIngredients({
  mundaneIngredients,
  magicalIngredients,
  onEditCommonIngredients,
}: Readonly<RecipeIngredientsProps>) {
  return (
    <>
      <h4 className='text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3'>
        Ingredients
      </h4>
      {mundaneIngredients.length > 0 && (
        <div className='mb-4'>
          <div className='flex items-center space-x-2 mb-2'>
            <span className='text-sm'>🌿</span>
            <span className='text-sm text-text-tertiary'>Common:</span>
            {onEditCommonIngredients && (
              <button
                type='button'
                aria-label='Edit common ingredients'
                onClick={onEditCommonIngredients}
                className='p-1 rounded-full text-text-secondary hover:text-primary hover:bg-hover cursor-pointer'
              >
                <Pencil className='size-3.5' />
              </button>
            )}
          </div>
          <div className='flex flex-wrap gap-2'>
            {mundaneIngredients.map((ingredient, index) => (
              <CommonChip key={index} text={ingredient} />
            ))}
          </div>
        </div>
      )}
      {magicalIngredients.length > 0 && (
        <div className='mb-4'>
          <div className='flex items-center space-x-2 mb-2'>
            <span className='text-sm'>✨</span>
            <span className='text-sm text-text-secondary'>Magical:</span>
          </div>
          <div className='space-y-2'>
            {magicalIngredients.map(({ ingredient }) => (
              <MagicalIngredient
                name={ingredient.name}
                key={ingredient.id}
                rarity={ingredient.rarity}
                description={ingredient.description}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
