import type {
  Backpack,
  ForagedIngredient,
  IngredientsPouch,
  Recipe,
  CookedDishStatus,
} from '@/types'

export type CookingState = 'selection' | 'cooking' | 'results'

export type CookRecipeProps = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
  onCook: (data: {
    ingredientsPouch: IngredientsPouch
    foragingLog: ForagedIngredient[]
    backpack: Backpack
  }) => void
}

export interface CookingResult {
  emoji: string
  type: 'success' | 'failure'
  text: string
  flavorText: 'boonText' | 'baneText'
  unlocksMagicModifiers: boolean
  cookedDishStatus: CookedDishStatus
}
