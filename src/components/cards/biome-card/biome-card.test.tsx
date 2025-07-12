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
        />,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
