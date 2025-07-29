'use client'

import { Modal } from '@/components/common'
import { useModals } from '@/hooks/use-modals'
import type { CookRecipeModalProps } from './types'

export function CookRecipeModal({
  // onSubmit,
  open,
}: Readonly<CookRecipeModalProps>) {
  const { closeModal } = useModals()

  // const handleOnSubmit = (character: any) => {
  //   onSubmit(character)
  //   onClose()
  // }

  const onClose = () => {
    closeModal('CookRecipeModal')
  }

  return (
    <Modal title='{DISH_NAME}' isOpen={!!open} onClose={onClose}>
      <div>ehllo</div>
    </Modal>
  )
}
