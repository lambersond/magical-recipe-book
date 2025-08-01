'use client'

import { Check, X } from 'lucide-react'
import {
  useCookingIngredientsPouch,
  useCookingRequiredIngredientsApi,
  useRequiredIngredientsSelected,
} from '../hooks/use-cook-recipe'
import {
  getButtonStyles,
  getButtonText,
  getContainerStyles,
  getFoundMagicalIngredientsCount,
} from './utils'
import type { SelectMagicalIngredientProps } from './types'

export function SelectMagicalIngredient({
  name,
  description,
  rarity,
  ingredientId,
}: Readonly<SelectMagicalIngredientProps>) {
  const ingredientsPouch = useCookingIngredientsPouch()
  const requiredIngredientsSelected = useRequiredIngredientsSelected()
  const toggleIngredientSelection = useCookingRequiredIngredientsApi()

  const containerClasses = getContainerStyles(rarity)
  const buttonClasses = getButtonStyles(
    requiredIngredientsSelected[ingredientId],
  )
  const buttonText = getButtonText(requiredIngredientsSelected[ingredientId])
  const foundMagicalIngredients = getFoundMagicalIngredientsCount(
    ingredientId,
    ingredientsPouch,
  )

  const onSelect = () => {
    toggleIngredientSelection(ingredientId)
  }

  return (
    <span className={containerClasses}>
      <div className='flex justify-between items-baseline'>
        <span className='font-semibold text-lg'>{name}</span>
        <span className='text-sm'>Available: {foundMagicalIngredients}</span>
      </div>
      <div className='flex justify-between items-center gap-2'>
        <div className='text-xs opacity-80'>{description}</div>
        <span className='min-w-6'>
          {foundMagicalIngredients > 0 ? (
            <Check className='text-success size-6' />
          ) : (
            <X className='text-danger size-6' />
          )}
        </span>
      </div>
      <button
        className={buttonClasses}
        onClick={onSelect}
        disabled={!foundMagicalIngredients}
      >
        {buttonText}
      </button>
    </span>
  )
}
