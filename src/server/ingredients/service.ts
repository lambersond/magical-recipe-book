import * as repository from './repository'

export async function getAllIngredients() {
  return await repository.getIngredients({
    orderBy: { name: 'asc' },
    select: {
      name: true,
      description: true,
      image: true,
      rarity: true,
      bane: true,
      boon: true,
      id: true,
      biomes: {
        select: {
          biome: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
  })
}
