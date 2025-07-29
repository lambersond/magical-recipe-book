import type { ModalProps } from '../types'
import type { IngredientsPouch, Recipe } from '@/types'

export interface CookRecipeModalProps extends Omit<ModalProps, 'onClose'> {
  ingredientsPouch: IngredientsPouch
  recipe: Recipe
}

export type CookingState = 'selection' | 'cooking' | 'results'
