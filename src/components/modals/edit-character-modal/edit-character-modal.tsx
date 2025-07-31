'use client'

import { Modal } from '@/components/common'
import { EditCharacterForm } from '@/components/forms'
import { useLazyDataFetching } from '@/hooks/use-lazy-data-fetching'
import { useModals } from '@/hooks/use-modals'
import type { EditCharacterModalProps } from './types'
import type { EditableCharacter } from '@/types'

export function EditCharacterModal({
  character,
  onSubmit,
  open,
}: Readonly<EditCharacterModalProps>) {
  const { closeModal } = useModals()
  const existingCharacterNames = useLazyDataFetching<string[]>({
    url: '/api/characters/names',
    enabled: !!open,
    transform: data =>
      data.filter(name => name.toLowerCase() !== character.name.toLowerCase()),
  })

  const handleOnSubmit = (character: EditableCharacter) => {
    onSubmit(character)
    onClose()
  }

  const onClose = () => {
    closeModal('EditCharacterModal')
  }

  return (
    <Modal title='Edit Character' isOpen={!!open} onClose={onClose}>
      <EditCharacterForm
        onSubmit={handleOnSubmit}
        character={character}
        existingCharacterNames={existingCharacterNames}
      />
    </Modal>
  )
}
