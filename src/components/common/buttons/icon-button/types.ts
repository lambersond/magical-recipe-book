import type { Color, Size } from '@/types'
import type { ElementType, EventHandler, SVGAttributes } from 'react'

export type IconButtonProps = {
  text?: React.ReactNode
  size?: Size
  color?: Color
  disabled?: boolean
  showBorder?: boolean
  className?: string
  onClick?: EventHandler<React.MouseEvent<HTMLButtonElement>>
  Icon: ElementType<SVGAttributes<SVGElement>>
}
