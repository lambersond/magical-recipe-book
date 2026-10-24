'use client'

import { ChefHat, Send, Trash } from 'lucide-react'
import { actionButtonClasses } from './utils'
import type { ActionButtonProps } from './types'

const LABELS = {
  consume: 'Finish',
  discard: 'Discard',
  send: 'Send to Foundry',
} as const

export function ActionButton({
  onClick,
  type,
  disabled,
}: Readonly<ActionButtonProps>) {
  const buttonClasses = actionButtonClasses(type)

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      aria-label={LABELS[type]}
    >
      {type === 'consume' && <ChefHat className='inline size-6' />}
      {type === 'discard' && <Trash className='inline size-6' />}
      {type === 'send' && <Send className='inline size-6' />}
    </button>
  )
}
