import * as repository from './repository'

export async function getAllBiomes() {
  return await repository.getBiomes({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      ingredients: {
        select: {
          ingredient: {
            select: {
              id: true,
              name: true,
              description: true,
              rarity: true,
              bane: true,
              boon: true,
            },
          },
        },
      },
    },
  })
}

/** Biomes to choose from when foraging, without their ingredient details. */
export async function getBiomeOptions() {
  const biomes = await repository.getBiomes({
    select: {
      id: true,
      name: true,
      image: true,
      _count: { select: { ingredients: true } },
    },
    orderBy: { name: 'asc' },
  })
  return biomes.map(({ _count, ...biome }) => ({
    ...biome,
    ingredientCount: _count.ingredients,
  }))
}

/** The magical ingredients that can be foraged in a biome. */
export async function getBiomeIngredients(biomeId: string) {
  const [biome] = await repository.getBiomes({
    where: { id: biomeId },
    select: {
      ingredients: {
        select: {
          ingredient: {
            select: { id: true, name: true, rarity: true, description: true },
          },
        },
      },
    },
  })
  return biome?.ingredients.map(({ ingredient }) => ingredient) ?? []
}
