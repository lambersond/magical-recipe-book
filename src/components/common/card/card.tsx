import classNames from 'classnames'
import { card } from '@/utils/styles'
import type { CardProps } from './types'

export function Card({
  children,
  className,
  onClick,
  overrideViews,
}: Readonly<CardProps>) {
  const classes = classNames(
    {
      [card]: !overrideViews,
      'hover:border-hover cursor-pointer': !!onClick,
    },
    className,
  )

  if (onClick) {
    return (
      <button className={classes} onClick={onClick} data-testid='Card'>
        {children}
      </button>
    )
  }
  return (
    <div className={classes} data-testid='Card'>
      {children}
    </div>
  )
}
