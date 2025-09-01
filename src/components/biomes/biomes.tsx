'use client'

import { BiomesHeader } from './biomes-header'
import { BiomesMasonry } from './biomes-masonry'
import { BiomesProvider } from './biomes-provider'
import type { Biome } from '@/types'

export function Biomes({ biomes }: Readonly<{ biomes: Biome[] }>) {
  return (
    <BiomesProvider defaultBiomes={biomes}>
      <BiomesHeader />
      <BiomesMasonry />
    </BiomesProvider>
  )
}
