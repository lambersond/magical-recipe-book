/**
 * @jest-environment node
 */

import { PATCH } from './route'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'
import { mockPostRequest } from '@/utils/test-utils-node'

jest.mock('@/auth', () => ({ auth: jest.fn() }))
jest.mock('@/server/characters', () => ({
  characterService: { updateCookbookRecipeCommonIngredients: jest.fn() },
}))

const authMock = auth as unknown as jest.Mock
const updateMock = jest.mocked(
  characterService.updateCookbookRecipeCommonIngredients,
)
const context = {
  params: Promise.resolve({ id: 'character-1', recipeId: 'stew' }),
}
// NextRequest.json() returns a promise; mockPostRequest's returns the body
const patch = (body: unknown) =>
  PATCH(
    Object.assign(
      mockPostRequest('api/characters/character-1/cookbook/stew', body),
      { json: () => Promise.resolve(body) },
    ),
    context,
  )

describe('app/api/characters/[id]/cookbook/[recipeId]', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('should require a signed-in user', async () => {
    // auth() resolves null when signed out
    // eslint-disable-next-line unicorn/no-null
    authMock.mockResolvedValue(null)

    const response = await patch({ mundaneIngredients: ['Sea Salt'] })

    expect(response.status).toBe(401)
    expect(updateMock).not.toHaveBeenCalled()
  })

  it('should reject blank ingredient names', async () => {
    const response = await patch({ mundaneIngredients: ['Sea Salt', '  '] })

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      error: 'Ingredient name is required',
    })
    expect(updateMock).not.toHaveBeenCalled()
  })

  it('should save trimmed names and return the updated recipe', async () => {
    const recipe = {
      id: 'stew',
      mundaneIngredients: ['Sea Salt', 'Rain'],
      defaultMundaneIngredients: ['Salt', 'Water'],
    }
    updateMock.mockResolvedValue({ ok: true, recipe })

    const response = await patch({ mundaneIngredients: [' Sea Salt ', 'Rain'] })

    expect(updateMock).toHaveBeenCalledWith('character-1', 'user-1', 'stew', [
      'Sea Salt',
      'Rain',
    ])
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual(recipe)
  })

  it('should pass through the service error status', async () => {
    updateMock.mockResolvedValue({ ok: false, status: 404, error: 'Not found' })

    const response = await patch({ mundaneIngredients: ['Sea Salt'] })

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({ error: 'Not found' })
  })
})
