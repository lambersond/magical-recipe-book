'use client'

import { DifficultyChallengeChip } from '@/components/chips'
import { Modal } from '@/components/common'
import { PrepareRecipe } from '@/components/cook-recipe'
import { useModals } from '@/hooks/use-modals'
import type { PrepareRecipeModalProps } from './types'

export function PrepareRecipeModal({
  open,
  recipe,
  ingredientsPouch,
  onPrepare,
}: Readonly<PrepareRecipeModalProps>) {
  const { closeModal } = useModals()

  const onClose = () => {
    closeModal('PrepareRecipeModal')
  }

  if (!open || !recipe || !ingredientsPouch) {
    return
  }

  return (
    <Modal
      title={recipe.name}
      headerClassName='border-b border-border'
      width='w-sm md:w-lg'
      subtitle={<DifficultyChallengeChip difficulty={recipe.difficulty} />}
      isOpen={!!open}
      onClose={onClose}
    >
      <PrepareRecipe
        recipe={recipe}
        ingredientsPouch={ingredientsPouch}
        onPrepare={onPrepare}
      />
    </Modal>
  )
}
