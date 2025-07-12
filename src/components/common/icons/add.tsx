import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function AddIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='AddIcon'
      {...props}
      d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z'
    />
  )
}
