import { render, fireEvent } from '@test-utils'
import { CharacterCard } from './character-card'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  redirect: (route: string) => mockPush(route),
}))

describe('CharacterCard', () => {
  const mockProps = {
    id: 'test-id',
    name: 'Test Character',
    currentDay: 5,
    description: 'Test description',
    image: '/test-image.png',
    recipes: 10,
    commonIngredients: 15,
    magicalIngredients: 7,
    updatedAt: new Date('2023-01-01T12:00:00Z'),
  }

  it('renders character card with correct information', () => {
    const { getAllByText, getByAltText, getByText } = render(
      <CharacterCard {...mockProps} />,
    )

    expect(getByText('Test Character')).toBeInTheDocument()
    expect(getByText('Day')).toBeInTheDocument()
    expect(getByText('5')).toBeInTheDocument()
    expect(getByText('Test description')).toBeInTheDocument()
    expect(getByAltText('Test Character')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Ftest-image.png&w=128&q=75',
    )

    expect(getByText('recipes')).toBeInTheDocument()
    expect(getByText('common')).toBeInTheDocument()
    expect(getByText('magical')).toBeInTheDocument()

    expect(getByText('10')).toBeInTheDocument()
    expect(getByText('15')).toBeInTheDocument()
    expect(getByText('7')).toBeInTheDocument()

    expect(getAllByText('Ingredients').length).toBe(2)
    expect(getByText('Known')).toBeInTheDocument()
  })

  it('navigates to character detail page when clicked', () => {
    const { getByText } = render(<CharacterCard {...mockProps} />)

    fireEvent.click(getByText('Test Character'))

    expect(mockPush).toHaveBeenCalledWith('/characters/test-id')
  })

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      id: 'minimal-id',
      name: 'Minimal Character',
      currentDay: 1,
      updatedAt: new Date('2023-01-01T12:00:00Z'),
    }

    const { getAllByText, getByText, queryByAltText } = render(
      <CharacterCard {...minimalProps} />,
    )

    expect(getByText('Minimal Character')).toBeInTheDocument()
    expect(getAllByText('0')).toHaveLength(3)
    expect(queryByAltText('Minimal Character')).not.toBeInTheDocument()
  })
})
