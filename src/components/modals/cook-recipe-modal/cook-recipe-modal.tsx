'use client'

import { DifficultyChallengeChip } from '@/components/chips'
import { Modal } from '@/components/common'
import { CookRecipe } from '@/components/cook-recipe'
import { useModals } from '@/hooks/use-modals'
import type { CookRecipeModalProps } from './types'

export function CookRecipeModal({
  ingredientsPouch,
  onCook,
  open,
  recipe,
}: Readonly<CookRecipeModalProps>) {
  const { closeModal } = useModals()

  const onClose = () => {
    closeModal('CookRecipeModal')
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
      <CookRecipe
        recipe={recipe}
        ingredientsPouch={ingredientsPouch}
        onCook={onCook}
      />
    </Modal>
  )
}
