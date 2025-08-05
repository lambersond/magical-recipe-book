import type {
  Backpack,
  ForagedIngredient,
  IngredientsPouch,
  Recipe,
  CookedDishStatus,
  CookedDish,
} from '@/types'

export type CookingState =
  | 'prepareSelection'
  | 'prepare'
  | 'prepared' // TBD. How do we go straiting to the cooking state?
  | 'selection'
  | 'cooking'
  | 'results'

export type RecipeAction = (data: {
  ingredientsPouch: IngredientsPouch
  foragingLog: ForagedIngredient[]
  backpack: Backpack
}) => void

export type CookRecipeProps = {
  cookedDishId?: string
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
  onCook: RecipeAction
}

export type PrepareRecipeProps = {
  recipe: Recipe
  ingredientsPouch: IngredientsPouch
  onPrepare: RecipeAction
}

export type FinishCookedDishProps = {
  characterId: string
  cookedDish: CookedDish
  onCook: (data: CookedDish) => void
}

export interface CookingResult {
  emoji: string
  type: 'success' | 'failure'
  text: string
  flavorText: 'boonText' | 'baneText'
  unlocksMagicModifiers: boolean
  cookedDishStatus: CookedDishStatus
}
