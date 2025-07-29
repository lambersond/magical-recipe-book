import { CharacterDetails, QuickStats } from './sections'

export function CharacterOverview() {
  return (
    <div className='max-w-7xl lg:col-span-2 space-y-6 py-6'>
      <CharacterDetails />
      <QuickStats />
    </div>
  )
}
