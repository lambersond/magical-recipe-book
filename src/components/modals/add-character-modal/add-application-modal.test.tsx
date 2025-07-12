import { useUser } from '@test-utils'
import { AddCharacterModal } from './add-character-modal'

const mockCloseModal = jest.fn()

jest.mock('@/hooks/use-modals', () => ({
  useModals: jest.fn(() => ({
    closeModal: mockCloseModal,
  })),
}))

describe('components/modals/add-character-modal', () => {
  it('should call onSubmit with the new character', async () => {
    const onSubmit = jest.fn()
    const { getByText, getByTestId, user } = useUser(
      <AddCharacterModal open onSubmit={onSubmit} />,
    )

    expect(getByText('Add Character')).toBeInTheDocument()

    await user.type(getByTestId('add-character-form__name'), 'Name')

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Name',
    })
    expect(mockCloseModal).toHaveBeenCalledWith('AddCharacterModal')
  })
})
