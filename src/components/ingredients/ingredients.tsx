'use client'

import { IngredientsHeader } from './ingredients-header'
import { IngredientsMasonry } from './ingredients-masonry'
import { IngredientsProvider } from './ingredients-provider'
import type { Ingredient } from '@/types'

export function Ingredients({
  ingredients,
}: Readonly<{ ingredients: Ingredient[] }>) {
  return (
    <IngredientsProvider defaultIngredients={ingredients}>
      <IngredientsHeader />
      <IngredientsMasonry />
    </IngredientsProvider>
  )
}
