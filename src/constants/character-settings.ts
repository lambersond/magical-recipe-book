import type { CharacterMode } from '@/types'

export const CHARACTER_MODES = [
  'companion',
  'game',
] as const satisfies readonly CharacterMode[]

/** What every character plays in until its player chooses otherwise. */
export const DEFAULT_CHARACTER_MODE: CharacterMode = 'companion'
