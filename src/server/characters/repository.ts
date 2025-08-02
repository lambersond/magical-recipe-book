/* eslint-disable unicorn/no-null */
import prisma from '@/clients/prisma'
import { NotFoundError } from '@/errors'
import type {
  CookedDishStatus,
  EditableCharacter,
  FullCharacter,
  Prisma,
} from '@/types/db'

const cookbookInclude = {
  include: {
    knownRecipes: {
      include: {
        magicalIngredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                description: true,
                image: true,
                rarity: true,
                boon: true,
                bane: true,
              },
            },
          },
        },
      },
    },
  },
} as const

const backpackInclude = {
  include: {
    cookedDishes: {
      orderBy: { cookedOnDay: 'desc' },
      include: {
        recipe: {
          // where: { isDeleted: false },
          select: {
            name: true,
            description: true,
            boonText: true,
            baneText: true,
            magicalIngredients: {
              include: {
                ingredient: {
                  select: {
                    name: true,
                    boon: true,
                    bane: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const

const returnFields = {
  foragingLog: {
    orderBy: { foundOnDay: 'desc' },
    select: {
      foundOnDay: true,
      isExpired: true,
      isUsed: true,
      commonIngredients: true,
      magicalIngredient: {
        select: {
          name: true,
          rarity: true,
          image: true,
        },
      },
    },
  },
  // TODO: Reduce the amount of data fetched here
  ingredientsPouch: {
    include: {
      magicalIngredients: {
        where: { isUsed: false, isExpired: false },
        include: {
          magicalIngredient: true,
        },
      },
    },
  },
  cookbook: cookbookInclude,
  backpack: backpackInclude,
} as const

export async function findFullCharacterById(id: string) {
  return prisma.character.findFirst({
    where: { id },
    include: returnFields,
  })
}

export async function findCharacterById(
  id: string,
  options?: Omit<Prisma.CharacterFindFirstArgs, 'where'>,
) {
  return prisma.character.findFirst({
    where: { id },
    ...options,
  })
}

export async function findCharactersByUserId(userId: string) {
  return prisma.character.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      image: true,
    },
  })
}

export async function createCharacter(data: EditableCharacter, userId: string) {
  return prisma.character.create({
    data: {
      ...data,
      userId,
      ingredientsPouch: {
        create: {
          commonIngredients: 0,
        },
      },
      cookbook: {
        create: {},
      },
      backpack: {
        create: {},
      },
    },
    include: returnFields,
  })
}

export async function updateCharacterById(
  data: EditableCharacter,
  userId: string,
  id: string,
) {
  return prisma.character.update({
    where: { id, userId },
    data: {
      ...data,
      userId,
    },
  })
}

export async function updateCharacterBasicsById(
  id: string,
  data: Partial<
    Pick<FullCharacter, 'name' | 'description' | 'image' | 'currentDay'>
  >,
  userId: string,
) {
  return prisma.character.update({
    where: { id, userId },
    data,
  })
}

export async function advanceDayForCharacterById(
  id: string,
  data: { currentDay: number },
  userId: string,
) {
  return prisma.$transaction(async tx => {
    const cutoffDay = data.currentDay - 5

    const expiredIngredients = await tx.foragedIngredient.updateMany({
      where: {
        characterId: id,
        isExpired: false,
        isUsed: false,

        magicalIngredientId: { not: null },
        foundOnDay: { lte: cutoffDay },
      },
      data: {
        isExpired: true,
      },
    })

    const updatedCharacter = await tx.character.update({
      where: { id, userId },
      data,
      include: {
        foragingLog: {
          orderBy: { foundOnDay: 'desc' },
          select: returnFields.foragingLog.select,
        },
        ingredientsPouch: returnFields.ingredientsPouch,
      },
    })

    return {
      character: updatedCharacter,
      expiredItemsCount: expiredIngredients.count,
    }
  })
}

export async function updateCharacterForagingLogById(
  id: string,
  foragingData: {
    commonIngredients: number
    magicalIngredientId?: string
  },
  userId: string,
) {
  return prisma.$transaction(async tx => {
    const character = await tx.character.findUnique({
      where: { id, userId },
      include: {
        foragingLog: {
          orderBy: { createdAt: 'desc' },
          select: returnFields.foragingLog.select,
        },
        ingredientsPouch: returnFields.ingredientsPouch,
      },
    })

    if (!character || character.userId !== userId) {
      throw new NotFoundError('character', id)
    }

    // Create the foraging log entry
    const foragedIngredient = await tx.foragedIngredient.create({
      data: {
        foundOnDay: character.currentDay,
        commonIngredients: foragingData.commonIngredients,
        magicalIngredientId: foragingData.magicalIngredientId,
        characterId: id,
        pouchId: foragingData.magicalIngredientId
          ? character.ingredientsPouch!.id
          : undefined,
      },
      include: {
        magicalIngredient: true,
      },
    })

    const updatedPouch = await tx.ingredientsPouch.update({
      where: { id: character.ingredientsPouch!.id },
      data: {
        commonIngredients: {
          increment: foragingData.commonIngredients,
        },
      },
      include: {
        magicalIngredients: {
          where: { isUsed: false, isExpired: false },
          include: {
            magicalIngredient: true,
          },
        },
      },
    })

    return {
      foragingLog: [foragedIngredient, ...character!.foragingLog],
      ingredientsPouch: updatedPouch,
    }
  })
}

export async function getUserCharactersLite(userId: string) {
  return prisma.character.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      currentDay: true,
      updatedAt: true,
      ingredientsPouch: {
        select: {
          commonIngredients: true,
          _count: {
            select: {
              magicalIngredients: true,
            },
          },
        },
      },
      cookbook: {
        select: {
          _count: {
            select: {
              knownRecipes: true,
            },
          },
        },
      },
    },
  })
}

export async function deleteCharacterById(id: string, userId: string) {
  return prisma.character.delete({
    where: { id, userId },
  })
}

export async function addRecipeToCharacterCookbook(
  characterId: string,
  recipeId: string,
  userId: string,
) {
  return prisma.$transaction(async tx => {
    const character = await tx.character.findUnique({
      where: { id: characterId, userId },
      include: {
        cookbook: {
          include: {
            knownRecipes: {
              where: { id: recipeId },
              select: { id: true },
            },
          },
        },
      },
    })
    if (!character) {
      throw new Error('Character not found or unauthorized')
    }

    if (
      character.cookbook?.knownRecipes.some(recipe => recipe.id === recipeId)
    ) {
      return tx.character.findUnique({
        where: { id: characterId },
        include: {
          cookbook: returnFields.cookbook,
        },
      })
    }

    // Add the recipe to the cookbook
    return tx.character.update({
      where: { id: characterId, userId },
      data: {
        cookbook: {
          upsert: {
            create: {
              knownRecipes: {
                connect: { id: recipeId },
              },
            },
            update: {
              knownRecipes: {
                connect: { id: recipeId },
              },
            },
          },
        },
      },
      include: {
        cookbook: cookbookInclude,
      },
    })
  })
}

export async function createCookedDishForCharacter(
  characterId: string,
  userId: string,
  recipeId: string,
  status: CookedDishStatus,
  isConsumed = true,
) {
  return prisma.$transaction(async tx => {
    const character = await tx.character.findUnique({
      where: { id: characterId, userId },
      include: {
        backpack: { select: { id: true } },
        ingredientsPouch: {
          include: {
            magicalIngredients: {
              where: {
                isUsed: false,
                isExpired: false,
                magicalIngredientId: { not: null },
              },
              orderBy: { createdAt: 'asc' }, // Oldest first
              include: {
                magicalIngredient: true,
              },
            },
          },
        },
        cookbook: {
          include: {
            knownRecipes: {
              where: { id: recipeId },
              include: {
                magicalIngredients: {
                  select: {
                    ingredient: {
                      select: {
                        id: true,
                        name: true,
                        rarity: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    // Check if character exists and belongs to the user
    if (!character) {
      throw new NotFoundError('character', characterId)
    }

    if (!character.backpack || !character.ingredientsPouch) {
      throw new Error('Character backpack or ingredients pouch not found')
    }

    // Verify the character knows this recipe
    const recipe = character.cookbook?.knownRecipes.find(r => r.id === recipeId)
    if (!recipe) {
      throw new Error('Character does not know this recipe')
    }

    // Check if character has enough mundane ingredients
    const mundaneIngredientsRequired = recipe.mundaneIngredients.length
    if (
      character.ingredientsPouch.commonIngredients < mundaneIngredientsRequired
    ) {
      throw new Error(
        `Not enough common ingredients. Need ${mundaneIngredientsRequired}, have ${character.ingredientsPouch.commonIngredients}`,
      )
    }

    // Check and prepare magical ingredients consumption
    const magicalIngredientsToUse: string[] = []

    for (const recipeIngredient of recipe.magicalIngredients) {
      const ingredientName = recipeIngredient.ingredient.name

      // Find the oldest available magical ingredient of this type
      const availableIngredient =
        character.ingredientsPouch.magicalIngredients.find(
          pouchIngredient =>
            pouchIngredient.magicalIngredient?.name === ingredientName &&
            !magicalIngredientsToUse.includes(pouchIngredient.id),
        )

      if (!availableIngredient) {
        throw new Error(
          `Missing required magical ingredient: ${ingredientName}`,
        )
      }

      magicalIngredientsToUse.push(availableIngredient.id)
    }

    // Mark magical ingredients as used
    if (magicalIngredientsToUse.length > 0) {
      await tx.foragedIngredient.updateMany({
        where: {
          id: { in: magicalIngredientsToUse },
        },
        data: {
          isUsed: true,
        },
      })
    }

    // Decrement common ingredients
    await tx.ingredientsPouch.update({
      where: { id: character.ingredientsPouch.id },
      data: {
        commonIngredients: {
          decrement: mundaneIngredientsRequired,
        },
      },
    })

    const consumedOnDay = isConsumed ? character.currentDay : null

    // Create the cooked dish
    await tx.cookedDish.create({
      data: {
        recipeId,
        status,
        cookedOnDay: character.currentDay,
        consumedOnDay,
        backpackId: character.backpack.id,
      },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty: true,
            boonText: true,
            baneText: true,
            mundaneIngredients: true,
          },
        },
      },
    })

    // Fetch updated ingredients pouch
    const updatedIngredientsPouch = await tx.ingredientsPouch.findUnique({
      where: { id: character.ingredientsPouch.id },
      include: {
        magicalIngredients: {
          where: {
            isUsed: false,
            isExpired: false,
            magicalIngredientId: { not: null },
          },
          include: {
            magicalIngredient: true,
          },
        },
      },
    })

    // Fetch updated foraging log (recent entries)
    const updatedForagingLog = await tx.foragedIngredient.findMany({
      where: { characterId },
      orderBy: returnFields.foragingLog.orderBy,
      select: returnFields.foragingLog.select,
    })

    // Fetch updated backpack
    const updatedBackpack = await tx.backpack.findUnique({
      where: { id: character.backpack.id },
      include: {
        cookedDishes: {
          orderBy: { cookedOnDay: 'desc' },
          include: {
            recipe: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        infusedItems: true,
      },
    })

    return {
      ingredientsPouch: updatedIngredientsPouch,
      foragingLog: updatedForagingLog,
      backpack: updatedBackpack,
    }
  })
}
