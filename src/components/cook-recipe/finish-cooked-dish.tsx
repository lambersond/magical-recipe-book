'use client'

import { CookRecipeContainer } from './cook-recipe-container'
import { CookRecipeProvider } from './cook-recipe-provider'
import type { FinishCookedDishProps } from './types'
import type { IngredientsPouch, Recipe } from '@/types'

export function FinishCookedDish({
  characterId,
  cookedDish,
  onCook,
}: Readonly<FinishCookedDishProps>) {
  return (
    <CookRecipeProvider
      recipe={cookedDish.recipe as Recipe}
      ingredientsPouch={{} as IngredientsPouch}
      onCook={onCook}
      characterId={characterId}
      cookedDishId={cookedDish.id}
      startingState='cooking'
    >
      <CookRecipeContainer />
    </CookRecipeProvider>
  )
}
