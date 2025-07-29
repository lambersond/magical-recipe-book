import { GoForagingButton } from '../../buttons/go-foraging-button'
import { useCharacter } from '../../hooks/use-character'
import {
  CommonForagingEntryCard,
  MagicalForagingEntryCard,
} from '@/components/cards'
import { Timeline } from '@/components/common'
import type { Rarity } from '@/types'

export function CharacterForagingLog() {
  const character = useCharacter()
  const foragingLog = character.foragingLog

  return (
    <div className='max-w-7xl lg:col-span-2 space-y-6 py-6'>
      <div className='flex flex-col gap-4 px-2 sm:px-0'>
        <div className='flex items-center justify-between w-full sm:max-w-xl'>
          <h2 className='text-2xl font-bold text-white'>Foraging Log</h2>
          <GoForagingButton className='sm:-mr-5 sm:after:content-["Go_Foraging"] sm:after:ml-1' />
        </div>
        <Timeline>
          {foragingLog.map(entry =>
            entry.magicalIngredient ? (
              <MagicalForagingEntryCard
                key={`${entry.id}`}
                day={entry.foundOnDay}
                found={entry.magicalIngredient!.name}
                rarity={entry.magicalIngredient!.rarity as Rarity}
                isExpired={entry.isExpired}
                isUsed={entry.isUsed}
              />
            ) : (
              <CommonForagingEntryCard
                key={entry.id}
                day={entry.foundOnDay}
                amount={entry?.commonIngredients}
              />
            ),
          )}
        </Timeline>
        {foragingLog.length === 0 && (
          <div className='text-left text-text-tertiary'>
            No foraging entries found.
          </div>
        )}
      </div>
    </div>
  )
}
