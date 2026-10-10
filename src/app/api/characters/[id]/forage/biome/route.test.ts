/**
 * @jest-environment node
 */

import { POST } from './route'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'
import { mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: jest.fn() }))
jest.mock('@/server/characters', () => ({
  characterService: { forageBiome: jest.fn() },
}))

const authMock = auth as unknown as jest.Mock
const forageMock = jest.mocked(characterService.forageBiome)
const context = { params: Promise.resolve({ id: 'character-1' }) }
// NextRequest.json() returns a promise; mockPostRequest's returns the body
const post = (body: unknown) =>
  POST(
    Object.assign(
      mockPostRequest('api/characters/character-1/forage/biome', body),
      { json: () => Promise.resolve(body) },
    ),
    context,
  )

describe('app/api/characters/[id]/forage/biome', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should require a signed-in user', async () => {
    // auth() resolves null when signed out
    // eslint-disable-next-line unicorn/no-null
    authMock.mockResolvedValue(null)

    const response = await post({ biomeId: 'biome-1', roll: 12 })

    expect(response.status).toBe(401)
    expect(forageMock).not.toHaveBeenCalled()
  })

  it.each([
    [{ roll: 12 }, 'Choose a biome to forage'],
    [{ biomeId: 'biome-1' }, 'Enter your roll result'],
    [{ biomeId: 'biome-1', roll: 12.5 }, 'Roll result must be a whole number'],
  ])('should reject %j', async (body, error) => {
    const response = await post(body)

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error })
    expect(forageMock).not.toHaveBeenCalled()
  })

  it('should return the foraging result', async () => {
    const result = {
      ingredient: { id: 'sugar', name: 'Ash Sugar', rarity: 'rare' as const },
      dc: 15,
      roll: 17,
      success: true,
    }
    forageMock.mockResolvedValue({ ok: true, result } as any)

    const response = await post({ biomeId: 'biome-1', roll: 17 })

    expect(forageMock).toHaveBeenCalledWith(
      'character-1',
      'user-1',
      'biome-1',
      17,
    )
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual(result)
  })

  it('should pass through the service error status', async () => {
    forageMock.mockResolvedValue({
      ok: false,
      status: 404,
      error: 'No ingredients grow in that biome',
    })

    const response = await post({ biomeId: 'biome-1', roll: 17 })

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: 'No ingredients grow in that biome',
    })
  })
})
