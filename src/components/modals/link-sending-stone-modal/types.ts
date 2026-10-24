import type { ModalProps } from '../types'

export interface LinkSendingStoneModalProps extends Pick<ModalProps, 'open'> {
  characterName?: string
  /** When the character was linked; null or left out while it isn't. */
  linkedAt?: Date | string | null
  /** Links the character; a rejection keeps the modal open with its message. */
  onLink(token: string): Promise<void>
  /** Unlinks the character; a rejection keeps the modal open, as onLink. */
  onUnlink(): Promise<void>
}
