import { render, fireEvent, mockFetch } from '@test-utils'
import { QuickActions } from './quick-actions'
import { ModalProvider } from '@/components/modals/modal-provider'

const mockOpenModal = jest.fn()

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'test-character-id' }),
}))

jest.mock('@/components/character/hooks/use-character', () => ({
  useCharacterApi: jest.fn().mockReturnValue(jest.fn(update => update)),
}))

jest.mock('@/hooks/use-modals', () => ({
  useModals: () => ({
    openModal: mockOpenModal,
    closeModal: jest.fn(),
  }),
}))

describe('components/character/tabs/character-overview/sections/quick-actions', () => {
  it('renders component properly', () => {
    const { getByText, queryByText } = render(<QuickActions />, {
      wrapper: ModalProvider,
    })

    expect(getByText('Quick Actions')).toBeInTheDocument()
    expect(getByText('Advance Day')).toBeInTheDocument()
    expect(getByText('Learn Recipe')).toBeInTheDocument()
    expect(getByText('Go Foraging')).toBeInTheDocument()
    expect(queryByText('Cook Meal')).not.toBeInTheDocument()
  })

  it('calls the update function when Advance Day is clicked', async () => {
    mockFetch({ status: 200, responseData: { character: { currentDay: 2 } } })

    const { getByText } = render(<QuickActions />, { wrapper: ModalProvider })

    fireEvent.click(getByText('Advance Day'))

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/characters/test-character-id/advance-day',
      { body: '{}', credentials: 'include', method: 'PUT' },
    )
  })

  it('calls the update function when Go Foraging is clicked', async () => {
    mockFetch({ status: 200, responseData: { commonIngredients: 5 } })

    const { getByText } = render(<QuickActions />, { wrapper: ModalProvider })

    fireEvent.click(getByText('Go Foraging'))

    expect(mockOpenModal).toHaveBeenCalledWith('GoForagingModal', {
      onSubmit: expect.any(Function),
    })
  })

  it('calls the update function when Learn Recipe is clicked', async () => {
    mockFetch({ status: 200, responseData: { recipe: { id: 'recipe-id' } } })

    const { getByText } = render(<QuickActions />, { wrapper: ModalProvider })

    fireEvent.click(getByText('Learn Recipe'))

    expect(mockOpenModal).toHaveBeenCalledWith('AddCookbookRecipeModal', {
      onSubmit: expect.any(Function),
    })
  })

  it.skip('unimplemented btns', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    const { getByText } = render(<QuickActions />, { wrapper: ModalProvider })

    fireEvent.click(getByText('Cook Meal'))
    expect(consoleSpy).toHaveBeenCalledWith('Bake Bread')

    consoleSpy.mockRestore()
  })
})
