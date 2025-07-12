import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function CheckIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='CheckIcon'
      {...props}
      d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
    />
  )
}
