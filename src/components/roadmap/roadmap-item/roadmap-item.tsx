'use client'

import { CheckCircle, Circle, Calendar, Target } from 'lucide-react'
import { STATUS_COLORS, STATUS_ICONS, updateStateAttribute } from './utils'
import { Card } from '@/components/common'
import type { RoadmapItemProps } from './types'

export function RoadmapItem({
  phase,
  quarter,
  status,
  progress,
  description,
  milestones,
  deliverables,
}: Readonly<RoadmapItemProps>) {
  return (
    <Card
      className='transition-all'
      data-state='false'
      onClick={updateStateAttribute}
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-3'>
          {STATUS_ICONS[status]}
          <div className='flex flex-col items-start'>
            <h3 className='text-xl font-semibold'>{phase}</h3>
            <p className='text-text-secondary'>{quarter}</p>
          </div>
        </div>
        <span
          className={`hidden sm:block px-3 py-1 rounded-full text-xs ${STATUS_COLORS[status]}`}
        >
          {status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <p className='text-text-primary text-left mb-4'>{description}</p>

      {/* Progress bar */}
      <div className='mb-4'>
        <div className='flex justify-between text-sm text-text-secondary mb-2'>
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className='w-full bg-border rounded-full h-2'>
          <div
            className='bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Expanded details */}
      <div
        data-expandable
        className='overflow-hidden transition-all duration-300 ease-in-out border-t border-border grid lg:grid-cols-2 pt-4 data-[state=false]:max-h-0 data-[state=false]:opacity-0 data-[state=false]:mt-0 data-[state=true]:max-h-[1000px] data-[state=true]:opacity-100 data-[state=true]:mt-4'
        data-state='false'
      >
        {/* Milestones */}
        <div className='flex flex-col '>
          <span className='font-semibold flex items-center gap-2'>
            <Calendar className='size-4' />
            <p className='text-lg mt-0.5'>Milestones</p>
          </span>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className='flex items-center gap-3 py-1 rounded-lg'
              >
                {milestone.completed ? (
                  <CheckCircle className='size-4 text-success flex-shrink-0' />
                ) : (
                  <Circle className='size-4 text-text-secondary flex-shrink-0' />
                )}
                <div className='flex-1 min-w-0 text-left'>
                  <span
                    className={
                      milestone.completed
                        ? 'text-text-primary'
                        : 'text-text-secondary'
                    }
                  >
                    {milestone.task}
                  </span>
                  <div className='text-xs text-text-secondary'>
                    {milestone.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <h4 className='font-semibold flex items-center gap-2'>
            <Target className='size-4' />
            <p className='text-lg mt-0.5'>Deliverables</p>
          </h4>
          <ul className='text-text-primary/80 space-y-1 text-left ml-3 lg:ml-0 pt-2'>
            {deliverables.map((deliverable, idx) => (
              <li key={idx} className='text-sm'>
                • {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
