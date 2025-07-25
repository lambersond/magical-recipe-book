import { Modal } from '@/components/common'
import { useModals } from '@/hooks/use-modals'
import { primaryButton, secondaryButton } from '@/utils/styles'
import type { ConfirmModalProps } from './types'

export function ConfirmModal({
  onConfirm,
  open = true,
  message = 'Are you sure you want to proceed?',
  title = 'Confirmation',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  hideCancelButton = false,
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
      <span className='my-8 font-bold italic'>{message}</span>
      <div className='flex justify-end mt-4 gap-2'>
        {!hideCancelButton && (
          <button onClick={onClose} className={secondaryButton}>
            {cancelButtonText}
          </button>
        )}
        <button onClick={handleConfirm} className={primaryButton}>
          {confirmButtonText}
        </button>
      </div>
    </Modal>
  )
}
