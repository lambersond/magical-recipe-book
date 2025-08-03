import { PrepareRecipeButton } from '../../buttons'

export function Prepare() {
  return (
    <span className='flex flex-col items-center justify-between h-full gap-6'>
      <span className='flex flex-col items-center justify-center h-full gap-4 mx-auto'>
        <p className='text-6xl'>🍽️</p>
        <span className='flex items-center gap-2'>
          <p className='text-3xl'>Prepare for Later</p>
        </span>
        <p className='text-text-secondary text-center text-sm mb-4'>
          This recipe will be prepared and stored in your backpack. You can
          finish cooking it later to find out the results. Remember, you have{' '}
          <b>7</b> days to finish cooking or the dish will spoil!
        </p>
      </span>
      <PrepareRecipeButton />
    </span>
  )
}
