import { Biomes } from '@/components/biomes'
import { biomeService } from '@/server/biomes'
import type { Biome } from '@/types'

export async function BiomesContainer() {
  const biomes = (await biomeService.getAllBiomes()) as any as Biome[]

  return <Biomes biomes={biomes} />
}
