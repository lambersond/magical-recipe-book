'use client'

import { CookingPot, Package } from 'lucide-react'
import { useRecipeActions } from '../hooks/use-recipe-actions'
import type { RecipeActionsProps } from './types'

export function RecipeActions({ recipe }: Readonly<RecipeActionsProps>) {
  const { onCookRecipe, onPrepareRecipe } = useRecipeActions(recipe)

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={onPrepareRecipe}
        className='sm:after:content-["Prepare"] p-1.75 md:px-6 bg-gradient-to-r from-indigo-600/70 to-violet-600/60 rounded-xl text-text-primary font-semibold text-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
      >
        <Package />
      </button>
      <button
        onClick={onCookRecipe}
        className='sm:after:content-["Cook"] p-1.75 md:px-6 bg-gradient-to-r from-purple-600/70 to-fuchsia-600/60 rounded-xl text-text-primary font-semibold text-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
      >
        <CookingPot />
      </button>
    </div>
  )
}
