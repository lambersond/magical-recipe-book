'use client'

import { CharacterSettingsPanel } from './character-settings-panel'
import { Modal } from '@/components/common'
import { useModals } from '@/hooks/use-modals'
import type { CharacterSettingsModalProps } from './types'

export function CharacterSettingsModal({
  open,
  characterName,
  ...props
}: Readonly<CharacterSettingsModalProps>) {
  const { closeModal } = useModals()

  const onClose = () => {
    closeModal('CharacterSettingsModal')
  }

  return (
    <Modal
      title='⚙️ Character Settings'
      subtitle={
        !!characterName && (
          <p className='text-sm text-text-secondary'>{characterName}</p>
        )
      }
      isOpen={!!open}
      onClose={onClose}
    >
      {/* Mounted while open, so each opening starts from the saved settings */}
      {open && <CharacterSettingsPanel {...props} onClose={onClose} />}
    </Modal>
  )
}
