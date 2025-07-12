import { Modal } from '@/components/common'
import { useModals } from '@/hooks/use-modals'
import { primaryButton, secondaryButton } from '@/utils/styles'
import type { ConfirmModalProps } from './types'

export function ConfirmModal({
  onConfirm,
  open = true,
  message = 'Are you sure you want to proceed?',
  title = 'Confirmation',
}: Readonly<ConfirmModalProps>) {
  const { closeModal } = useModals()

  const onClose = () => {
    closeModal('ConfirmModal')
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal title={title} isOpen={open} onClose={onClose}>
      <p className='my-8 font-bold italic'>{message}</p>
      <div className='flex justify-end mt-4 gap-2'>
        <button onClick={onClose} className={secondaryButton}>
          Cancel
        </button>
        <button onClick={handleConfirm} className={primaryButton}>
          Confirm
        </button>
      </div>
    </Modal>
  )
}
