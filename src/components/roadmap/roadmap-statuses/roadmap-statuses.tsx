import { CheckCircle, Clock, Calendar } from 'lucide-react'
import { RoadmapStatus } from './roadmap-status'
import type { RoadmapStatusesProps } from './types'

export function RoadmapStatuses({
  completed,
  inProgress,
  upcoming,
  planned,
}: Readonly<RoadmapStatusesProps>) {
  const statuses = [
    {
      label: 'Completed',
      count: completed,
      icon: <CheckCircle className='size-5 text-green-400' />,
    },
    {
      label: 'In Progress',
      count: inProgress,
      icon: <Clock className='size-5 text-blue-400' />,
    },
    {
      label: 'Upcoming',
      count: upcoming,
      icon: <Calendar className='size-5 text-yellow-400' />,
    },
    {
      label: 'Planned',
      count: planned,
      icon: <Calendar className='size-5 text-gray-400' />,
    },
  ]

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12'>
      {statuses.map((status, index) => (
        <RoadmapStatus key={index} {...status} />
      ))}
    </div>
  )
}
