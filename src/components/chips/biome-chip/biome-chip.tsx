import { Tooltip } from '@/components/common'
import type { BiomeChipProps } from './types'

export function BiomeChip({ name, description }: Readonly<BiomeChipProps>) {
  return (
    <Tooltip
      placement='top'
      contentContainerClasses='bg-paper border border-border rounded-sm max-w-xs'
      title={
        <div className='text-xs p-2 flex flex-col gap-1'>
          <p className='text-text-secondary italic mb-1'>{description}</p>
        </div>
      }
      asChild
    >
      <div className='text-xs rounded-sm px-2 py-1 border flex min-w-fit items-center'>
        <p>{name}</p>
      </div>
    </Tooltip>
  )
}
