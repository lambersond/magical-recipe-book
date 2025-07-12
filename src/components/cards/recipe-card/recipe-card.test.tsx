import { render } from '@test-utils'
import { RecipeCard } from './recipe-card'

describe('components/cards/recipe-card', () => {
  it('should render recipe card with all details', () => {
    const recipe = {
      id: '1',
      name: 'Healing Potion',
      description: 'A potion that heals wounds and restores health.',
      difficulty: 3,
      boonText: 'This is devine',
      baneText: 'This is disastrous',
      mundaneIngredients: ['Water', 'Herbs'],
      magicalIngredients: [
        { name: 'Mana Crystal', boon: 'Restores 10 health' },
        { name: 'Phoenix Feather', boon: 'Revives once' },
      ],
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-01T00:00:00Z'),
    }

    const { getByText } = render(<RecipeCard {...recipe} />)

    expect(getByText('Healing Potion')).toBeInTheDocument()
    expect(
      getByText('A potion that heals wounds and restores health.'),
    ).toBeInTheDocument()
    expect(getByText('DC 3')).toBeInTheDocument()
    expect(getByText('Ingredients')).toBeInTheDocument()
    expect(getByText('• Mundane:')).toBeInTheDocument()
    expect(getByText('Water, Herbs')).toBeInTheDocument()
    expect(getByText('• Magical:')).toBeInTheDocument()
    expect(getByText('Mana Crystal, Phoenix Feather')).toBeInTheDocument()
    expect(getByText('This is devine')).toBeInTheDocument()
    expect(getByText('This is disastrous')).toBeInTheDocument()
    expect(getByText(/Restores 10 health/)).toBeInTheDocument()
    expect(getByText(/Revives once/)).toBeInTheDocument()
  })
})
