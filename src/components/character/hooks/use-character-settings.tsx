import { useCharacter, useCharacterApi } from './use-character'
import { useSendingStoneLink } from './use-sending-stone-link'
import { useModals } from '@/hooks/use-modals'
import type { CharacterSettingsFields } from '@/schemas/character-settings'
import type { FullCharacter } from '@/types'

/**
 * Opens the character's settings, keeping the character in step with what's
 * saved there.
 * @param isSendingStoneEnabled - Offers sending dishes to Foundry through
 *   Sending Stone, from the feature flags.
 */
export function useCharacterSettings({ isSendingStoneEnabled = false } = {}) {
  const character = useCharacter()
  const updateCharacter = useCharacterApi()
  const { openModal } = useModals()
  const { link, unlink } = useSendingStoneLink()

  const save = async (settings: CharacterSettingsFields) => {
    const res = await fetch(`/api/characters/${character.id}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(settings),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error ?? 'Could not save the settings')
    }
    updateCharacter((prev: FullCharacter) => ({
      ...prev,
      settings: { ...prev.settings, ...data },
    }))
  }

  return () =>
    openModal('CharacterSettingsModal', {
      characterName: character.name,
      settings: character.settings,
      isSendingStoneEnabled,
      onSave: save,
      onLink: link,
      onUnlink: unlink,
    })
}
