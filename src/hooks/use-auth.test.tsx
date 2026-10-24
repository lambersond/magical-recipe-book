import { renderHook } from '@test-utils'
import { useAuth } from './use-auth'
import { authClient, signInWithGoogle } from '@/clients/auth-client'

const mockUseSession = jest.fn()
const mockUseFeatureFlags = jest.fn()

jest.mock('./use-feature-flags', () => ({
  useFeatureFlags: () => mockUseFeatureFlags(),
}))

jest.mock('@/clients/auth-client', () => ({
  authClient: {
    useSession: () => mockUseSession(),
    signOut: jest.fn(),
  },
  signInWithGoogle: jest.fn(),
}))

const mockUser = {
  name: 'Test User',
  email: 'test@rms.org',
  image: 'https://example.com/image.jpg',
}
// eslint-disable-next-line unicorn/no-null -- what Better Auth returns
const signedOut = { data: null, isPending: false }

describe('hooks/use-auth', () => {
  beforeEach(() => {
    mockUseFeatureFlags.mockReturnValue({ isAuthEnabled: true })
    mockUseSession.mockReturnValue(signedOut)
  })

  it('should return the signed-in user when auth is enabled', () => {
    const session = { session: { id: 'session-1' }, user: mockUser }
    mockUseSession.mockReturnValue({ data: session, isPending: false })

    const { result } = renderHook(() => useAuth())

    expect(result.current).toEqual({
      isAuthenticated: true,
      isEnabled: true,
      session,
      signIn: expect.any(Function),
      signOut: expect.any(Function),
      status: 'authenticated',
      user: mockUser,
    })
  })

  it('should not be signed in while the session loads', () => {
    // eslint-disable-next-line unicorn/no-null -- what Better Auth returns
    mockUseSession.mockReturnValue({ data: null, isPending: true })

    const { result } = renderHook(() => useAuth())

    expect(result.current).toMatchObject({
      isAuthenticated: false,
      status: 'loading',
    })
  })

  it('should fill in a signed-out user', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current).toMatchObject({
      isAuthenticated: false,
      status: 'unauthenticated',
      user: { name: 'Unknown', email: 'unknown@rms.org', image: '' },
    })
  })

  it('should sign in with Google and come back to the same page', () => {
    globalThis.history.pushState({}, '', '/characters/c1?tab=cookbook')
    const { result } = renderHook(() => useAuth())

    result.current.signIn()

    expect(signInWithGoogle).toHaveBeenCalledWith('/characters/c1?tab=cookbook')
  })

  it('should sign out', () => {
    const { result } = renderHook(() => useAuth())

    result.current.signOut()

    expect(authClient.signOut).toHaveBeenCalled()
  })

  it('should do nothing when auth is disabled', () => {
    mockUseFeatureFlags.mockReturnValue({})
    mockUseSession.mockReturnValue({
      data: { user: mockUser },
      isPending: false,
    })
    const { result } = renderHook(() => useAuth())

    result.current.signIn()

    expect(result.current).toMatchObject({
      isAuthenticated: false,
      isEnabled: false,
    })
    expect(signInWithGoogle).not.toHaveBeenCalled()
  })
})
