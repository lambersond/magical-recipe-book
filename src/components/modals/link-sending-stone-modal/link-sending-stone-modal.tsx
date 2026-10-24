'use client'

import { useState } from 'react'
import { Modal } from '@/components/common'
import { LinkSendingStoneForm } from '@/components/forms'
import { useModals } from '@/hooks/use-modals'
import { secondaryButton } from '@/utils/styles'
import type { LinkSendingStoneModalProps } from './types'

export function LinkSendingStoneModal({
  open,
  characterName,
  linkedAt,
  onLink,
  onUnlink,
}: Readonly<LinkSendingStoneModalProps>) {
  const { closeModal } = useModals()
  const [error, setError] = useState('')

  const onClose = () => {
    setError('')
    closeModal('LinkSendingStoneModal')
  }

  const run = async (action: () => Promise<void>) => {
    try {
      await action()
      onClose()
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'Could not save')
    }
  }

  return (
    <Modal
      title={`📨 ${characterName ?? 'Sending Stone'}`}
      isOpen={!!open}
      onClose={onClose}
    >
      <p className='text-text-secondary text-sm py-4'>
        Paste the link code Sending Stone gives you for this character. Dishes
        you send then reach your game, where your Gamemaster chooses who ate
        them.
      </p>
      {!!linkedAt && (
        <div className='flex items-center justify-between gap-2 pb-4'>
          <p className='text-sm text-text-primary'>
            Linked on {new Date(linkedAt).toLocaleDateString()}. A new code
            replaces it.
          </p>
          <button
            type='button'
            className={secondaryButton}
            onClick={() => run(onUnlink)}
          >
            Unlink
          </button>
        </div>
      )}
      {open && (
        <LinkSendingStoneForm onSubmit={token => run(() => onLink(token))} />
      )}
      {error && <p className='text-danger text-sm pt-2'>{error}</p>}
    </Modal>
  )
}
