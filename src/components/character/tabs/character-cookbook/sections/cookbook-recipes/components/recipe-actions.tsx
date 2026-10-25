'use client'

import { CookingPot, Package } from 'lucide-react'
import { useRecipeActions } from '../hooks/use-recipe-actions'
import type { RecipeActionsProps } from './types'

export function RecipeActions({
  recipe,
  disabled = false,
}: Readonly<RecipeActionsProps>) {
  const { onCookRecipe, onPrepareRecipe } = useRecipeActions(recipe)

  return (
    // Keeps a click on a disabled button from toggling the list item
    <div className='flex items-center gap-2' onClick={e => e.stopPropagation()}>
      <button
        aria-label='Prepare'
        onClick={onPrepareRecipe}
        disabled={disabled}
        className='sm:after:content-["Prepare"] p-1.75 md:px-6 bg-gradient-to-r from-indigo-600/70 to-violet-600/60 rounded-xl text-text-primary font-semibold text-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:shadow-none'
      >
        <Package />
      </button>
      <button
        aria-label='Cook'
        onClick={onCookRecipe}
        disabled={disabled}
        className='sm:after:content-["Cook"] p-1.75 md:px-6 bg-gradient-to-r from-purple-600/70 to-fuchsia-600/60 rounded-xl text-text-primary font-semibold text-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:shadow-none'
      >
        <CookingPot />
      </button>
    </div>
  )
}
