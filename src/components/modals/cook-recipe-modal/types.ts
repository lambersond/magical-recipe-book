import type { ModalProps } from '../types'
import type {
  Backpack,
  ForagedIngredient,
  IngredientsPouch,
  Recipe,
} from '@/types'

export interface CookRecipeModalProps extends Omit<ModalProps, 'onClose'> {
  ingredientsPouch: IngredientsPouch
  recipe: Recipe
  cookedDishId?: string
  onCook: (data: {
    ingredientsPouch: IngredientsPouch
    foragingLog: ForagedIngredient[]
    backpack: Backpack
  }) => void
}
