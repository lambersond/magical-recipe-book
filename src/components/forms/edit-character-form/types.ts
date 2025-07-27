import type { EditableCharacter } from '@/types'

export type EditCharacterFormProps = {
  character: EditableCharacter
  onSubmit(character: EditableCharacter): void
}
