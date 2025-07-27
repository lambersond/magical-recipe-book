import { render, screen } from '@test-utils'
import { CharacterHeader } from './character-header'

const useCharacterMock = jest.fn()
jest.mock('../hooks/use-character', () => ({
  useCharacter: () => useCharacterMock(),
}))

jest.mock('../character-actions-menu', () => ({
  CharacterActionsMenu: () => <div>Character Actions Menu</div>,
}))

describe('CharacterHeader', () => {
  it('renders the basics with no image', () => {
    useCharacterMock.mockReturnValue({
      name: 'Merlin',
      image: '',
      currentDay: 1,
    })
    render(<CharacterHeader />)
    expect(screen.getByText('Merlin')).toBeInTheDocument()
    expect(screen.getByText('Day 1')).toBeInTheDocument()
    expect(screen.queryByAltText('Merlin')).not.toBeInTheDocument()
  })

  it('renders the character image when provided', () => {
    useCharacterMock.mockReturnValue({
      name: 'Merlin',
      image: '/path/to/image.jpg',
      currentDay: 1,
    })
    render(<CharacterHeader />)
    const image = screen.getByAltText('Merlin')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fpath%2Fto%2Fimage.jpg&w=128&q=75',
    )
  })
})
