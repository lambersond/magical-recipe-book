'use client'

import {
  useCookingApi,
  useIsCooking,
  useIsReady,
} from '../../hooks/use-cook-recipe'

export function SelectionButton() {
  const isReady = useIsReady()
  const isCooking = useIsCooking()
  const { startCooking, startPreparing } = useCookingApi()
  const readyText = isCooking ? 'Cook Recipe' : 'Prepare Recipe'

  const onClick = () => {
    if (isCooking) {
      startCooking()
    } else {
      startPreparing()
    }
  }

  return (
    <button
      disabled={!isReady}
      onClick={onClick}
      className='bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg px-4 py-2 opacity-80 hover:opacity-100 transition-opacity disabled:opacity-20 disabled:bg-disabled disabled:cursor-not-allowed w-full cursor-pointer'
    >
      {isReady ? readyText : 'Select All Magical Ingredients'}
    </button>
  )
}
