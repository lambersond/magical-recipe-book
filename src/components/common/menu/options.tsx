import { Fragment } from 'react'
import { handleOnClick } from './utils'
import type { OptionsProps } from './types'

export function Options({ options, indent = false }: Readonly<OptionsProps>) {
  return (
    <>
      {options.map(({ label, onClick, icon, divider, color = 'primary' }) => (
        <Fragment key={label}>
          {divider && <div className='border-t border-white/10' />}
          <button
            onClick={handleOnClick(onClick)}
            className={`${indent ? 'pl-4' : 'pl-2'} w-full p-2 gap-2 ${colorMap[color]} text-md flex items-center justify-between cursor-pointer hover:bg-white/5 focus:outline-none`}
          >
            {label}
            {icon}
          </button>
        </Fragment>
      ))}
    </>
  )
}

const colorMap = {
  primary: 'text-text-secondary hover:text-text-primary',
  danger: 'text-error/60 hover:text-error',
}
