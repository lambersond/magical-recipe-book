import type { EditableCharacter } from '@/types'

export type AddCharacterFormProps = {
  onSubmit(character: EditableCharacter): void
  existingCharacterNames: string[]
}
