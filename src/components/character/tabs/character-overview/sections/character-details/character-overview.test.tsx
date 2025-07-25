import { render, screen } from '@test-utils'
import { CharacterDetails } from './character-details'

jest.mock('@/components/character/hooks/use-character', () => ({
  useCharacter: () => ({
    description: 'Test description',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
  }),
}))

describe('components/character/tabs/character-overview/sections/character-details', () => {
  it('renders character details correctly', () => {
    render(<CharacterDetails />)

    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Created')).toBeInTheDocument()
    expect(screen.getByText('Last Updated')).toBeInTheDocument()
    expect(screen.getByText('Character Details')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('12/31/2022')).toBeInTheDocument()
    expect(screen.getByText('1/1/2023')).toBeInTheDocument()
  })
})
