import prisma from '@/clients/prisma'
import { NoCharacterOrAccessError } from '@/errors'

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
