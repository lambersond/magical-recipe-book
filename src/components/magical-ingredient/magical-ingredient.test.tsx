import { render, screen } from '@test-utils'
import { MagicalIngredient } from './magical-ingredient'

const props = {
  name: 'Ember Root',
  rarity: 'rare',
  description: 'Warm to the touch.',
} as const

describe('components/magical-ingredient', () => {
  it('should say how many the character has, when it’s more than one', () => {
    render(<MagicalIngredient {...props} count={4} />)

    expect(screen.getByText('You have 4')).toBeInTheDocument()
  })

  it.each([[undefined], [0], [1]])(
    'should say nothing extra for a count of %s',
    count => {
      render(<MagicalIngredient {...props} count={count} />)

      expect(screen.getByText('Ember Root')).toBeInTheDocument()
      expect(screen.queryByText(/^You have/)).not.toBeInTheDocument()
    },
  )
})
