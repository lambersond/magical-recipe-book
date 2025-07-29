'use client'

import { outcomes } from './constants'
import type { RecipeOutcomeProps } from './types'

export function RecipeOutcome(result: Readonly<RecipeOutcomeProps>) {
  const { type, flavorText, ingredients } = result
  const outcome = outcomes[type]
  return (
    <div className={outcome.containerClasses}>
      <div className='flex items-center space-x-2 mb-1'>
        <span className='text-lg'>{outcome.emoji}</span>
        <span className={outcome.titleClasses}>{outcome.title}</span>
      </div>
      {!!flavorText && (
        <p className={outcome.flavorTextClasses}>{flavorText}</p>
      )}
      {ingredients.map(({ ingredient }) => (
        <span
          key={ingredient.id}
          className={outcome.ingredientContainerClasses}
        >
          <p className={outcome.ingredientNameClasses}>{ingredient.name}:</p>
          {ingredient.bane}
        </span>
      ))}
    </div>
  )
}
