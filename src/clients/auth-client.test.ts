import { signInWithGoogle } from './auth-client'

const mockSocial = jest.fn()

jest.mock('better-auth/react', () => ({
  createAuthClient: () => ({
    signIn: { social: (options: unknown) => mockSocial(options) },
  }),
}))

describe('clients/auth-client', () => {
  const alertSpy = jest.spyOn(globalThis, 'alert').mockImplementation()

  it('should start a Google sign-in that comes back to the given page', async () => {
    mockSocial.mockResolvedValue({
      data: { url: 'https://google' },
      // eslint-disable-next-line unicorn/no-null -- what Better Auth returns
      error: null,
    })

    await signInWithGoogle('/user')

    expect(mockSocial).toHaveBeenCalledWith({
      provider: 'google',
      callbackURL: '/user',
    })
    expect(alertSpy).not.toHaveBeenCalled()
  })

  it('should tell the player to wait after too many attempts', async () => {
    mockSocial.mockResolvedValue({ error: { status: 429 } })

    await signInWithGoogle('/user')

    expect(alertSpy).toHaveBeenCalledWith(
      'Too many sign-in attempts. Please wait a few seconds and try again.',
    )
  })

  it('should tell the player when sign-in fails', async () => {
    mockSocial.mockResolvedValue({ error: { status: 500 } })

    await signInWithGoogle('/user')

    expect(alertSpy).toHaveBeenCalledWith('Sign-in failed. Please try again.')
  })
})
