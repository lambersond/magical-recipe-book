'use client'

import { useDishActions } from '../../hooks/use-cook-recipe'
import { useModals } from '@/hooks/use-modals'

export function PrepareRecipeButton() {
  const { prepare } = useDishActions()
  const { closeModal } = useModals()
  const onClick = () => {
    prepare()
    closeModal('PrepareRecipeModal')
  }

  return (
    <button
      onClick={onClick}
      className='bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg px-4 py-2 opacity-80 hover:opacity-100 transition-opacity disabled:opacity-50 disabled:bg-disabled disabled:cursor-not-allowed w-full cursor-pointer'
    >
      Complete Preparations
    </button>
  )
}
