'use client'

import { LucideIcon } from 'lucide-react'

type ButtonGroupProps<T extends string> = {
  options: {
    id: T
    icon?: LucideIcon
    text?: string
  }[]
  selected: T
  onChange(id: T): void
}

export function ButtonGroup<T extends string>({
  options,
  selected,
  onChange,
}: ButtonGroupProps<T>) {
  return (
    <div className='bg-paper flex items-center rounded-sm p-1 w-fit gap-1'>
      {options.map(option => {
        const isSelected = selected === option.id
        const Icon = option.icon

        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`p-2 hover:bg-paper-hover rounded-sm transition-colors flex items-center gap-2 cursor-pointer ${
              isSelected ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            {Icon && <Icon className='size-4' />}
            {option.text && <span>{option.text}</span>}
          </button>
        )
      })}
    </div>
  )
}
