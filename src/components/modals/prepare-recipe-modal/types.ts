import type { ModalProps } from '../types'
import type {
  Backpack,
  ForagedIngredient,
  IngredientsPouch,
  Recipe,
} from '@/types'

export interface PrepareRecipeModalProps extends Omit<ModalProps, 'onClose'> {
  ingredientsPouch: IngredientsPouch
  recipe: Recipe
  onPrepare: (data: {
    ingredientsPouch: IngredientsPouch
    foragingLog: ForagedIngredient[]
    backpack: Backpack
  }) => void
}
