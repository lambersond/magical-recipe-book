import { postDish } from './client'
import { isSendingStoneEnabled, sendingStoneUrl } from './config'
import { buildDish } from './dish'
import * as repository from './repository'

const refused = (status: number, error: string) =>
  ({ ok: false, status, error }) as const

const NOT_ENABLED = refused(404, 'Sending dishes to Foundry isn’t turned on')

/**
 * Sends a cooked dish to the character's game through Sending Stone, once,
 * for the Gamemaster to apply to the characters who ate it. A dish that
 * couldn't be sent may be sent again.
 * @param rng - Rolls any dice its changes have; Math.random unless a test
 *   fixes them.
 */
export async function sendCookedDish(
  characterId: string,
  cookedDishId: string,
  userId: string,
  rng: () => number = Math.random,
) {
  if (!isSendingStoneEnabled()) return NOT_ENABLED
  const baseUrl = sendingStoneUrl()
  if (!baseUrl) return refused(500, 'Sending Stone’s address isn’t set')

  const cookedDish = await repository.findCookedDishToSend(
    cookedDishId,
    characterId,
    userId,
  )
  const character = cookedDish?.backpack?.character
  if (!cookedDish || !character) return refused(404, 'Dish not found')
  if (cookedDish.status === 'prepared') {
    return refused(409, 'Finish cooking this dish before sending it')
  }
  if (!character.settings?.sendToFoundry) {
    return refused(
      409,
      'Turn on “Send to FoundryVTT via the Sending Stone” in this character’s settings first',
    )
  }
  const token = character.settings?.sendingStoneToken
  if (!token) return refused(409, 'Link this character to Sending Stone first')
  if (cookedDish.sentAt) return refused(409, 'This dish was already sent')

  const dish = buildDish(cookedDish, character.name, rng)
  const sentAt = await repository.claimCookedDish(cookedDishId)
  if (!sentAt) return refused(409, 'This dish was already sent')

  const posted = await postDish(baseUrl, token, dish)
  if (!posted.ok) {
    await repository.releaseCookedDish(cookedDishId, sentAt)
    return posted
  }
  return { ok: true, result: { id: cookedDishId, sentAt, dish } } as const
}

/**
 * Links the user's character to its seat in Sending Stone with the link code
 * Sending Stone gave its player, or unlinks it with none.
 */
export async function linkCharacter(
  characterId: string,
  userId: string,
  token: string | null,
) {
  if (!isSendingStoneEnabled()) return NOT_ENABLED

  const sendingStoneLinkedAt = await repository.updateSendingStoneLink(
    characterId,
    userId,
    token,
  )
  if (sendingStoneLinkedAt === undefined) {
    return refused(404, 'Character not found')
  }
  return { ok: true, result: { sendingStoneLinkedAt } } as const
}
