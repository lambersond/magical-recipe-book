/**
 * @jest-environment node
 */

import { getCurrentUser } from './session'
import { auth } from '@/auth'

jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('next/headers', () => ({
  headers: jest.fn(async () => new Headers({ cookie: 'session=abc' })),
}))

const getSession = auth.api.getSession as unknown as jest.Mock

describe('lib/session', () => {
  it('should return the signed-in user, checked with the request headers', async () => {
    const user = { id: 'user-1', name: 'Alice' }
    getSession.mockResolvedValue({ session: {}, user })

    await expect(getCurrentUser()).resolves.toEqual(user)
    expect(getSession).toHaveBeenCalledWith({ headers: expect.any(Headers) })
    expect(getSession.mock.calls[0][0].headers.get('cookie')).toBe(
      'session=abc',
    )
  })

  it('should return undefined when nobody is signed in', async () => {
    // eslint-disable-next-line unicorn/no-null -- what Better Auth returns
    getSession.mockResolvedValue(null)

    await expect(getCurrentUser()).resolves.toBeUndefined()
  })
})
