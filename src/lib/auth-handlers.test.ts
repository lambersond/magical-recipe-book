/**
 * @jest-environment node
 */

import { NextResponse } from 'next/server'
import { isSelf, withUser } from './auth-handlers'
import { auth } from '@/auth'
import { mockGetRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))

const getSession = auth.api.getSession as unknown as jest.Mock

const request = () =>
  Object.assign(mockGetRequest('api/characters'), {
    headers: new Headers({ cookie: 'better-auth.session_token=abc' }),
  })

describe('lib/auth-handlers', () => {
  describe('withUser', () => {
    const handler = jest.fn(async () => NextResponse.json({ ok: true }))

    it('should answer 401 when nobody is signed in', async () => {
      // eslint-disable-next-line unicorn/no-null -- what Better Auth returns
      getSession.mockResolvedValue(null)

      const response = await withUser(handler)(request(), {})

      expect(response.status).toBe(401)
      await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
      expect(handler).not.toHaveBeenCalled()
    })

    it('should check the session with the request’s cookies and pass on the user', async () => {
      getSession.mockResolvedValue({ session: {}, user: { id: 'user-1' } })
      const req = request()
      const context = { params: Promise.resolve({ id: 'c1' }) }

      const response = await withUser(handler)(req, context)

      expect(getSession).toHaveBeenCalledWith({ headers: req.headers })
      expect(handler).toHaveBeenCalledWith(req, context, 'user-1')
      await expect(response.json()).resolves.toEqual({ ok: true })
    })
  })

  describe('isSelf', () => {
    it('should match the same user only', () => {
      expect(isSelf('user-1', 'user-1')).toBe(true)
      expect(isSelf('user-1', 'user-2')).toBe(false)
    })
  })
})
