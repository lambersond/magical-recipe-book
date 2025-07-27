'use client'

import { Modal } from '@/components/common'
import { EditCharacterForm } from '@/components/forms'
import { useModals } from '@/hooks/use-modals'
import type { EditCharacterModalProps } from './types'
import type { EditableCharacter } from '@/types'

export function EditCharacterModal({
  character,
  onSubmit,
  open,
}: Readonly<EditCharacterModalProps>) {
  const { closeModal } = useModals()

  const handleOnSubmit = (character: EditableCharacter) => {
    onSubmit(character)
    onClose()
  }

  const onClose = () => {
    closeModal('EditCharacterModal')
  }

  return (
    <Modal title='Edit Character' isOpen={!!open} onClose={onClose}>
      <EditCharacterForm onSubmit={handleOnSubmit} character={character} />
    </Modal>
  )
}
