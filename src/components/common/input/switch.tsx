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
  labelClassName = 'text-text-primary',
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
      'bg-secondary/40 after:bg-secondary peer-checked:bg-secondary peer-checked:after:bg-white':
        !disabled,
    },
    'flex items-center flex-shrink-0 ml-4 p-1 rounded-full duration-300 ease-in-out after:rounded-full after:shadow-md after:duration-300 group-hover:after:translate-x-1',
  )
  return (
    <label
      className={clsx(
        {
          'text-md': isSmallSize(size),
          'text-xl': isMediumSize(size),
          'text-3xl': isLargeSize(size),
        },
        'relative flex flex-row justify-between items-center mb-4',
        labelClassName,
      )}
      htmlFor={name}
    >
      {label}
      <input
        id={name}
        name={name}
        disabled={disabled}
        defaultChecked={defaultChecked}
        type='checkbox'
        className='cursor-pointer absolute w-1/2 left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md'
        {...register?.(name, registerOptions)}
        {...props}
      />
      <span className={classes} />
    </label>
  )
}
