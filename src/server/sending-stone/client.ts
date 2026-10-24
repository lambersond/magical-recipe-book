import type { SendingStoneDish } from './types'

/** Where Sending Stone takes dishes, under its address. */
export const DISHES_PATH = '/api/cookbook/dishes'

const TIMEOUT_MS = 10_000

/** The longest of Sending Stone's own words shown to the player. */
const MAX_MESSAGE_LENGTH = 200

export type PostOutcome =
  { ok: true } | { ok: false; status: number; error: string }

/**
 * Sends a dish to Sending Stone, which queues it for the character's game,
 * where the Gamemaster chooses who to apply it to.
 * @param baseUrl - Sending Stone's address.
 * @param token - The character's link code from Sending Stone, which names
 *   the campaign and character the dish is for.
 */
export async function postDish(
  baseUrl: string,
  token: string,
  dish: SendingStoneDish,
): Promise<PostOutcome> {
  let response: Response
  try {
    response = await fetch(new URL(DISHES_PATH, baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dish),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    })
  } catch {
    return failed('Couldn’t reach Sending Stone. Try again in a moment.')
  }

  if (response.ok) return { ok: true }
  return failed(await refusal(response))
}

/** Why Sending Stone refused the dish, in its own words where it gave them. */
async function refusal(response: Response) {
  const body = await response.json().catch(() => {})
  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  if (message) return message.slice(0, MAX_MESSAGE_LENGTH)

  switch (response.status) {
    case 401:
    case 403: {
      return 'Sending Stone didn’t accept this character’s link. Link it again.'
    }
    case 404: {
      return 'Sending Stone doesn’t take dishes yet.'
    }
    case 409: {
      return 'The game isn’t taking dishes right now.'
    }
    default: {
      return 'Sending Stone couldn’t take this dish just now.'
    }
  }
}

const failed = (error: string) => ({ ok: false, status: 502, error }) as const
