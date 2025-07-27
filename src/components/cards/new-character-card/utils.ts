import clsx from 'classnames'
import type { NewCharacterCardProps } from './types'

export function newCharacterCardStyles({
  color,
  variant,
}: Required<NewCharacterCardProps>) {
  const containerClasses = clsx(
    {
      'text-text-primary': color === 'primary',
      'text-text-secondary hover:text-text-primary': color === 'secondary',
    },
    'flex flex-col items-center justify-center border-dashed border-2 border-text-primary/30 cursor-pointer hover:border-text-primary',
  )

  const titleClasses = clsx(
    {
      'text-lg before:content-["+"] before:mr-2': variant === 'small',
      'text-2xl mb-2': variant === 'large',
    },
    'font-bold',
  )

  return {
    containerClasses,
    titleClasses,
  }
}
