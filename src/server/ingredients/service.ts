import * as repository from './repository'

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

  return data.map((ingredient: any) => ({
    ...ingredient,
    biomes: ingredient?.biomes?.map((biome: any) => biome.biome),
  }))
}
