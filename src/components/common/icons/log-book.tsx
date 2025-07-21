import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function LogBookIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='LogBookIcon'
      {...props}
      d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-1 9H9V9h10zm-4 4H9v-2h6zm4-8H9V5h10z'
    />
  )
}
