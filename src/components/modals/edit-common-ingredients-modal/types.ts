import type { ModalProps } from '../types'

export interface EditCommonIngredientsModalProps extends Pick<
  ModalProps,
  'open'
> {
  recipeName?: string
  mundaneIngredients?: string[]
  defaultMundaneIngredients?: string[]
  /** Saves the names; a rejection keeps the modal open with its message. */
  onSubmit(mundaneIngredients: string[]): Promise<void>
}
