import * as repository from './repository'
import type { Ingredient } from '@/types'

export async function getAllIngredients() {
  const data = await repository.getIngredients({
    include: {
      biomes: {
        include: {
          biome: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })

  return data.map((ingredient: Ingredient) => ({
    ...ingredient,
    biomes: ingredient?.biomes?.map((biome: any) => biome.biome),
  }))
}
