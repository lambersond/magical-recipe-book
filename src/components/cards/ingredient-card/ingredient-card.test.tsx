import { render } from '@test-utils'
import { IngredientCard } from './ingredient-card'

describe('components/cards/ingredient-card', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <IngredientCard
          id='abc'
          name='Name'
          description=''
          bane='Bane'
          boon='Boon'
          rarity='Common'
          biomes={[
            { id: '1', name: 'Biome 1' },
            { id: '2', name: 'Biome 2' },
          ]}
          createdAt={new Date('2023-01-01T00:00:00Z')}
          updatedAt={new Date('2023-01-01T00:00:00Z')}
        />,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
