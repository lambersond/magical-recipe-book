import type { ModalProps } from '../types'
import type { NewCharacter } from '@/types'

export interface AddCharacterModalProps extends Omit<ModalProps, 'onClose'> {
  onSubmit(application: NewCharacter): void
}
