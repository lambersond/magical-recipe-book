'use client'

import { ChevronDown } from 'lucide-react'
import { DifficultyChallengeChip, MundaneChip } from '@/components/chips'
import { Card } from '@/components/common'
import { MagicalIngredient } from '@/components/magical-ingredient'
import { RecipeOutcome } from '@/components/recipe-outcome'
import { useModals } from '@/hooks/use-modals'
import { expandablePaneClasses, updateStateAttribute } from '@/utils/expandable'
import type { CookbookRecipeCardProps } from './types'

export function CookbookRecipeCard(recipe: Readonly<CookbookRecipeCardProps>) {
  const { openModal } = useModals()
  return (
    <Card
      className='border-y sm:border border-border rounded-none sm:rounded-lg bg-card'
      overrideViews
    >
      <div className='p-6 border-b border-border'>
        <div className='flex justify-between items-start mb-3'>
          <h3 className='text-xl font-bold text-text-primary'>{recipe.name}</h3>
          <DifficultyChallengeChip difficulty={recipe.difficulty} />
        </div>
        <p className='text-text-secondary text-sm leading-relaxed'>
          {recipe.description}
        </p>
      </div>
      <div className='p-6 pb-0'>
        <h4 className='text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3'>
          Ingredients
        </h4>
        {recipe.mundaneIngredients.length > 0 && (
          <div className='mb-4'>
            <div className='flex items-center space-x-2 mb-2'>
              <span className='text-sm'>🌿</span>
              <span className='text-sm text-text-tertiary'>Mundane:</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {recipe.mundaneIngredients.map((ingredient, index) => (
                <MundaneChip key={index} text={ingredient} />
              ))}
            </div>
          </div>
        )}
        {recipe.magicalIngredients.length > 0 && (
          <div className='mb-4'>
            <div className='flex items-center space-x-2 mb-2'>
              <span className='text-sm'>✨</span>
              <span className='text-sm text-text-secondary'>Magical:</span>
            </div>
            <div className='space-y-2'>
              {recipe.magicalIngredients.map(({ ingredient }) => (
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
      </div>
      <div className='px-6 py-4'>
        <Card
          className='transition-all w-full'
          data-state='false'
          onClick={updateStateAttribute}
          overrideViews
        >
          <div className='flex items-center justify-between cursor-pointer text-text-tertiary'>
            <span className='font-semibold'>Possible Outcomes</span>
            <ChevronDown
              data-expandable
              className='data-[state=true]:rotate-180 transform transition-transform'
            />
          </div>
          <div
            data-expandable
            className={expandablePaneClasses}
            data-state='false'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex flex-col space-y-3 cursor-text'>
              <RecipeOutcome
                type='success'
                flavorText={recipe.boonText}
                ingredients={recipe.magicalIngredients}
              />
              <RecipeOutcome
                type='failure'
                flavorText={recipe.baneText}
                ingredients={recipe.magicalIngredients}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className='px-6 py-4'>
        <button
          onClick={() => openModal('CookRecipeModal', { onConfirm: () => {} })}
          className='bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl w-full font-bold text-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1'
        >
          Cook this Recipe
        </button>
      </div>
    </Card>
  )
}
