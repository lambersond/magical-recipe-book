import type { ModalProps } from '../types'

export interface CookRecipeModalProps extends Omit<ModalProps, 'onClose'> {
  onSubmit(results: any): void
}
