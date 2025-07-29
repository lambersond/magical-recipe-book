'use client'

import { CookRecipeContainer } from './cook-recipe-container'
import { CookRecipeProvider } from './cook-recipe-provider'
import type { CookRecipeProps } from './types'

export function CookRecipe({
  recipe,
  ingredientsPouch,
}: Readonly<CookRecipeProps>) {
  return (
    <CookRecipeProvider recipe={recipe} ingredientsPouch={ingredientsPouch}>
      <CookRecipeContainer />
    </CookRecipeProvider>
  )
}
