'use client'

import { Check, X } from 'lucide-react'
import { SelectionButton } from '../../buttons'
import {
  useCookingIngredientsPouch,
  useCookingRecipe,
} from '../../hooks/use-cook-recipe'
import { SelectMagicalIngredient } from '../../select-magical-ingredient'
import { CommonChip } from '@/components/chips'

export function Selection() {
  const recipe = useCookingRecipe()
  const ingredientsPouch = useCookingIngredientsPouch()

  return (
    <div className='flex flex-col gap-4 justify-between h-full'>
      <div className='flex flex-col gap-2'>
        <p className='text-text-secondary text-sm leading-relaxed mb-3'>
          {recipe.description}
        </p>
        <p className='text-text-primary font-semibold text-lg'>
          Common Ingredients Required
        </p>
        <span className='text-text-secondary text-sm p-3 bg-paper-light rounded-lg flex flex-wrap gap-2 mb-3'>
          <span className='flex flex-col items-start gap-2 flex-1'>
            <div className='flex gap-1'>
              {recipe?.mundaneIngredients?.map(ingredient => (
                <CommonChip key={ingredient} text={ingredient} />
              ))}
            </div>
            You have: {ingredientsPouch?.commonIngredients} common ingredients
          </span>
          <span className='min-w-6'>
            {(ingredientsPouch?.commonIngredients ?? 0) >=
            recipe.mundaneIngredients.length ? (
              <Check className='text-success size-6' />
            ) : (
              <X className='text-danger size-6' />
            )}
          </span>
        </span>
        <p className='text-text-primary font-semibold text-lg'>
          Magical Ingredients Required
        </p>
        <span className='text-text-secondary flex flex-wrap gap-2 mb-3'>
          {recipe?.magicalIngredients?.map(({ ingredient }) => (
            <SelectMagicalIngredient
              key={ingredient.id}
              name={ingredient.name}
              description={ingredient.description}
              rarity={ingredient.rarity}
              ingredientId={ingredient.id}
            />
          ))}
        </span>
      </div>
      <SelectionButton />
    </div>
  )
}
