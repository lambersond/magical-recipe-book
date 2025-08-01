'use client'

import { useBiomesFilters } from '../hooks/use-biomes'
import { Search } from '@/components/common'

export function BiomesHeader() {
  const { searchOnChange } = useBiomesFilters()
  return (
    <div className='flex items-center justify-between mb-4 w-full'>
      <h1 className='text-3xl font-bold tracking-tight text-text-primary'>
        Biomes
      </h1>
      <Search onChange={searchOnChange} placeholder='Search biomes...' />
    </div>
  )
}
