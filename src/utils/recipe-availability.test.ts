import {
  countAvailableMagicalIngredient,
  getRecipeAvailability,
} from './recipe-availability'

const unit = (id: string, { isExpired = false, isUsed = false } = {}) => ({
  isExpired,
  isUsed,
  magicalIngredient: { id },
})

const stew = {
  mundaneIngredients: ['Salt', 'Water', 'Onion'],
  magicalIngredients: [
    { ingredient: { id: 'ember', name: 'Ember Root' } },
    { ingredient: { id: 'frost', name: 'Frost Lily' } },
  ],
}

describe('utils/recipe-availability', () => {
  describe('countAvailableMagicalIngredient', () => {
    it('should count the units of that ingredient', () => {
      const pouch = {
        magicalIngredients: [unit('ember'), unit('frost'), unit('ember')],
      }

      expect(countAvailableMagicalIngredient(pouch, 'ember')).toBe(2)
      expect(countAvailableMagicalIngredient(pouch, 'frost')).toBe(1)
      expect(countAvailableMagicalIngredient(pouch, 'moss')).toBe(0)
    })

    it('should leave out expired and used units', () => {
      const pouch = {
        magicalIngredients: [
          unit('ember', { isExpired: true }),
          unit('ember', { isUsed: true }),
          unit('ember'),
        ],
      }

      expect(countAvailableMagicalIngredient(pouch, 'ember')).toBe(1)
    })

    it('should skip entries without a magical ingredient', () => {
      // eslint-disable-next-line unicorn/no-null
      const pouch = { magicalIngredients: [{ magicalIngredient: null }] }

      expect(countAvailableMagicalIngredient(pouch, 'ember')).toBe(0)
    })
  })

  describe('getRecipeAvailability', () => {
    it('should be makeable with enough of everything', () => {
      const availability = getRecipeAvailability(stew, {
        commonIngredients: 3,
        magicalIngredients: [unit('ember'), unit('frost'), unit('frost')],
      })

      expect(availability).toEqual({
        canMake: true,
        hasCommonIngredients: true,
        commonIngredients: { have: 3, needed: 3 },
        magicalIngredientCounts: { ember: 1, frost: 2 },
        missingMagicalIngredients: [],
      })
    })

    it('should not be makeable when common ingredients are short', () => {
      const availability = getRecipeAvailability(stew, {
        commonIngredients: 1,
        magicalIngredients: [unit('ember'), unit('frost')],
      })

      expect(availability.canMake).toBe(false)
      expect(availability.hasCommonIngredients).toBe(false)
      expect(availability.commonIngredients).toEqual({ have: 1, needed: 3 })
      expect(availability.missingMagicalIngredients).toEqual([])
    })

    it('should name each magical ingredient the pouch has none of', () => {
      const availability = getRecipeAvailability(stew, {
        commonIngredients: 5,
        magicalIngredients: [unit('frost')],
      })

      expect(availability.canMake).toBe(false)
      expect(availability.hasCommonIngredients).toBe(true)
      expect(availability.missingMagicalIngredients).toEqual([
        { id: 'ember', name: 'Ember Root' },
      ])
      expect(availability.magicalIngredientCounts).toEqual({
        ember: 0,
        frost: 1,
      })
    })

    it('should count only units that aren’t expired or used', () => {
      const availability = getRecipeAvailability(stew, {
        commonIngredients: 3,
        magicalIngredients: [
          unit('ember', { isExpired: true }),
          unit('frost', { isUsed: true }),
          unit('frost'),
        ],
      })

      expect(availability.canMake).toBe(false)
      expect(availability.missingMagicalIngredients).toEqual([
        { id: 'ember', name: 'Ember Root' },
      ])
      expect(availability.magicalIngredientCounts).toEqual({
        ember: 0,
        frost: 1,
      })
    })

    it('should be makeable without any ingredients when none are needed', () => {
      const availability = getRecipeAvailability(
        { mundaneIngredients: [], magicalIngredients: [] },
        { commonIngredients: 0, magicalIngredients: [] },
      )

      expect(availability.canMake).toBe(true)
    })
  })
})
