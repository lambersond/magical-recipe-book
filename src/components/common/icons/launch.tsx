import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function LaunchIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='LaunchIcon'
      {...props}
      d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z'
    />
  )
}
