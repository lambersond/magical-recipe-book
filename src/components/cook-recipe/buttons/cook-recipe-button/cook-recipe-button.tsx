'use client'

import { useCookingApi, useIsReady } from '../../hooks/use-cook-recipe'

export function CookRecipeButton() {
  const isReady = useIsReady()
  const { startCooking } = useCookingApi()

  const onClick = () => {
    startCooking()
  }

  return (
    <button
      disabled={!isReady}
      onClick={onClick}
      className='bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg px-4 py-2 hover:opacity-50 transition-opacity disabled:opacity-20 disabled:bg-disabled disabled:cursor-not-allowed w-full cursor-pointer'
    >
      {isReady ? 'Cook Recipe' : 'Select All Magical Ingredients'}
    </button>
  )
}
