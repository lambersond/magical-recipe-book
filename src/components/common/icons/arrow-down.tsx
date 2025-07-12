import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function ArrowDownIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='ArrowDownIcon'
      {...props}
      d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z'
    />
  )
}
