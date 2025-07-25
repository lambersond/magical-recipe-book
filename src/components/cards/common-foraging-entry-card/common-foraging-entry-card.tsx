import { Card } from '@/components/common'
import type { CommonForagingEntryCardProps } from './types'

export function CommonForagingEntryCard({
  day,
  amount,
}: Readonly<CommonForagingEntryCardProps>) {
  return (
    <Card
      className='bg-rarity-common/10 max-w-xl py-3 rounded-xl px-2 border border-rarity-common/10'
      overrideViews
    >
      <div className='flex items-center gap-3'>
        <p className='size-8 scale-150 flex items-center justify-center'>🌿</p>
        <div className='flex flex-col justify-between gap-1'>
          <p>
            Collected <b className='text-xl text-text-primary'>{amount}</b>{' '}
            ingredients while foraging
          </p>
          <p className='text-xs text-text-secondary'>Day {day}</p>
        </div>
      </div>
    </Card>
  )
}
