/* eslint-disable unicorn/no-null */
import { useCharacter, useCharacterApi } from './use-character'
import type { FullCharacter } from '@/types'

/**
 * Links the character to Sending Stone with a link code, or unlinks it,
 * keeping the character's settings in step. Each rejects with why it wasn't
 * saved, and otherwise resolves when the character was linked, or null.
 */
export function useSendingStoneLink() {
  const character = useCharacter()
  const updateCharacter = useCharacterApi()

  const save = async (init: RequestInit) => {
    const res = await fetch(`/api/characters/${character.id}/sending-stone`, {
      ...init,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error ?? 'Could not save the link')
    }
    const sendingStoneLinkedAt: string | null =
      data.sendingStoneLinkedAt ?? null
    updateCharacter((prev: FullCharacter) => ({
      ...prev,
      settings: { ...prev.settings, sendingStoneLinkedAt },
    }))
    return sendingStoneLinkedAt
  }

  return {
    link: (token: string) =>
      save({ method: 'PUT', body: JSON.stringify({ token }) }),
    unlink: () => save({ method: 'DELETE' }),
  }
}
