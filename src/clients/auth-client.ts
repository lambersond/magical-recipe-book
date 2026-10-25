import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

/**
 * Sends the player to Google to sign in, coming back to callbackURL.
 * Tells them when sign-in can't start, e.g. after too many attempts.
 */
export async function signInWithGoogle(callbackURL: string) {
  const { error } = await authClient.signIn.social({
    provider: 'google',
    callbackURL,
  })
  if (!error) return

  // Better Auth's own reason, e.g. "Invalid origin", tells the owner what to fix
  const reason = error.message ? ` (${error.message})` : ''
  // eslint-disable-next-line no-alert
  alert(
    error.status === 429
      ? 'Too many sign-in attempts. Please wait a few seconds and try again.'
      : `Sign-in failed${reason}. Please try again.`,
  )
}
