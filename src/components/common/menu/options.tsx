import { handleOnClick } from './utils'
import type { OptionsProps } from './types'

export function Options({ options, indent = false }: Readonly<OptionsProps>) {
  return (
    <>
      {options.map(({ label, onClick, icon }) => (
        <button
          key={label}
          onClick={handleOnClick(onClick)}
          className={`${indent ? 'pl-4' : 'pl-2'} w-full p-2 gap-2 text-text-secondary hover:text-text-primary text-md flex items-center justify-between cursor-pointer hover:bg-white/5 focus:outline-none`}
        >
          {label}
          {icon}
        </button>
      ))}
    </>
  )
}
