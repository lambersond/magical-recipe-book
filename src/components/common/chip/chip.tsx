import { IconButton } from '../button'
import { SIZE } from '../constants'
import { CloseIcon, NewIcon } from '../icons'
import { Tooltip } from '../tooltip'
import type { ChipProps } from './types'
import type { MouseEvent } from 'react'

const ICON_BUTTON_SIZE = { xs: 'sm', sm: 'sm', md: 'md', lg: 'lg' } as const

export function Chip({
  isNew,
  onRemove,
  size = 'sm',
  label,
}: Readonly<ChipProps>) {
  const handleOnRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onRemove?.(e)
  }

  return (
    <div className='flex items-center rounded-full border-2 border-secondary/60 w-fit'>
      {isNew && (
        <Tooltip title='New Microservice' asChild>
          <NewIcon className={`${SIZE[size].icon} p-1 text-yellow-400 ml-1`} />
        </Tooltip>
      )}
      <p className={`text-${size} px-2`}>{label}</p>
      {typeof onRemove === 'function' && (
        <IconButton
          icon={CloseIcon}
          tooltip='Remove'
          size={ICON_BUTTON_SIZE[size]}
          intent='text-primary'
          onClick={handleOnRemove}
        />
      )}
    </div>
  )
}
