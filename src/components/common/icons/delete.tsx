import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function DeleteIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='DeleteIcon'
      {...props}
      d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z'
    />
  )
}
