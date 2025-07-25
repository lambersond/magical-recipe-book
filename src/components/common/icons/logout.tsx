import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function LogoutIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='LogoutIcon'
      {...props}
      d='m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z'
    />
  )
}
