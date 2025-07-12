import { PrismaClient } from '@prisma/client'
import { biomes, ingredients, recipes } from './data'

const prisma = new PrismaClient()

async function main() {
  const biomeKeyMap = new Map()
  const ingredientNameMap = new Map()

  // Biomes
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

  // Ingredients
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

    ingredientNameMap.set(ing.name, ingredient.id)

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

  // Recipes
  for (const recipeData of recipes) {
    const recipe = await prisma.recipe.upsert({
      where: { name: recipeData.name },
      update: {
        description: recipeData.description,
        difficulty: recipeData.difficulty,
        boonText: recipeData.boonText,
        baneText: recipeData.baneText,
        mundaneIngredients: recipeData.mundaneIngredients,
      },
      create: {
        name: recipeData.name,
        description: recipeData.description,
        difficulty: recipeData.difficulty,
        boonText: recipeData.boonText,
        baneText: recipeData.baneText,
        mundaneIngredients: recipeData.mundaneIngredients,
      },
    })

    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: recipe.id },
    })

    for (const magicalIngredientName of recipeData.magicalIngredients) {
      const ingredientId = ingredientNameMap.get(magicalIngredientName)

      if (!ingredientId) {
        console.warn(
          `Warning: Could not find ingredient "${magicalIngredientName}" for recipe "${recipeData.name}"`,
        )
        continue
      }

      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: ingredientId,
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
