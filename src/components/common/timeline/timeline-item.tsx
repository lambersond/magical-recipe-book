'use client'

import clsx from 'classnames'
import type { TimelineItemProps } from './types'

export function TimelineItem({
  children,
  isLast = false,
}: Readonly<TimelineItemProps>) {
  const classes = clsx('size-3 rounded-full shadow-lg', 'bg-primary')
  return (
    <div className='flex pb-4'>
      <div className='flex flex-col items-center mr-2'>
        <div className={classes} />
        {/* Vertical line */}
        {!isLast && <div className='w-0.5 bg-border flex-1 mt-1' />}
      </div>
      <div className='flex-1 min-w-0'>{children}</div>
    </div>
  )
}
