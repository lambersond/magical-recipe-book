/* eslint-disable unicorn/no-null */
import { useCharacter, useCharacterApi } from './use-character'
import { useModals } from '@/hooks/use-modals'
import type { FullCharacter } from '@/types'

/**
 * Opens the modal that links the character to Sending Stone, or unlinks it,
 * keeping the character's settings in step.
 */
export function useSendingStoneLink() {
  const character = useCharacter()
  const updateCharacter = useCharacterApi()
  const { openModal } = useModals()

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
    updateCharacter((prev: FullCharacter) => ({
      ...prev,
      settings: {
        ...prev.settings,
        sendingStoneLinkedAt: data.sendingStoneLinkedAt ?? null,
      },
    }))
  }

  return () =>
    openModal('LinkSendingStoneModal', {
      characterName: character.name,
      linkedAt: character.settings?.sendingStoneLinkedAt,
      onLink: token => save({ method: 'PUT', body: JSON.stringify({ token }) }),
      onUnlink: () => save({ method: 'DELETE' }),
    })
}
