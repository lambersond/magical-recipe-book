import { BiomeCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { biomeService } from '@/server/biomes'

export async function BiomesContainer() {
  const biomes = await biomeService.getAllBiomes()

  return (
    <Masonry>
      {biomes.map(biome => (
        <BiomeCard {...biome} key={biome.id} />
      ))}
    </Masonry>
  )
}
