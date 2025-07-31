import type { ModalProps } from '../types'
import type { EditableCharacter } from '@/types'

export interface AddCharacterModalProps extends Omit<ModalProps, 'onClose'> {
  onSubmit(character: EditableCharacter): void
  existingCharacterNames: string[]
}
