'use client'

import { RecipeActions, RecipeIngredients, RecipeOutcomes } from '../components'
import { DifficultyChallengeChip } from '@/components/chips'
import { CollapsibleCard } from '@/components/common'
import type { RecipeCardProps } from './types'

export function RecipeListItem({ recipe }: Readonly<RecipeCardProps>) {
  return (
    <CollapsibleCard
      id={recipe.id}
      title={
        <div className='flex justify-between items-center'>
          <div className='flex gap-1 sm:gap-2 items-start sm:items-center'>
            <h3 className='text-xl font-bold text-text-primary'>
              {recipe.name}
            </h3>
            <div className='hidden sm:block'>
              <DifficultyChallengeChip difficulty={recipe.difficulty} />
            </div>
          </div>
          <RecipeActions recipe={recipe} />
        </div>
      }
      subtitle={
        <span className=' font-normal text-text-secondary flex items-center gap-2'>
          <span className='flex gap-1 items-center'>
            <p className='text-md'>{recipe.mundaneIngredients.length}</p>
            <p className='text-sm'>🌿</p>
          </span>
          <span className='flex gap-1 items-center'>
            <p className='text-md'>{recipe.magicalIngredients.length}</p>
            <p className='text-sm'>✨</p>
          </span>
          <div className='block sm:hidden'>
            <DifficultyChallengeChip difficulty={recipe.difficulty} />
          </div>
        </span>
      }
      classNames='bg-card w-full p-4 border border-border rounded-none sm:rounded-lg'
    >
      <p className='text-text-secondary text-sm leading-relaxed pb-4'>
        {recipe.description}
      </p>
      <RecipeIngredients
        mundaneIngredients={recipe.mundaneIngredients}
        magicalIngredients={recipe.magicalIngredients}
      />
      <RecipeOutcomes
        baneText={recipe.baneText}
        boonText={recipe.boonText}
        magicalIngredients={recipe.magicalIngredients}
      />
    </CollapsibleCard>
  )
}
