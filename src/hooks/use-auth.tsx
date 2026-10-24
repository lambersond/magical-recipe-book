import { noop } from 'lodash'
import { useFeatureFlags } from './use-feature-flags'
import { authClient, signInWithGoogle } from '@/clients/auth-client'

/** Signs in with Google, coming back to the page the player is on. */
const signIn = () =>
  signInWithGoogle(globalThis.location.pathname + globalThis.location.search)

const signOut = () => authClient.signOut()

export function useAuth() {
  const { data: session, isPending } = authClient.useSession()
  const featureFlags = useFeatureFlags()

  const { isAuthEnabled } = featureFlags

  let status = 'unauthenticated'
  if (isPending) status = 'loading'
  else if (session) status = 'authenticated'

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
