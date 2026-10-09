import { compareByRarity, getRarityWeight, getRecipeRarity } from './rarity'

const ingredient = (rarity: string) => ({ ingredient: { rarity } })

describe('utils/rarity', () => {
  describe('getRarityWeight', () => {
    it('should rank rarities from common to legendary', () => {
      expect(getRarityWeight('common')).toBeLessThan(getRarityWeight('rare'))
      expect(getRarityWeight('epic')).toBeLessThan(getRarityWeight('legendary'))
    })

    it('should rank a missing or unknown rarity below common', () => {
      expect(getRarityWeight()).toBe(0)
      expect(getRarityWeight('mythic')).toBe(0)
      expect(getRarityWeight('common')).toBeGreaterThan(0)
    })
  })

  describe('getRecipeRarity', () => {
    it('should be the rarest magical ingredient', () => {
      expect(
        getRecipeRarity([
          ingredient('uncommon'),
          ingredient('very-rare'),
          ingredient('rare'),
        ]),
      ).toBe('very-rare')
    })

    it('should be undefined without magical ingredients', () => {
      expect(getRecipeRarity([])).toBeUndefined()
    })
  })

  describe('compareByRarity', () => {
    const items = [
      { name: 'Moss', rarity: 'uncommon' },
      { name: 'Dragon Pepper', rarity: 'legendary' },
      { name: 'Salt', rarity: undefined },
      { name: 'Ash', rarity: 'uncommon' },
    ]
    const sortBy = (sort: Parameters<typeof compareByRarity>[0]) =>
      items
        .toSorted(
          compareByRarity(
            sort,
            item => item.rarity,
            item => item.name,
          ),
        )
        .map(item => item.name)

    it('should keep the existing order by default', () => {
      expect(sortBy('default')).toEqual([
        'Moss',
        'Dragon Pepper',
        'Salt',
        'Ash',
      ])
    })

    it('should put the rarest first, breaking ties by name', () => {
      expect(sortBy('rarest')).toEqual(['Dragon Pepper', 'Ash', 'Moss', 'Salt'])
    })

    it('should put the most common first, breaking ties by name', () => {
      expect(sortBy('commonest')).toEqual([
        'Salt',
        'Ash',
        'Moss',
        'Dragon Pepper',
      ])
    })
  })
})
