'use client'

import { Trash, Utensils } from 'lucide-react'
import { actionButtonClasses } from './utils'
import type { ActionButtonProps } from './types'

export function ActionButton({ onClick, type }: Readonly<ActionButtonProps>) {
  const buttonClasses = actionButtonClasses(type)

  return (
    <button onClick={onClick} className={buttonClasses}>
      {type === 'consume' && <Utensils className='inline size-6' />}
      {type === 'discard' && <Trash className='inline size-6' />}
    </button>
  )
}
