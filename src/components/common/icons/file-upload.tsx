import { Icon } from './icon'
import type { SVGAttributes } from 'react'

export function FileUploadIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <Icon
      data-testid='FileUploadIcon'
      {...props}
      d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z'
    />
  )
}
