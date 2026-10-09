import { render } from '@test-utils'
import { BiomeCard } from './biome-card'

describe('components/cards/biome-card', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <BiomeCard
          key='unused'
          id='abc'
          image='🌋'
          name='biomeName'
          description=''
          ingredients={[
            {
              ingredient: {
                id: '1',
                name: 'ingredient1',
                description: 'ingredientDescription',
                boon: 'ingredientBoon',
                bane: 'ingredientBane',
                rarity: 'common',
              },
            },
          ]}
        />,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
