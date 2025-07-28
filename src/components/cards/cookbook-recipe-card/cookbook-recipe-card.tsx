'use client'

import { ChevronDown } from 'lucide-react'
import { DifficultyChallengeChip, MundaneChip } from '@/components/chips'
import { Card } from '@/components/common'
import { MagicalIngredient } from '@/components/magical-ingredient'
import { expandablePaneClasses, updateStateAttribute } from '@/utils/expandable'
import type { CookbookRecipeCardProps } from './types'

export function CookbookRecipeCard(recipe: Readonly<CookbookRecipeCardProps>) {
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
              <div className='border-l-4 border-success pl-4 py-2 bg-success/4 rounded-r-xl'>
                <div className='flex items-center space-x-2 mb-1'>
                  <span className='text-lg'>✨</span>
                  <span className='text-sm font-semibold text-success'>
                    Divine Success
                  </span>
                </div>
                <p className='text-left text-sm text-green-300 mb-2'>
                  {recipe.boonText}
                </p>
                {recipe.magicalIngredients.map(({ ingredient }) => (
                  <span
                    key={ingredient.id}
                    className='text-sm text-green-300 flex items-start gap-1'
                  >
                    <p className='font-semibold text-success'>
                      {ingredient.name}:
                    </p>
                    {ingredient.boon}
                  </span>
                ))}
              </div>

              <div className='border-l-4 border-danger pl-4 py-2 bg-danger/6 rounded-r-xl'>
                <div className='flex items-center space-x-2 mb-1'>
                  <span className='text-lg'>💀</span>
                  <span className='text-sm font-semibold text-danger'>
                    Disastrous Failure
                  </span>
                </div>
                <p className='text-left text-sm text-red-300 mb-2'>
                  {recipe.baneText}
                </p>
                {recipe.magicalIngredients.map(({ ingredient }) => (
                  <span
                    key={ingredient.id}
                    className='text-sm text-red-300 flex items-start gap-1'
                  >
                    <p className='font-semibold text-danger'>
                      {ingredient.name}:
                    </p>
                    {ingredient.bane}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className='px-6 py-4 hidden'>
        <button className='bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl w-full font-bold text-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1'>
          Cook this Recipe
        </button>
      </div>
    </Card>
  )
}
