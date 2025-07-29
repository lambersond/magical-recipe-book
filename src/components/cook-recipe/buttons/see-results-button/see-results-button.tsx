import { SeeResultsButtonProps } from './types'

export function SeeResultsButton({
  disabled,
  onClick,
}: Readonly<SeeResultsButtonProps>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='cursor-pointer bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg px-4 py-2 opacity-80 hover:opacity-100 transition-opacity disabled:opacity-20 disabled:bg-disabled disabled:cursor-not-allowed w-full'
    >
      {disabled ? 'Input Roll Result' : 'See Results'}
    </button>
  )
}
