/**
 * @jest-environment node
 */

import { socialProviders } from './auth-providers'

describe('auth-providers', () => {
  const env = process.env

  beforeEach(() => {
    process.env = { ...env }
  })

  afterAll(() => {
    process.env = env
  })

  it('should turn Google on with its credentials, ignoring case', () => {
    process.env.AUTH_GOOGLE_ENABLED = 'TRUE'
    process.env.AUTH_GOOGLE_ID = 'google-id'
    process.env.AUTH_GOOGLE_SECRET = 'google-secret'

    expect(socialProviders()).toEqual({
      google: {
        enabled: true,
        clientId: 'google-id',
        clientSecret: 'google-secret',
      },
    })
  })

  it.each([undefined, 'false', 'yes'])(
    'should leave Google off when AUTH_GOOGLE_ENABLED is %p',
    value => {
      process.env.AUTH_GOOGLE_ENABLED = value

      expect(socialProviders().google.enabled).toBe(false)
    },
  )
})
