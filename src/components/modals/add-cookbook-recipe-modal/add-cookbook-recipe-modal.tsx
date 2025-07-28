'use client'

import { Modal } from '@/components/common'
import { DropdownOption } from '@/components/common/dropdown'
import { AddCookbookRecipeForm } from '@/components/forms'
import { useLazyDataFetching } from '@/hooks/use-lazy-data-fetching'
import { useModals } from '@/hooks/use-modals'
import { LearnRecipe, Recipe } from '@/types'
import type { AddCookbookRecipeModalProps } from './types'

export function AddCookbookRecipeModal({
  onSubmit,
  open = false,
}: Readonly<AddCookbookRecipeModalProps>) {
  const { closeModal } = useModals()

  const options = useLazyDataFetching({
    url: '/api/recipes',
    enabled: open,
    transform: (recipes: Recipe[]) =>
      recipes.map(item => ({
        id: item.id,
        label: item.name,
        searchText: item.name,
        value: item.id,
      })) as DropdownOption[],
  })

  const handleOnSubmit = async (data: LearnRecipe) => {
    onSubmit(data)
    onClose()
  }

  const onClose = () => {
    closeModal('AddCookbookRecipeModal')
  }

  return (
    <Modal title='Learn a New Recipe' isOpen={!!open} onClose={onClose}>
      <AddCookbookRecipeForm onSubmit={handleOnSubmit} options={options} />
    </Modal>
  )
}
