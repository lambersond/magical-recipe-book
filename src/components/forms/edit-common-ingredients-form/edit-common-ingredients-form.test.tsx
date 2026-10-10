import { screen, useUser, waitFor } from '@test-utils'
import { EditCommonIngredientsForm } from './edit-common-ingredients-form'

const input = (index: number) =>
  screen.getByTestId(`edit-common-ingredients-form__ingredient-${index}`)

function setup(onSubmit = jest.fn()) {
  return useUser(
    <EditCommonIngredientsForm
      mundaneIngredients={['Sea Salt', 'Water']}
      defaultMundaneIngredients={['Salt', 'Water']}
      onSubmit={onSubmit}
    />,
  )
}

describe('components/forms/edit-common-ingredients-form', () => {
  it('should show the current names with the originals as placeholders', () => {
    setup()

    expect(input(0)).toHaveValue('Sea Salt')
    expect(input(0)).toHaveAttribute('placeholder', 'Salt')
    expect(input(1)).toHaveValue('Water')
  })

  it('should submit trimmed names', async () => {
    const onSubmit = jest.fn()
    const { user } = setup(onSubmit)

    await user.clear(input(1))
    await user.type(input(1), '  Spring Water ')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(['Sea Salt', 'Spring Water']),
    )
  })

  it('should require every ingredient to have a name', async () => {
    const onSubmit = jest.fn()
    const { user } = setup(onSubmit)

    await user.clear(input(0))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(
      await screen.findByText('Ingredient name is required'),
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should reset the names to the originals', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Reset to original' }))

    expect(input(0)).toHaveValue('Salt')
    expect(input(1)).toHaveValue('Water')
  })

  it('should put the primary button bottom-right, after the secondary', () => {
    setup()

    const buttons = screen.getAllByRole('button')
    expect(buttons.map(button => button.textContent)).toEqual([
      'Reset to original',
      'Save',
    ])
    expect(buttons[1].parentElement).toHaveClass('justify-end')
  })
})
