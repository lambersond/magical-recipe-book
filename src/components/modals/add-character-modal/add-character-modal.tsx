'use client'

import { Modal } from '@/components/common'
import { AddCharacterForm } from '@/components/forms'
import { useModals } from '@/hooks/use-modals'
import type { AddCharacterModalProps } from './types'

export function AddCharacterModal({
  onSubmit,
  open,
}: Readonly<AddCharacterModalProps>) {
  const { closeModal } = useModals()

  const handleOnSubmit = (character: any) => {
    onSubmit(character)
    onClose()
  }

  const onClose = () => {
    closeModal('AddCharacterModal')
  }

  return (
    <Modal title='Add Character' isOpen={!!open} onClose={onClose}>
      <AddCharacterForm onSubmit={handleOnSubmit} />
    </Modal>
  )
}
