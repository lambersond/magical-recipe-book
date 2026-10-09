/**
 * @jest-environment node
 */

import {
  getCharacterByIdAndUserId,
  personalizeCookbook,
  updateCookbookRecipeCommonIngredients,
} from './service'
import { prismaMock } from '@/utils/test-utils-node'

// The service only needs isSelf; skip loading next-auth's ESM adapter
jest.mock('@/auth', () => ({ auth: jest.fn() }))

const stew = { id: 'stew', name: 'Stew', mundaneIngredients: ['Salt', 'Water'] }
const bread = { id: 'bread', name: 'Bread', mundaneIngredients: ['Flour'] }

const update = (names: string[]) =>
  updateCookbookRecipeCommonIngredients('character-1', 'user-1', 'stew', names)

describe('server/characters/service', () => {
  describe('personalizeCookbook', () => {
    it("should swap in the character's names and keep the recipe's", () => {
      const cookbook = personalizeCookbook({
        id: 'cookbook-1',
        knownRecipes: [stew, bread],
        recipeOverrides: [
          {
            recipeId: 'stew',
            mundaneIngredients: ['Sea Salt', 'Spring Water'],
          },
        ],
      })

      expect(cookbook).toEqual({
        id: 'cookbook-1',
        knownRecipes: [
          {
            ...stew,
            mundaneIngredients: ['Sea Salt', 'Spring Water'],
            defaultMundaneIngredients: ['Salt', 'Water'],
          },
          { ...bread, defaultMundaneIngredients: ['Flour'] },
        ],
      })
    })

    it('should ignore an override whose ingredient count is stale', () => {
      const { knownRecipes } = personalizeCookbook({
        knownRecipes: [stew],
        recipeOverrides: [{ recipeId: 'stew', mundaneIngredients: ['Brine'] }],
      })

      expect(knownRecipes[0].mundaneIngredients).toEqual(['Salt', 'Water'])
    })
  })

  describe('getCharacterByIdAndUserId', () => {
    it('should return the character with a personalized cookbook', async () => {
      prismaMock.character.findFirst.mockResolvedValue({
        id: 'character-1',
        userId: 'user-1',
        cookbook: {
          knownRecipes: [stew],
          recipeOverrides: [
            { recipeId: 'stew', mundaneIngredients: ['Sea Salt', 'Rain'] },
          ],
        },
      } as any)

      const character = await getCharacterByIdAndUserId('character-1', 'user-1')

      expect(character?.cookbook?.knownRecipes[0].mundaneIngredients).toEqual([
        'Sea Salt',
        'Rain',
      ])
      expect(character?.cookbook).not.toHaveProperty('recipeOverrides')
    })
  })

  describe('updateCookbookRecipeCommonIngredients', () => {
    it("should 404 when the recipe isn't in the character's cookbook", async () => {
      // Prisma's findFirst resolves null when nothing matches
      // eslint-disable-next-line unicorn/no-null
      prismaMock.cookbook.findFirst.mockResolvedValue(null)

      await expect(update(['Sea Salt', 'Rain'])).resolves.toMatchObject({
        ok: false,
        status: 404,
      })
      expect(prismaMock.cookbook.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            character: { id: 'character-1', userId: 'user-1' },
            knownRecipes: { some: { id: 'stew' } },
          },
        }),
      )
    })

    it('should 400 when the ingredient count differs from the recipe', async () => {
      prismaMock.cookbook.findFirst.mockResolvedValue({
        id: 'cookbook-1',
        knownRecipes: [{ mundaneIngredients: ['Salt', 'Water'] }],
      } as any)

      await expect(update(['Sea Salt'])).resolves.toEqual({
        ok: false,
        status: 400,
        error: 'Expected 2 common ingredients, got 1',
      })
      expect(prismaMock.cookbookRecipeOverride.upsert).not.toHaveBeenCalled()
    })

    it('should save renamed ingredients for this cookbook', async () => {
      prismaMock.cookbook.findFirst.mockResolvedValue({
        id: 'cookbook-1',
        knownRecipes: [{ mundaneIngredients: ['Salt', 'Water'] }],
      } as any)

      await expect(update(['Sea Salt', 'Rain'])).resolves.toEqual({
        ok: true,
        recipe: {
          id: 'stew',
          mundaneIngredients: ['Sea Salt', 'Rain'],
          defaultMundaneIngredients: ['Salt', 'Water'],
        },
      })
      expect(prismaMock.cookbookRecipeOverride.upsert).toHaveBeenCalledWith({
        where: {
          cookbookRecipe: { cookbookId: 'cookbook-1', recipeId: 'stew' },
        },
        create: {
          cookbookId: 'cookbook-1',
          recipeId: 'stew',
          mundaneIngredients: ['Sea Salt', 'Rain'],
        },
        update: { mundaneIngredients: ['Sea Salt', 'Rain'] },
      })
    })

    it("should clear the override when names match the recipe's", async () => {
      prismaMock.cookbook.findFirst.mockResolvedValue({
        id: 'cookbook-1',
        knownRecipes: [{ mundaneIngredients: ['Salt', 'Water'] }],
      } as any)

      await expect(update(['Salt', 'Water'])).resolves.toMatchObject({
        ok: true,
      })
      expect(prismaMock.cookbookRecipeOverride.deleteMany).toHaveBeenCalledWith(
        {
          where: { cookbookId: 'cookbook-1', recipeId: 'stew' },
        },
      )
      expect(prismaMock.cookbookRecipeOverride.upsert).not.toHaveBeenCalled()
    })
  })
})
