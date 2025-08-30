'use client'

import { ChevronDown } from 'lucide-react'
import {
  expandablePaneClasses,
  updateStateAttributeAdvanced,
} from '@/utils/expandable'
import type { CollapsibleCardProps } from './types'

export function CollapsibleCard({
  id = 'collapsible-card',
  title,
  subtitle,
  children,
  classNames,
}: CollapsibleCardProps) {
  return (
    <section
      className={classNames}
      data-state='false'
      onClick={updateStateAttributeAdvanced(id)}
    >
      <div className='flex items-start justify-between cursor-pointer text-text-secondary'>
        <span className='flex flex-col flex-grow self-center'>
          {title}
          {subtitle}
        </span>
        <ChevronDown
          data-expandable
          className='data-[state=true]:rotate-180 transform transition-transform flex-shrink p-2 hover:text-text-primary hover:bg-hover rounded-full size-10 ml-2'
        />
      </div>
      <section
        data-expandable
        id={id}
        className={expandablePaneClasses}
        data-state='false'
        onClick={e => e.stopPropagation()}
      >
        {children}
      </section>
    </section>
  )
}
