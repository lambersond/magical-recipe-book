import type { ModalProps } from '../types'
import type { LearnRecipe } from '@/types'

export interface AddCookbookRecipeModalProps
  extends Omit<ModalProps, 'onClose'> {
  onSubmit(results: LearnRecipe): void
}
