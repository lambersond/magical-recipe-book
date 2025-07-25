import { useCharacter } from '@/components/character/hooks/use-character'
import { Card } from '@/components/common'

export function CharacterDetails() {
  const { description, createdAt, updatedAt } = useCharacter()
  return (
    <Card className='border border-border'>
      <h2 className='text-xl font-semibold mb-4 text-white'>
        Character Details
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='text-sm text-text-secondary'>Description</label>
          <p className='text-text-primary mt-1'>
            {description ||
              'A battered cloak, a pack of oddities, and a stubborn spark of hope drive this wanderer from ruin to ruin in search of coin, answers, and a legend worth dying for.'}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='text-sm text-text-secondary'>Created</label>
            <p className='text-text-primary mt-1'>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className='text-sm text-text-secondary'>Last Updated</label>
            <p className='text-text-primary mt-1'>
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
