import type { NewCharacter } from '@/types'

export type AddCharacterFormProps = {
  onSubmit(character: NewCharacter): void
}
