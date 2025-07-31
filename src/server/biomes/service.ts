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
