'use client'

import { CookRecipeContainer } from './cook-recipe-container'
import { CookRecipeProvider } from './cook-recipe-provider'
import type { CookRecipeProps } from './types'

export function CookRecipe({
  recipe,
  ingredientsPouch,
  onCook,
}: Readonly<CookRecipeProps>) {
  return (
    <CookRecipeProvider
      recipe={recipe}
      ingredientsPouch={ingredientsPouch}
      onCook={onCook}
    >
      <CookRecipeContainer />
    </CookRecipeProvider>
  )
}
