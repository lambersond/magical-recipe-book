/**
 * @jest-environment node
 */

import { PUT } from './route'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'
import { mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/server/characters', () => ({
  characterService: { updateCharacterSettings: jest.fn() },
}))

const authMock = auth.api.getSession as unknown as jest.Mock
const updateMock = jest.mocked(characterService.updateCharacterSettings)
const context = { params: Promise.resolve({ id: 'character-1' }) }
// NextRequest.json() returns a promise; mockPostRequest's returns the body
const put = (body: unknown) =>
  PUT(
    Object.assign(
      mockPostRequest('api/characters/character-1/settings', body),
      { json: () => Promise.resolve(body) },
    ),
    context,
  )

describe('app/api/characters/[id]/settings', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should require a signed-in user', async () => {
    // auth() resolves null when signed out
    // eslint-disable-next-line unicorn/no-null
    authMock.mockResolvedValue(null)

    const response = await put({ mode: 'game' })

    expect(response.status).toBe(401)
    expect(updateMock).not.toHaveBeenCalled()
  })

  it.each([
    [{}, 'Change at least one setting'],
    [{ mode: 'story' }, 'Choose Companion or Game'],
    [{ sendToFoundry: 'yes' }, 'Turn sending to Foundry on or off'],
  ])('should reject %j', async (body, error) => {
    const response = await put(body)

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error })
    expect(updateMock).not.toHaveBeenCalled()
  })

  it('should save only the settings it takes and return them', async () => {
    const settings = {
      mode: 'game',
      sendToFoundry: true,
      sendingStoneLinkedAt: '2026-10-24T12:00:00.000Z',
    }
    updateMock.mockResolvedValue({ ok: true, result: settings } as any)

    const response = await put({
      mode: 'game',
      sendToFoundry: true,
      sendingStoneToken: 'not-through-here',
    })

    expect(updateMock).toHaveBeenCalledWith('character-1', 'user-1', {
      mode: 'game',
      sendToFoundry: true,
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual(settings)
  })

  it('should pass through the service error status', async () => {
    updateMock.mockResolvedValue({
      ok: false,
      status: 404,
      error: 'Character not found',
    })

    const response = await put({ sendToFoundry: false })

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: 'Character not found',
    })
  })
})
