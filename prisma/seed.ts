import { PrismaClient } from '@prisma/client'
import { biomes, ingredients } from './data'

const prisma = new PrismaClient()

async function main() {
  const biomeKeyMap = new Map()

  for (const [key, biomeData] of Object.entries(biomes)) {
    await prisma.biome.upsert({
      where: { key },
      update: {
        name: biomeData.name,
        description: biomeData.description,
        image: biomeData.image,
      },
      create: {
        key,
        name: biomeData.name,
        description: biomeData.description,
        image: biomeData.image,
      },
    })

    biomeKeyMap.set(biomeData, key)
  }

  for (const ing of ingredients) {
    const ingredient = await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: {
        description: ing.description,
        rarity: ing.rarity,
        boon: ing.boon,
        bane: ing.bane,
      },
      create: {
        name: ing.name,
        description: ing.description,
        rarity: ing.rarity,
        boon: ing.boon,
        bane: ing.bane,
      },
    })

    await prisma.biomeIngredient.deleteMany({
      where: { ingredientId: ingredient.id },
    })

    for (const biomeObj of ing.biomes) {
      const biomeKey = biomeKeyMap.get(biomeObj)
      if (!biomeKey) {
        throw new Error(`Could not find key for biome: ${biomeObj.name}`)
      }

      const biome = await prisma.biome.findUnique({
        where: { key: biomeKey },
      })

      if (!biome) {
        throw new Error(`Could not find biome with key: ${biomeKey}`)
      }

      await prisma.biomeIngredient.create({
        data: {
          biomeId: biome.id,
          ingredientId: ingredient.id,
        },
      })
    }
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
;(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
