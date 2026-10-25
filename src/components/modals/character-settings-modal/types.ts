import type { ModalProps } from '../types'
import type { CharacterSettingsFields } from '@/schemas/character-settings'
import type { CharacterSettings, Nullish } from '@/types'

export interface CharacterSettingsModalProps extends Pick<ModalProps, 'open'> {
  characterName?: string
  /** The character's settings; left out for an older character without any */
  settings?: Nullish<CharacterSettings>
  /** Offers sending dishes to Foundry, while the feature flag is on */
  isSendingStoneEnabled?: boolean
  /** Saves the settings; a rejection keeps the modal open with its message. */
  onSave(settings: CharacterSettingsFields): Promise<void>
  /** Links the character at once, resolving when it was linked. */
  onLink(token: string): Promise<Date | string | null>
  /** Unlinks the character at once; rejects as onLink does. */
  onUnlink(): Promise<Date | string | null>
}

export type CharacterSettingsPanelProps = Omit<
  CharacterSettingsModalProps,
  'open' | 'characterName'
> & {
  onClose(): void
}

export type SendingStoneLinkProps = {
  /** When the character was linked; null or left out while it isn't. */
  linkedAt?: Nullish<Date | string>
  /** Links the character; a rejection is shown with its message. */
  onLink(token: string): Promise<void>
  /** Unlinks the character; a rejection is shown, as onLink's. */
  onUnlink(): Promise<void>
}
