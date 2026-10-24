/**
 * @jest-environment node
 */
/* eslint-disable unicorn/no-null */

import { DELETE, PUT } from './route'
import { auth } from '@/auth'
import { sendingStoneService } from '@/server/sending-stone'
import { mockDeleteRequest, mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: jest.fn() }))
jest.mock('@/server/sending-stone', () => ({
  sendingStoneService: { linkCharacter: jest.fn() },
}))

const authMock = auth as unknown as jest.Mock
const linkMock = jest.mocked(sendingStoneService.linkCharacter)
const context = { params: Promise.resolve({ id: 'character-1' }) }
const route = 'api/characters/character-1/sending-stone'
// NextRequest.json() returns a promise; mockPostRequest's returns the body
const put = (body: unknown) =>
  PUT(
    Object.assign(mockPostRequest(route, body), {
      json: () => Promise.resolve(body),
    }),
    context,
  )

describe('app/api/characters/[id]/sending-stone', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    linkMock.mockResolvedValue({
      ok: true,
      result: { sendingStoneLinkedAt: new Date('2026-10-24T12:00:00Z') },
    })
  })

  it('should require a signed-in user', async () => {
    authMock.mockResolvedValue(null)

    const response = await put({ token: 'link-code' })

    expect(response.status).toBe(401)
    expect(linkMock).not.toHaveBeenCalled()
  })

  it.each([
    [{}, 'Paste the link code from Sending Stone'],
    [{ token: ' '.repeat(3) }, 'Paste the link code from Sending Stone'],
    [{ token: 'has spaces in it' }, 'That isn’t a Sending Stone link code'],
    [{ token: 'x'.repeat(257) }, 'A link code is at most 256 characters'],
  ])('should reject %j', async (body, error) => {
    const response = await put(body)

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error })
    expect(linkMock).not.toHaveBeenCalled()
  })

  it('should link the character with the trimmed code', async () => {
    const response = await put({ token: '  ss_link.Code-1~ ' })

    expect(linkMock).toHaveBeenCalledWith(
      'character-1',
      'user-1',
      'ss_link.Code-1~',
    )
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      sendingStoneLinkedAt: '2026-10-24T12:00:00.000Z',
    })
  })

  it('should unlink the character', async () => {
    linkMock.mockResolvedValue({
      ok: true,
      result: { sendingStoneLinkedAt: null },
    })

    const response = await DELETE(mockDeleteRequest(route), context)

    expect(linkMock).toHaveBeenCalledWith('character-1', 'user-1', null)
    await expect(response.json()).resolves.toEqual({
      sendingStoneLinkedAt: null,
    })
  })

  it('should pass through why it wasn’t linked', async () => {
    linkMock.mockResolvedValue({
      ok: false,
      status: 404,
      error: 'Character not found',
    })

    const response = await put({ token: 'link-code' })

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: 'Character not found',
    })
  })
})
