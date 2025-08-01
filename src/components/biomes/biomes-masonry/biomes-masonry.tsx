import { useBiomes } from '../hooks/use-biomes'
import { BiomeCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { getMasonryBreakpoints } from '@/utils/get-masonry-breakpoints'

export function BiomesMasonry() {
  const biomes = useBiomes()
  const breakpoints = getMasonryBreakpoints(biomes.length)

  return (
    <Masonry breakpointCols={breakpoints}>
      {biomes.map(biome => (
        <BiomeCard {...biome} key={biome.id} />
      ))}
    </Masonry>
  )
}
