'use client'

import { CollapsibleCard } from '@/components/common'
import { RecipeOutcome } from '@/components/recipe-outcome'
import type { RecipeOutcomesProps } from './types'

export function RecipeOutcomes({
  baneText,
  boonText,
  magicalIngredients,
}: Readonly<RecipeOutcomesProps>) {
  return (
    <CollapsibleCard
      title={
        <span className='font-semibold tracking-wide'>
          Possible Magical Outcomes
        </span>
      }
      classNames='w-full'
    >
      <div className='flex flex-col space-y-2 cursor-text'>
        <RecipeOutcome
          type='success'
          flavorText={boonText}
          ingredients={magicalIngredients}
        />
        <RecipeOutcome
          type='failure'
          flavorText={baneText}
          ingredients={magicalIngredients}
        />
      </div>
    </CollapsibleCard>
  )
}
