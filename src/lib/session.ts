import { cache } from 'react'
import { headers } from 'next/headers'
import { auth } from '@/auth'

export type SessionUser = typeof auth.$Infer.Session.user

/**
 * The signed-in user, checked against the database once per request.
 * @returns The user, or undefined when nobody is signed in.
 */
export const getCurrentUser = cache(
  async (): Promise<SessionUser | undefined> => {
    const session = await auth.api.getSession({
      headers: await headers(),
      // A Server Component can't renew the session cookie, so leave renewing
      // to the app bar's get-session call, which can
      query: { disableRefresh: true },
    })
    return session?.user
  },
)
