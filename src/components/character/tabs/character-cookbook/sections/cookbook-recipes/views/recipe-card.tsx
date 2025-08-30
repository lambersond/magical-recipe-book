'use client'

import { RecipeActions, RecipeIngredients, RecipeOutcomes } from '../components'
import { DifficultyChallengeChip } from '@/components/chips'
import { Card } from '@/components/common'
import type { RecipeCardProps } from './types'

export function RecipeCard({ recipe }: Readonly<RecipeCardProps>) {
  return (
    <Card
      className='border-y sm:border border-border rounded-none sm:rounded-lg bg-card'
      overrideViews
    >
      <div className='p-4 border-b border-border'>
        <div className='flex justify-between items-center mb-3'>
          <div className='flex flex-col sm:flex-row gap-1 sm:gap-2 items-start sm:items-center'>
            <h3 className='text-xl font-bold text-text-primary'>
              {recipe.name}
            </h3>
            <DifficultyChallengeChip difficulty={recipe.difficulty} />
          </div>
          <RecipeActions recipe={recipe} />
        </div>
        <p className='text-text-secondary text-sm leading-relaxed'>
          {recipe.description}
        </p>
      </div>
      <div className='p-4 pb-0'>
        <RecipeIngredients
          mundaneIngredients={recipe.mundaneIngredients}
          magicalIngredients={recipe.magicalIngredients}
        />
      </div>
      <div className='p-4'>
        <RecipeOutcomes
          baneText={recipe.baneText}
          boonText={recipe.boonText}
          magicalIngredients={recipe.magicalIngredients}
        />
      </div>
    </Card>
  )
}
