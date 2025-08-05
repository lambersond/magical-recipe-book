import { useModals } from '@/hooks/use-modals'

export function ContinueAdventuringButton() {
  const { closeModal } = useModals()

  const onClick = () => {
    closeModal('FinishCookedDishModal')
    closeModal('CookRecipeModal')
  }

  return (
    <button
      className='cursor-pointer w-full text-center font-semibold text-lg bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-4 py-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
      onClick={onClick}
    >
      Continue Adventuring
    </button>
  )
}
