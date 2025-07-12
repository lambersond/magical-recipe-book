import { BiomeCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { Biome } from '@/types'
import { extractHeaders } from '@/utils/extract-headers'

const getBiomes = async (): Promise<Biome[]> => {
  const { api } = await extractHeaders()
  const res = await fetch(`${api}/biomes`)
  const data = await res.json()
  return data || []
}

export async function BiomesContainer() {
  const biomes = await getBiomes()

  return (
    <Masonry>
      {biomes.map(biome => (
        <BiomeCard {...biome} key={biome.id} />
      ))}
    </Masonry>
  )
}
