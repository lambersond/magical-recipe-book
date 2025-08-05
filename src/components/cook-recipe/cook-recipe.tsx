'use client'

import { CookRecipeContainer } from './cook-recipe-container'
import { CookRecipeProvider } from './cook-recipe-provider'
import type { CookRecipeProps } from './types'

export function CookRecipe({
  ingredientsPouch,
  onCook,
  recipe,
}: Readonly<CookRecipeProps>) {
  return (
    <CookRecipeProvider
      recipe={recipe}
      characterId={ingredientsPouch.characterId}
      ingredientsPouch={ingredientsPouch}
      onCook={onCook}
    >
      <CookRecipeContainer />
    </CookRecipeProvider>
  )
}
