import { Card } from '@/components/common'
import type { RoadmapStatusProps } from './types'

export function RoadmapStatus({
  label,
  count,
  icon,
}: Readonly<RoadmapStatusProps>) {
  return (
    <Card className='flex gap-1 sm:gap-2 flex-col sm:flex-row justify-between items-center'>
      <div className='flex items-center gap-2'>
        {icon}
        <span className='text-lg text-text-secondary'>{label}</span>
      </div>
      <span className='text-4xl font-bold'>{count}</span>
    </Card>
  )
}
