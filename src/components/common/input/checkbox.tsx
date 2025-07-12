import clsx from 'classnames'
import { CheckboxBlankIcon, CheckboxIcon } from '../icons'
import { isLargeSize, isMediumSize, isSmallSize } from '../utils'
import { CheckboxProps } from './types'

export function Checkbox({
  label,
  register,
  name = 'checkbox',
  disabled = false,
  registerOptions,
  size = 'md',
  labelClassName = 'text-text-primary',
  ...props
}: Readonly<CheckboxProps>) {
  const classes = clsx({
    'size-6': isSmallSize(size),
    'size-8': isMediumSize(size),
    'size-10': isLargeSize(size),
  })
  return (
    <label
      className={clsx(
        {
          'text-md': isSmallSize(size),
          'text-xl': isMediumSize(size),
          'text-3xl': isLargeSize(size),
        },
        'inline-flex items-center cursor-pointer',
        labelClassName,
      )}
      htmlFor={name}
    >
      <input
        id={name}
        name={name}
        disabled={disabled}
        type='checkbox'
        className='sr-only peer'
        {...register?.(name, registerOptions)}
        {...props}
      />
      {props.checked ? (
        <CheckboxIcon className={classes} />
      ) : (
        <CheckboxBlankIcon className={`${classes} text-tertiary`} />
      )}
      <p className='ml-2 text-text-secondary select-none'>{label}</p>
    </label>
  )
}
