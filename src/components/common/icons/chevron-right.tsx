import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function ChevronRightIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='ChevronRightIcon'
      {...props}
      d='M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'
    />
  )
}
