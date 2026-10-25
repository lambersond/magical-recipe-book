/* eslint-disable unicorn/no-null */
import prisma from '@/clients/prisma'

/**
 * A cooked dish of the user's character, with what sending it needs: its
 * recipe's text and ingredients' changes, its cook's name, link code and
 * whether it sends dishes at all.
 */
export async function findCookedDishToSend(
  cookedDishId: string,
  characterId: string,
  userId: string,
) {
  return prisma.cookedDish.findFirst({
    where: {
      id: cookedDishId,
      backpack: { characterId, character: { userId } },
    },
    include: {
      recipe: {
        select: {
          name: true,
          description: true,
          boonText: true,
          baneText: true,
          magicalIngredients: {
            select: {
              ingredient: {
                select: {
                  name: true,
                  boon: true,
                  bane: true,
                  boonChanges: true,
                  baneChanges: true,
                },
              },
            },
          },
        },
      },
      backpack: {
        select: {
          character: {
            select: {
              name: true,
              settings: {
                select: { sendingStoneToken: true, sendToFoundry: true },
              },
            },
          },
        },
      },
    },
  })
}

/**
 * Marks a dish sent, unless it already is, so that it's sent only once.
 * @returns When it was marked, or null when it was already sent.
 */
export async function claimCookedDish(cookedDishId: string) {
  const sentAt = new Date()
  const { count } = await prisma.cookedDish.updateMany({
    where: { id: cookedDishId, sentAt: null },
    data: { sentAt },
  })
  return count === 1 ? sentAt : null
}

/** Unmarks a dish this request marked sent, once sending it failed. */
export async function releaseCookedDish(cookedDishId: string, sentAt: Date) {
  await prisma.cookedDish.updateMany({
    where: { id: cookedDishId, sentAt },
    data: { sentAt: null },
  })
}

/**
 * Sets or clears the user's character's link code from Sending Stone.
 * @returns When it was linked, null once unlinked; undefined when the
 *   character isn't the user's.
 */
export async function updateSendingStoneLink(
  characterId: string,
  userId: string,
  token: string | null,
) {
  const character = await prisma.character.findFirst({
    where: { id: characterId, userId },
    select: { id: true },
  })
  if (!character) return

  const link = {
    sendingStoneToken: token,
    sendingStoneLinkedAt: token ? new Date() : null,
  }
  const settings = await prisma.characterSettings.upsert({
    where: { characterId },
    update: link,
    create: { characterId, ...link },
    select: { sendingStoneLinkedAt: true },
  })
  return settings.sendingStoneLinkedAt
}
