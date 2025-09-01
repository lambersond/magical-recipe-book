import clsx from 'classnames'
import type { RollableFieldProps } from './types'

export function getStyles({
  topLabelColor,
  bottomLabelColor,
  number,
}: Pick<RollableFieldProps, 'topLabelColor' | 'bottomLabelColor' | 'number'>) {
  const topLabelClasses = clsx(
    {
      'text-text-primary': topLabelColor === 'primary',
      'text-text-secondary': topLabelColor === 'secondary',
      'text-text-tertiary': topLabelColor === 'tertiary',
    },
    'text-xs uppercase font-bold tracking-tighter',
  )

  const bottomLabelClasses = clsx(
    {
      'text-text-primary': bottomLabelColor === 'primary',
      'text-text-secondary': bottomLabelColor === 'secondary',
      'text-text-tertiary': bottomLabelColor === 'tertiary',
    },
    'text-xs uppercase font-bold tracking-tighter',
  )

  const numberClasses = clsx(
    'text-2xl font-bold border border-border rounded-md cursor-pointer px-3 py-1 hover:bg-black/10 transition-colors duration-200',
    {
      'before:content-["+"] before:text-text-secondary before:mr-1': number > 0,
      'before:content-["-"] before:text-text-secondary before:mr-1': number < 0,
    },
  )

  return { topLabelClasses, bottomLabelClasses, numberClasses }
}
