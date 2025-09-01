import { render } from '@test-utils'
import { IngredientCard } from './ingredient-card'
import type { Ingredient } from '@/types'

describe('components/cards/ingredient-card', () => {
  const ingredient = {
    id: 'abc',
    name: 'Name',
    description: '',
    bane: 'Bane',
    boon: 'Boon',
    rarity: 'common',
    biomes: [
      {
        biome: {
          id: '1',
          name: 'Biome 1',
          description: 'Description 1',
        },
      },
      {
        biome: {
          id: '2',
          name: 'Biome 2',
          description: 'Description 2',
        },
      },
    ],
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z'),
  } as any as Ingredient

  it('should match snapshot', () => {
    expect(
      render(<IngredientCard {...ingredient} />).asFragment(),
    ).toMatchSnapshot()
  })
})
