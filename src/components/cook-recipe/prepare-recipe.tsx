'use client'

import { CookRecipeContainer } from './cook-recipe-container'
import { CookRecipeProvider } from './cook-recipe-provider'
import type { PrepareRecipeProps } from './types'

export function PrepareRecipe({
  recipe,
  ingredientsPouch,
  onPrepare,
}: Readonly<PrepareRecipeProps>) {
  return (
    <CookRecipeProvider
      recipe={recipe}
      ingredientsPouch={ingredientsPouch}
      onCook={onPrepare}
      startingState='prepareSelection'
    >
      <CookRecipeContainer />
    </CookRecipeProvider>
  )
}
