import type { ModalProps } from '../types'
import type { EditableCharacter } from '@/types'

export interface EditCharacterModalProps extends Omit<ModalProps, 'onClose'> {
  onSubmit(character: EditableCharacter): void
  character: EditableCharacter
}
