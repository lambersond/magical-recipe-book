import { noop } from 'lodash'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useFeatureFlags } from './use-feature-flags'

export function useAuth() {
  const { data: session, status } = useSession()
  const featureFlags = useFeatureFlags()

  const { isAuthEnabled } = featureFlags

  const user = {
    name: session?.user?.name || 'Unknown',
    email: session?.user?.email || 'unknown@rms.org',
    image: session?.user?.image || '',
  }

  return isAuthEnabled
    ? {
        isAuthenticated: status === 'authenticated',
        isEnabled: true,
        session,
        signIn,
        signOut,
        status,
        user,
      }
    : {
        isAuthenticated: false,
        isEnabled: false,
        session: {},
        signIn: noop,
        signOut: noop,
        user,
        status,
      }
}
