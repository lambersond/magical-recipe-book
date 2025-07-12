import type { Size } from '@/types'
import type { MouseEventHandler } from 'react'

export type ChipProps = {
  size?: Size
  label: string
  onRemove?: MouseEventHandler<HTMLButtonElement>
  isNew?: boolean
}
