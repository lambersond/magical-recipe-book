/**
 * @jest-environment node
 */

import { GET, POST } from './route'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'
import { mockGetRequest, mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/server/characters', () => ({
  characterService: {
    getUserCharactersLite: jest.fn(),
    findCharactersByUserId: jest.fn(),
    createCharacter: jest.fn(),
  },
}))

const getSession = auth.api.getSession as unknown as jest.Mock
const service = jest.mocked(characterService)
const context = {}
const get = (route: string) =>
  GET(
    Object.assign(mockGetRequest(route), {
      headers: new Headers(),
      nextUrl: new URL(`http://localhost:3000/${route}`),
    }),
    context,
  )

describe('app/api/characters', () => {
  beforeEach(() => {
    getSession.mockResolvedValue({ session: {}, user: { id: 'user-1' } })
  })

  it('should answer 401 when nobody is signed in', async () => {
    // eslint-disable-next-line unicorn/no-null -- what Better Auth returns
    getSession.mockResolvedValue(null)

    const response = await get('api/characters')

    expect(response.status).toBe(401)
    expect(service.findCharactersByUserId).not.toHaveBeenCalled()
  })

  it("should list the user's characters", async () => {
    service.findCharactersByUserId.mockResolvedValue([{ id: 'c1' }] as any)

    const response = await get('api/characters')

    expect(service.findCharactersByUserId).toHaveBeenCalledWith('user-1')
    await expect(response.json()).resolves.toEqual([{ id: 'c1' }])
  })

  it("should list the user's characters in brief", async () => {
    service.getUserCharactersLite.mockResolvedValue([{ id: 'c1' }] as any)

    const response = await get('api/characters?details=lite')

    expect(service.getUserCharactersLite).toHaveBeenCalledWith('user-1')
    await expect(response.json()).resolves.toEqual([{ id: 'c1' }])
  })

  it('should create a character for the user', async () => {
    service.createCharacter.mockResolvedValue({ id: 'c2' } as any)
    const body = { name: 'Thorin', abilities: { hasCookingTools: false } }

    const response = await POST(
      Object.assign(mockPostRequest('api/characters', body), {
        headers: new Headers(),
        json: () => Promise.resolve(body),
      }),
      context,
    )

    expect(service.createCharacter).toHaveBeenCalledWith(body, 'user-1')
    await expect(response.json()).resolves.toEqual({ id: 'c2' })
  })
})
