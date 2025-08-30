import type { MenuProps } from '../menu/types'
import type { MouseEventHandler } from 'react'

export type CardProps = {
  children: React.ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  overrideViews?: boolean
}

export type CardWithActionsProps = Omit<CardProps, 'children'> & {
  title: React.ReactNode
  children?: React.ReactNode
  options: MenuProps['options']
}

export type CollapsibleCardProps = {
  id?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
  classNames?: string
}
