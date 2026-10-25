import { z } from 'zod'
import { CHARACTER_MODES } from '@/constants/character-settings'

/** Changes to a character's settings, at least one of them. */
export const characterSettingsSchema = z
  .object({
    mode: z
      .enum(CHARACTER_MODES, { error: 'Choose Companion or Game' })
      .optional(),
    sendToFoundry: z
      .boolean({ error: 'Turn sending to Foundry on or off' })
      .optional(),
  })
  .refine(
    ({ mode, sendToFoundry }) =>
      mode !== undefined || sendToFoundry !== undefined,
    'Change at least one setting',
  )

export type CharacterSettingsFields = z.infer<typeof characterSettingsSchema>
