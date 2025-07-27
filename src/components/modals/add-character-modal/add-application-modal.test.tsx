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
    await user.type(
      getByTestId('add-character-form__description'),
      'Description',
    )
    await user.click(getByTestId('add-character-form__submit'))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Name',
      description: 'Description',
    })
    expect(mockCloseModal).toHaveBeenCalledWith('AddCharacterModal')
  })
})
