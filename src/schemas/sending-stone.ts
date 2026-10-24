import { z } from 'zod'

export const SENDING_STONE_TOKEN_MAX_LENGTH = 256

/** The link code a player copies from Sending Stone for their character. */
export const sendingStoneLinkSchema = z.object({
  token: z
    .string({ error: 'Paste the link code from Sending Stone' })
    .trim()
    .min(1, 'Paste the link code from Sending Stone')
    .max(
      SENDING_STONE_TOKEN_MAX_LENGTH,
      `A link code is at most ${SENDING_STONE_TOKEN_MAX_LENGTH} characters`,
    )
    .regex(/^[\w.~-]+$/, 'That isn’t a Sending Stone link code'),
})

export type SendingStoneLinkFields = z.infer<typeof sendingStoneLinkSchema>
