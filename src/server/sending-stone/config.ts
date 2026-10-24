/**
 * Whether dishes may be sent to Foundry through Sending Stone. Off unless
 * SENDING_STONE_ENABLED is "true", which production doesn't set until
 * Sending Stone and its Foundry module take dishes.
 */
export const isSendingStoneEnabled = () =>
  process.env.SENDING_STONE_ENABLED?.toLowerCase() === 'true'

/** The Sending Stone app's address, such as https://sending-stone.vercel.app. */
export const sendingStoneUrl = () => process.env.SENDING_STONE_URL
