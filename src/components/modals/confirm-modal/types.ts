import type { ModalProps } from '../types'

export interface ConfirmModalProps extends ModalProps {
  onConfirm: VoidFunction
  message?: string
  title?: string
}
