'use client'

import { DifficultyChallengeChip } from '@/components/chips'
import { Modal } from '@/components/common'
import { FinishCookedDish } from '@/components/cook-recipe'
import { useModals } from '@/hooks/use-modals'
import type { FinishCookedDishModalProps } from './types'

export function FinishCookedDishModal({
  characterId,
  cookedDish,
  onCook,
  open,
}: Readonly<FinishCookedDishModalProps>) {
  const { closeModal } = useModals()

  const onClose = () => {
    closeModal('FinishCookedDishModal')
  }

  if (!open || !cookedDish) {
    return
  }

  return (
    <Modal
      title={cookedDish.recipe.name}
      headerClassName='border-b border-border'
      width='w-sm md:w-lg'
      subtitle={
        <DifficultyChallengeChip difficulty={cookedDish.recipe.difficulty} />
      }
      isOpen={!!open}
      onClose={onClose}
    >
      <FinishCookedDish
        characterId={characterId}
        cookedDish={cookedDish}
        onCook={onCook}
      />
    </Modal>
  )
}
