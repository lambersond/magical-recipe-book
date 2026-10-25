/**
 * @jest-environment node
 */

import { POST } from './route'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'
import { mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/server/characters', () => ({
  characterService: { logForagingResults: jest.fn() },
}))

const authMock = auth.api.getSession as unknown as jest.Mock
const logMock = jest.mocked(characterService.logForagingResults)
const context = { params: Promise.resolve({ id: 'character-1' }) }
const pick = { quantity: 0, isMagical: true, magicalIngredientId: 'sugar' }
const post = (body: unknown) =>
  POST(mockPostRequest('api/characters/character-1/forage', body), context)

describe('app/api/characters/[id]/forage', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should require a signed-in user', async () => {
    // auth() resolves null when signed out
    // eslint-disable-next-line unicorn/no-null
    authMock.mockResolvedValue(null)

    const response = await post(pick)

    expect(response.status).toBe(401)
    expect(logMock).not.toHaveBeenCalled()
  })

  it('should log the results and return the pouch and log', async () => {
    const result = { ingredientsPouch: { id: 'pouch-1' }, foragingLog: [] }
    logMock.mockResolvedValue({ ok: true, result } as any)

    const response = await post(pick)

    expect(logMock).toHaveBeenCalledWith('character-1', pick, 'user-1')
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual(result)
  })

  it('should refuse a picked ingredient in Game mode', async () => {
    logMock.mockResolvedValue({
      ok: false,
      status: 409,
      error: 'In Game mode, magical ingredients are found by foraging a biome',
    })

    const response = await post(pick)

    expect(response.status).toBe(409)
    await expect(response.json()).resolves.toEqual({
      error: 'In Game mode, magical ingredients are found by foraging a biome',
    })
  })
})
