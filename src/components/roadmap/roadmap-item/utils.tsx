import { CheckCircle, Circle, Clock } from 'lucide-react'
import type { MouseEventHandler } from 'react'

export const updateStateAttribute: MouseEventHandler<HTMLButtonElement> = e => {
  const currentTarget = e.currentTarget
  const isOpen = currentTarget.dataset.state === 'true'
  const newState = (!isOpen).toString()
  currentTarget.dataset.state = newState

  const expandedSection = currentTarget.querySelector(
    '[data-expandable]',
  ) as HTMLDivElement
  if (expandedSection) {
    expandedSection.dataset.state = newState
  }
}

export const STATUS_ICONS = {
  completed: (
    <CheckCircle className='size-10 p-2 rounded-lg bg-success/10 text-success' />
  ),
  'in-progress': (
    <Clock className='size-10 p-2 rounded-lg bg-blue-400/20 text-blue-400' />
  ),
  upcoming: (
    <Circle className='size-10 p-2 rounded-lg bg-yellow-400/20 text-yellow-400' />
  ),
  planned: (
    <Circle className='size-10 p-2 rounded-lg bg-text-secondary/20 text-text-secondary' />
  ),
}

export const STATUS_COLORS = {
  completed: 'bg-success/10 text-success',
  'in-progress': 'bg-blue-400/20 text-blue-400',
  upcoming: 'bg-yellow-400/20 text-yellow-400',
  planned: 'bg-text-secondary/20 text-text-secondary',
}
