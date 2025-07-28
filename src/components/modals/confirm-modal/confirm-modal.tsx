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
  color = 'primary',
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
          <button onClick={onClose} className={colorMap.cancel[color]}>
            {cancelButtonText}
          </button>
        )}
        <button onClick={handleConfirm} className={colorMap.confirm[color]}>
          {confirmButtonText}
        </button>
      </div>
    </Modal>
  )
}

const colorMap = {
  confirm: {
    primary: primaryButton,
    danger:
      'px-4 py-2 bg-error/20 text-error hover:bg-red-800 hover:text-red-300 cursor-pointer rounded-lg text-lg font-bold uppercase',
  },
  cancel: {
    primary: secondaryButton,
    danger:
      'px-4 py-2 text-text-secondary border-2 border-border  hover:text-text-primary/70 hover:border-text-primary/70 hover:text-text-primary/70 cursor-pointer rounded-lg text-lg font-bold uppercase',
  },
}
