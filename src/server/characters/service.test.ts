/**
 * @jest-environment node
 */

import {
  forageBiome,
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

const BIOME_INGREDIENTS = [
  { id: 'moss', name: 'Cave Moss', rarity: 'common', description: '' },
  { id: 'sugar', name: 'Ash Sugar', rarity: 'rare', description: '' },
  {
    id: 'heart',
    name: 'Treant Heartwood',
    rarity: 'legendary',
    description: '',
  },
]

// Picks the ingredient at `index` from BIOME_INGREDIENTS
const pick = (index: number) => () => (index + 0.5) / BIOME_INGREDIENTS.length

function mockForaging({
  owner = 'user-1',
  ingredients = BIOME_INGREDIENTS,
} = {}) {
  prismaMock.character.findFirst.mockResolvedValue({ userId: owner } as any)
  prismaMock.biome.findMany.mockResolvedValue([
    { ingredients: ingredients.map(ingredient => ({ ingredient })) },
  ] as any)
  // Run the repository's transaction against the same mock
  prismaMock.$transaction.mockImplementation((fn: any) => fn(prismaMock))
  prismaMock.character.findUnique.mockResolvedValue({
    id: 'character-1',
    userId: 'user-1',
    currentDay: 3,
    foragingLog: [],
    ingredientsPouch: { id: 'pouch-1' },
  } as any)
  prismaMock.foragedIngredient.create.mockResolvedValue({
    id: 'found-1',
  } as any)
  prismaMock.ingredientsPouch.update.mockResolvedValue({ id: 'pouch-1' } as any)
}

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

  describe('forageBiome', () => {
    it("should 404 for someone else's character", async () => {
      mockForaging({ owner: 'user-2' })

      await expect(
        forageBiome('character-1', 'user-1', 'biome-1', 20),
      ).resolves.toMatchObject({ ok: false, status: 404 })
      expect(prismaMock.biome.findMany).not.toHaveBeenCalled()
    })

    it('should 404 for a biome with no ingredients', async () => {
      mockForaging({ ingredients: [] })

      await expect(
        forageBiome('character-1', 'user-1', 'biome-1', 20),
      ).resolves.toMatchObject({ ok: false, status: 404 })
    })

    it('should add the drawn ingredient when the roll meets its DC', async () => {
      mockForaging()

      const outcome = await forageBiome(
        'character-1',
        'user-1',
        'biome-1',
        15,
        pick(1),
      )

      expect(outcome).toMatchObject({
        ok: true,
        result: {
          ingredient: { id: 'sugar', name: 'Ash Sugar', rarity: 'rare' },
          dc: 15,
          roll: 15,
          success: true,
          ingredientsPouch: { id: 'pouch-1' },
        },
      })
      expect(prismaMock.foragedIngredient.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            magicalIngredientId: 'sugar',
            foundOnDay: 3,
            pouchId: 'pouch-1',
          }),
        }),
      )
    })

    it('should add nothing when the roll misses the DC', async () => {
      mockForaging()

      const outcome = await forageBiome(
        'character-1',
        'user-1',
        'biome-1',
        25,
        pick(2),
      )

      expect(outcome).toEqual({
        ok: true,
        result: {
          ingredient: BIOME_INGREDIENTS[2],
          dc: 26,
          roll: 25,
          success: false,
        },
      })
      expect(prismaMock.foragedIngredient.create).not.toHaveBeenCalled()
    })

    it('should draw from every ingredient in the biome', async () => {
      mockForaging()
      const drawn = new Set<string>()

      for (const index of [0, 1, 2]) {
        const outcome = await forageBiome(
          'character-1',
          'user-1',
          'biome-1',
          0,
          pick(index),
        )
        if (outcome.ok) drawn.add(outcome.result.ingredient.id)
      }

      expect(drawn).toEqual(new Set(['moss', 'sugar', 'heart']))
    })
  })
})
