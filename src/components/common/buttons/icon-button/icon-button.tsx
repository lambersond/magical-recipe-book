import classNames from 'classnames'
import { SIZE } from '../../constants'
import { IconButtonProps } from './types'
import {
  isPrimaryColor,
  isSecondaryColor,
  isTertiaryColor,
  isTransparentColor,
} from './utils'
import {
  isExtraSmallSize,
  isLargeSize,
  isMediumSize,
  isSmallSize,
} from '@/components/common/utils'

export function IconButton({
  size = 'md',
  color = 'primary',
  disabled = false,
  className = '',
  showBorder = false,
  onClick,
  Icon,
  text,
  ...buttonProps
}: Readonly<IconButtonProps>) {
  const dimensions = SIZE[size]

  const classes = classNames(
    {
      'bg-primary text-tertiary hover:bg-primary/90': isPrimaryColor(color),
      'bg-secondary text-tertiary hover:bg-secondary/90':
        isSecondaryColor(color),
      'bg-tertiary text-secondary hover:bg-tertiary/90': isTertiaryColor(color),
      'bg-transparent text-tertiary hover:text-text-primary hover:bg-text-secondary/30':
        isTransparentColor(color),
      'bg-gray-200 text-gray-500 cursor-not-allowed': disabled,
      'cursor-pointer hover:text-text-primary': !disabled,
      'size-6': isExtraSmallSize(size),
      'size-8': isSmallSize(size),
      'size-10': isMediumSize(size),
      'size-12': isLargeSize(size),
      'border-2 border-secondary rounded-lg px-4 hover:border-text-primary':
        showBorder,
      'border-transparent': !showBorder,
    },
    'min-w-fit rounded-full p-1 flex items-center justify-center flex justify-between',
    className,
  )

  return (
    <button className={classes} onClick={onClick} {...buttonProps}>
      {text}
      <Icon
        height={dimensions.icon}
        width={dimensions.icon}
        className='min-w-fit min-h-fit'
      />
    </button>
  )
}
