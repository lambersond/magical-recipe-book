import React from 'react'
import { TimelineItem } from './timeline-item'
import { TimelineProps } from './types'

export function Timeline({
  children,
  className = '',
}: Readonly<TimelineProps>) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <TimelineItem key={index} isLast={index === childrenArray.length - 1}>
          {child}
        </TimelineItem>
      ))}
    </div>
  )
}
