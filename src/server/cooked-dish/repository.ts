import prisma from '@/clients/prisma'
import { NoCharacterOrAccessError } from '@/errors'
import type { CookedDishStatus } from '@/types'

export async function deleteByIdCharacterIdAndUserId(
  cookedDishId: string,
  characterId: string,
  userId: string,
) {
  return prisma.$transaction(async tx => {
    const character = await tx.character.findUnique({
      where: {
        id: characterId,
        userId: userId,
      },
    })

    if (!character) {
      throw new NoCharacterOrAccessError()
    }

    return tx.cookedDish.delete({
      where: {
        id: cookedDishId,
        backpack: {
          characterId: characterId,
        },
      },
    })
  })
}

export async function updateByIdCharacterIdAndUserId(data: {
  cookedDishId: string
  characterId: string
  userId: string
  data: {
    status: CookedDishStatus
  }
}) {
  const { cookedDishId, characterId, userId, data: updateData } = data

  return prisma.$transaction(async tx => {
    const character = await tx.character.findUnique({
      where: {
        id: characterId,
        userId: userId,
      },
    })

    if (!character) {
      throw new NoCharacterOrAccessError()
    }

    return tx.cookedDish.update({
      where: {
        id: cookedDishId,
        backpack: {
          characterId: characterId,
        },
      },
      data: {
        consumedOnDay: character.currentDay,
        status: updateData.status,
      },
      include: {
        recipe: {
          select: {
            name: true,
            description: true,
            difficulty: true,
            boonText: true,
            baneText: true,
            magicalIngredients: {
              include: {
                ingredient: {
                  select: {
                    id: true,
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
    })
  })
}
