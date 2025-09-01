import { useUser } from '@test-utils'
import { EditCharacterModal } from './edit-character-modal'

const mockCloseModal = jest.fn()

jest.mock('@/hooks/use-modals', () => ({
  useModals: jest.fn(() => ({
    closeModal: mockCloseModal,
  })),
}))

jest.mock('@/hooks/use-lazy-data-fetching', () => ({
  useLazyDataFetching: jest.fn(() => ['Old Name']),
}))

describe('components/modals/edit-character-modal', () => {
  it('should call onSubmit with the new character', async () => {
    const onSubmit = jest.fn()
    const { getByText, getByTestId, user } = useUser(
      <EditCharacterModal
        open
        onSubmit={onSubmit}
        character={{
          name: 'name',
          description: 'description',
          abilities: {
            proficiency: 2,
            cookingAbility: 3,
            hasCookingTools: false,
          },
        }}
      />,
    )

    expect(getByText('Edit Character')).toBeInTheDocument()
    const nameField = getByTestId('edit-character-form__name')
    const descriptionField = getByTestId('edit-character-form__description')

    await user.clear(nameField)
    await user.type(nameField, 'New Name')
    await user.clear(descriptionField)
    await user.type(descriptionField, 'New Description')
    await user.click(getByTestId('edit-character-form__submit'))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'New Name',
      description: 'New Description',
      abilities: {
        proficiency: 2,
        cookingAbility: 3,
        hasCookingTools: false,
      },
    })
    expect(mockCloseModal).toHaveBeenCalledWith('EditCharacterModal')
  })
})
