import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function ChevronLeftIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='ChevronLeftIcon'
      {...props}
      d='M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
    />
  )
}
