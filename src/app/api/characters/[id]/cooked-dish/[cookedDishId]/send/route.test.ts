/**
 * @jest-environment node
 */

import { POST } from './route'
import { auth } from '@/auth'
import { sendingStoneService } from '@/server/sending-stone'
import { mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/server/sending-stone', () => ({
  sendingStoneService: { sendCookedDish: jest.fn() },
}))

const authMock = auth.api.getSession as unknown as jest.Mock
const sendMock = jest.mocked(sendingStoneService.sendCookedDish)
const context = {
  params: Promise.resolve({ id: 'character-1', cookedDishId: 'dish-1' }),
}
const post = () =>
  POST(
    mockPostRequest('api/characters/character-1/cooked-dish/dish-1/send', {}),
    context,
  )

describe('app/api/characters/[id]/cooked-dish/[cookedDishId]/send', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should require a signed-in user', async () => {
    // eslint-disable-next-line unicorn/no-null
    authMock.mockResolvedValue(null)

    const response = await post()

    expect(response.status).toBe(401)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('should send the user’s dish and say when', async () => {
    const result = { id: 'dish-1', sentAt: '2026-10-24T12:00:00.000Z' }
    sendMock.mockResolvedValue({ ok: true, result } as any)

    const response = await post()

    expect(sendMock).toHaveBeenCalledWith('character-1', 'dish-1', 'user-1')
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual(result)
  })

  it('should pass through why it wasn’t sent', async () => {
    sendMock.mockResolvedValue({
      ok: false,
      status: 409,
      error: 'Link this character to Sending Stone first',
    })

    const response = await post()

    expect(response.status).toBe(409)
    await expect(response.json()).resolves.toEqual({
      error: 'Link this character to Sending Stone first',
    })
  })
})
