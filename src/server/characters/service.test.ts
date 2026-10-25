/**
 * @jest-environment node
 */

import {
  biomeSearchDc,
  forageBiome,
  getCharacterByIdAndUserId,
  logForagingResults,
  personalizeCookbook,
  searchIngredients,
  updateCharacterSettings,
  updateCookbookRecipeCommonIngredients,
} from './service'
import { prismaMock } from '@/utils/test-utils-node'
import type { Rarity } from '@/types'

// The service only needs isSelf; skip loading Better Auth and its database
jest.mock('@/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))

const stew = { id: 'stew', name: 'Stew', mundaneIngredients: ['Salt', 'Water'] }
const bread = { id: 'bread', name: 'Bread', mundaneIngredients: ['Flour'] }

const update = (names: string[]) =>
  updateCookbookRecipeCommonIngredients('character-1', 'user-1', 'stew', names)

const ingredient = (id: string, rarity: Rarity) => ({
  id,
  name: id,
  rarity,
  description: '',
})

// One of each rarity, and a second rare. Searched at DC 8, 10, 13, 16, 20
// and 24.
const BIOME_INGREDIENTS = [
  ingredient('moss', 'common'),
  ingredient('salt', 'uncommon'),
  ingredient('sugar', 'rare'),
  ingredient('sage', 'rare'),
  ingredient('pearl', 'very-rare'),
  ingredient('pepper', 'epic'),
  ingredient('heart', 'legendary'),
]

// Each call answers the next value
const sequence =
  (...values: number[]) =>
  () =>
    values.shift() ?? 0

// How often each rarity is found over an even spread of the rarity draw
function rarityShares(ingredients: typeof BIOME_INGREDIENTS, roll: number) {
  const draws = 1000
  const counts: Record<string, number> = {}
  for (let draw = 0; draw < draws; draw++) {
    const found = searchIngredients(
      ingredients,
      roll,
      sequence((draw + 0.5) / draws, 0),
    )
    if (found) counts[found.rarity] = (counts[found.rarity] ?? 0) + 1
  }
  return Object.fromEntries(
    Object.entries(counts).map(([rarity, count]) => [rarity, count / draws]),
  )
}

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

  describe('biomeSearchDc', () => {
    it.each([
      ['common', 8],
      ['uncommon', 10],
      ['rare', 13],
      ['very-rare', 16],
      ['epic', 20],
      ['legendary', 24],
    ] as const)(
      'should search for %s at DC %i, 2 below its DC',
      (rarity, dc) => {
        expect(biomeSearchDc(rarity)).toBe(dc)
      },
    )
  })

  describe('searchIngredients', () => {
    it('should find nothing below every DC', () => {
      expect(searchIngredients(BIOME_INGREDIENTS, 9)).toBeUndefined()
    })

    it('should never find a common ingredient', () => {
      expect(
        searchIngredients([ingredient('moss', 'common')], 30),
      ).toBeUndefined()
    })

    it('should find a rarity at its lowered DC', () => {
      expect(searchIngredients(BIOME_INGREDIENTS, 10)).toMatchObject({
        id: 'salt',
      })
    })

    it('should never find a rarity the roll doesn’t reach', () => {
      for (const draw of [0, 0.5, 0.999]) {
        const found = searchIngredients(
          BIOME_INGREDIENTS,
          15,
          sequence(draw, draw),
        )
        expect(['uncommon', 'rare']).toContain(found?.rarity)
      }
    })

    it('should find each rarity by its chance when the roll reaches them all', () => {
      expect(rarityShares(BIOME_INGREDIENTS, 24)).toEqual({
        uncommon: 0.4,
        rare: 0.3,
        'very-rare': 0.15,
        epic: 0.1,
        legendary: 0.05,
      })
    })

    it('should scale the chances to the rarities the roll reaches', () => {
      // 40 to 30, of 70
      expect(rarityShares(BIOME_INGREDIENTS, 13)).toEqual({
        uncommon: 0.571,
        rare: 0.429,
      })
    })

    it('should scale the chances to the rarities the biome has', () => {
      const biome = [ingredient('sugar', 'rare'), ingredient('pepper', 'epic')]

      // 30 to 10, of 40
      expect(rarityShares(biome, 30)).toEqual({ rare: 0.75, epic: 0.25 })
    })

    it.each([
      [0, 'sugar'],
      [0.49, 'sugar'],
      [0.5, 'sage'],
      [0.99, 'sage'],
    ])(
      'should pick evenly among the ingredients of the rarity found (%p)',
      (draw, id) => {
        // 0.99 draws rare, the rarest a roll of 13 reaches
        expect(
          searchIngredients(BIOME_INGREDIENTS, 13, sequence(0.99, draw))?.id,
        ).toBe(id)
      },
    )
  })

  describe('forageBiome', () => {
    it("should 404 for someone else's character", async () => {
      mockForaging({ owner: 'user-2' })

      await expect(
        forageBiome('character-1', 'user-1', 'biome-1', 20),
      ).resolves.toMatchObject({ ok: false, status: 404 })
      expect(prismaMock.biome.findMany).not.toHaveBeenCalled()
    })

    it.each([
      ['no ingredients', []],
      ['only common ingredients', [ingredient('moss', 'common')]],
    ])('should 404 for a biome with %s', async (_, ingredients) => {
      mockForaging({ ingredients })

      await expect(
        forageBiome('character-1', 'user-1', 'biome-1', 20),
      ).resolves.toEqual({
        ok: false,
        status: 404,
        error: 'No ingredients grow in that biome',
      })
    })

    it('should find nothing below every DC, and say the lowest', async () => {
      mockForaging()

      // Above common's DC 8, which searching ignores, below uncommon's 10
      await expect(
        forageBiome('character-1', 'user-1', 'biome-1', 9),
      ).resolves.toEqual({
        ok: true,
        result: { dc: 10, roll: 9, success: false },
      })
      expect(prismaMock.foragedIngredient.create).not.toHaveBeenCalled()
    })

    it('should say the lowest DC of the biome’s own ingredients', async () => {
      mockForaging({
        ingredients: [
          ingredient('pepper', 'epic'),
          ingredient('sugar', 'rare'),
        ],
      })

      await expect(
        forageBiome('character-1', 'user-1', 'biome-1', 12),
      ).resolves.toEqual({
        ok: true,
        result: { dc: 13, roll: 12, success: false },
      })
    })

    it('should add what the roll finds to the pouch', async () => {
      mockForaging()

      const outcome = await forageBiome(
        'character-1',
        'user-1',
        'biome-1',
        14,
        sequence(0.99, 0),
      )

      // The DC is the rare's, 13, not the roll
      expect(outcome).toMatchObject({
        ok: true,
        result: {
          ingredient: { id: 'sugar', rarity: 'rare' },
          dc: 13,
          roll: 14,
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
  })

  describe('logForagingResults', () => {
    const pick = { quantity: 0, isMagical: true, magicalIngredientId: 'sugar' }

    beforeEach(() => {
      mockForaging()
    })

    it.each([
      ['in Companion mode', { mode: 'companion' }],
      // An older character may have no settings, and plays in Companion mode
      // eslint-disable-next-line unicorn/no-null
      ['for a character without settings', null],
    ])('should log a picked ingredient %s', async (_, settings) => {
      prismaMock.character.findFirst.mockResolvedValue({ settings } as any)

      await expect(
        logForagingResults('character-1', pick, 'user-1'),
      ).resolves.toMatchObject({
        ok: true,
        result: { ingredientsPouch: { id: 'pouch-1' } },
      })
      expect(prismaMock.character.findFirst).toHaveBeenCalledWith({
        where: { id: 'character-1', userId: 'user-1' },
        select: { settings: { select: { mode: true } } },
      })
      expect(prismaMock.foragedIngredient.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ magicalIngredientId: 'sugar' }),
        }),
      )
    })

    it('should refuse a picked ingredient in Game mode', async () => {
      prismaMock.character.findFirst.mockResolvedValue({
        settings: { mode: 'game' },
      } as any)

      await expect(
        logForagingResults('character-1', pick, 'user-1'),
      ).resolves.toEqual({
        ok: false,
        status: 409,
        error:
          'In Game mode, magical ingredients are found by foraging a biome',
      })
      expect(prismaMock.foragedIngredient.create).not.toHaveBeenCalled()
    })

    it('should 404 a picked ingredient for someone else’s character', async () => {
      // Prisma's findFirst resolves null when nothing matches
      // eslint-disable-next-line unicorn/no-null
      prismaMock.character.findFirst.mockResolvedValue(null)

      await expect(
        logForagingResults('character-1', pick, 'user-2'),
      ).resolves.toEqual({
        ok: false,
        status: 404,
        error: 'Character not found',
      })
      expect(prismaMock.foragedIngredient.create).not.toHaveBeenCalled()
    })

    it('should log common ingredients in any mode, at most 7', async () => {
      await expect(
        logForagingResults(
          'character-1',
          { quantity: 9, isMagical: false },
          'user-1',
        ),
      ).resolves.toMatchObject({ ok: true })
      // The quantity is rolled in the browser, so the mode isn't looked up
      expect(prismaMock.character.findFirst).not.toHaveBeenCalled()
      expect(prismaMock.foragedIngredient.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ commonIngredients: 7 }),
        }),
      )
    })
  })

  describe('updateCharacterSettings', () => {
    const saved = {
      mode: 'game',
      sendToFoundry: true,
      sendingStoneLinkedAt: new Date('2026-10-24T12:00:00Z'),
    }

    beforeEach(() => {
      prismaMock.character.findFirst.mockResolvedValue({
        id: 'character-1',
      } as any)
      prismaMock.characterSettings.upsert.mockResolvedValue(saved as any)
    })

    it('should 404 for someone else’s character', async () => {
      // eslint-disable-next-line unicorn/no-null
      prismaMock.character.findFirst.mockResolvedValue(null)

      await expect(
        updateCharacterSettings('character-1', 'user-2', { mode: 'game' }),
      ).resolves.toEqual({
        ok: false,
        status: 404,
        error: 'Character not found',
      })
      expect(prismaMock.character.findFirst).toHaveBeenCalledWith({
        where: { id: 'character-1', userId: 'user-2' },
        select: { id: true },
      })
      expect(prismaMock.characterSettings.upsert).not.toHaveBeenCalled()
    })

    it('should save the settings, creating them for an older character', async () => {
      await expect(
        updateCharacterSettings('character-1', 'user-1', {
          mode: 'game',
          sendToFoundry: true,
        }),
      ).resolves.toEqual({ ok: true, result: saved })
      expect(prismaMock.characterSettings.upsert).toHaveBeenCalledWith({
        where: { characterId: 'character-1' },
        update: { mode: 'game', sendToFoundry: true },
        create: {
          characterId: 'character-1',
          mode: 'game',
          sendToFoundry: true,
        },
        // Sending Stone's link code stays on the server
        omit: { sendingStoneToken: true },
      })
    })

    it('should change only the settings given', async () => {
      await updateCharacterSettings('character-1', 'user-1', {
        sendToFoundry: false,
      })

      expect(prismaMock.characterSettings.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ update: { sendToFoundry: false } }),
      )
    })
  })
})
