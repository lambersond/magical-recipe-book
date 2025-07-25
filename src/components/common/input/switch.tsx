import clsx from 'classnames'
import { isLargeSize, isMediumSize, isSmallSize } from '../utils'
import type { SwitchProps } from './types'

export function Switch({
  label,
  register,
  name = 'switch',
  disabled = false,
  defaultChecked = false,
  registerOptions,
  size = 'md',
  labelSize = 'md',
  labelClassName = 'text-text-primary',
  orientation = 'horizontal',
  leftText,
  rightText,
  color = 'primary',
  ...props
}: Readonly<SwitchProps>) {
  const classes = clsx(
    {
      'w-6 h-4 after:w-2.5 after:h-2.5 peer-checked:after:translate-x-2':
        isSmallSize(size),
      'w-9 h-6 after:w-4 after:h-4 peer-checked:after:translate-x-3':
        isMediumSize(size),
      'w-16 h-10 after:w-8 after:h-8 peer-checked:after:translate-x-6':
        isLargeSize(size),
      'bg-disabled after:bg-white/50': disabled,
      'bg-primary/40 after:bg-primary peer-checked:bg-primary peer-checked:after:bg-white':
        !disabled && color === 'primary',
      'bg-secondary/40 after:bg-secondary peer-checked:bg-secondary peer-checked:after:bg-white':
        !disabled && color === 'secondary',
      'bg-tertiary/40 after:bg-tertiary peer-checked:bg-tertiary peer-checked:after:bg-white':
        !disabled && color === 'tertiary',
    },
    'flex items-center flex-shrink-0 p-1 rounded-full duration-300 ease-in-out after:rounded-full after:shadow-md after:duration-300 group-hover:after:translate-x-1',
  )

  const hasLeftRightText = leftText || rightText

  return (
    <label
      className={clsx(
        {
          'text-md': isSmallSize(labelSize),
          'text-xl': isMediumSize(labelSize),
          'text-3xl': isLargeSize(labelSize),
          'text-text-secondary font-bold': orientation === 'vertical',
          'flex flex-row justify-between items-center':
            orientation === 'horizontal',
          'flex flex-col items-start': orientation === 'vertical',
        },
        'relative mb-4',
        orientation === 'horizontal' ? labelClassName : '',
      )}
      htmlFor={name}
    >
      {label}
      <div
        className={clsx('relative flex items-center', {
          'gap-3': hasLeftRightText,
          'ml-4': !hasLeftRightText,
        })}
      >
        {leftText && (
          <p
            className={clsx('select-none text-text-primary font-normal', {
              'text-md': isSmallSize(size),
              'text-xl': isMediumSize(size),
              'text-3xl': isLargeSize(size),
            })}
          >
            {leftText}
          </p>
        )}
        <input
          id={name}
          name={name}
          disabled={disabled}
          defaultChecked={defaultChecked}
          type='checkbox'
          className='cursor-pointer sr-only peer'
          {...register?.(name, registerOptions)}
          {...props}
        />
        <span className={classes} />
        {rightText && (
          <p
            className={clsx('select-none text-text-primary font-normal', {
              'text-md': isSmallSize(size),
              'text-xl': isMediumSize(size),
              'text-3xl': isLargeSize(size),
            })}
          >
            {rightText}
          </p>
        )}
      </div>
    </label>
  )
}
