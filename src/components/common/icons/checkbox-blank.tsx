import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function CheckboxBlankIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='CheckboxBlankIcon'
      {...props}
      d='M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2'
    />
  )
}
