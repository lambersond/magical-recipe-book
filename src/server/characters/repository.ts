import prisma from '@/clients/prisma'
import { NotFoundError } from '@/errors'
import type { Character, NewCharacter, Prisma } from '@/types/db'

export async function findFullCharacterById(id: string) {
  return prisma.character.findFirst({
    where: { id },
    include: {
      foragingLog: {
        orderBy: { foundOnDay: 'desc' },
        include: {
          magicalIngredient: true,
        },
      },
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
      cookbook: true,
      backpack: true,
    },
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

export async function createCharacter(data: NewCharacter, userId: string) {
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
    include: {
      ingredientsPouch: true,
      cookbook: true,
      backpack: true,
    },
  })
}

export async function updateCharacterBasicsById(
  id: string,
  data: Partial<
    Pick<Character, 'name' | 'description' | 'image' | 'currentDay'>
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
        // eslint-disable-next-line unicorn/no-null
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
          include: {
            magicalIngredient: true,
          },
        },
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
          include: { magicalIngredient: true },
        },
        ingredientsPouch: { select: { id: true } },
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
              knownRecipes: true, // Count of known recipes
            },
          },
        },
      },
    },
  })
}
