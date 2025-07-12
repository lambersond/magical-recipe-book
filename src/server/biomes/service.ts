import * as repository from './repository'
import type { Biome } from '@/types'

export async function getAllBiomes() {
  const data = await repository.getBiomes({
    include: {
      ingredients: {
        include: {
          ingredient: {
            select: {
              name: true,
              rarity: true,
            },
          },
        },
      },
    },
  })

  return data.map((biome: Biome) => ({
    ...biome,
    ingredients: biome?.ingredients?.map(({ ingredient }: any) => ({
      name: ingredient.name,
      rarity: ingredient.rarity,
    })),
    ingredientCount: biome?.ingredients?.length,
  }))
}
