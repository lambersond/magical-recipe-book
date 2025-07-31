import { BiomeCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { biomeService } from '@/server/biomes'
import type { Biome } from '@/types'

export async function BiomesContainer() {
  const biomes = (await biomeService.getAllBiomes()) as any as Biome[]

  return (
    <Masonry>
      {biomes.map(biome => (
        <BiomeCard {...biome} key={biome.id} />
      ))}
    </Masonry>
  )
}
