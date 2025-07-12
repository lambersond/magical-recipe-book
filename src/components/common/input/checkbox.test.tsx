import { render, useUser } from '@test-utils'
import { Checkbox } from './checkbox'

describe('components/common/input/checkbox', () => {
  it('should render checkbox with correct label and default checked', () => {
    const { getByText, getByTestId } = render(
      <Checkbox label='Test Checkbox' checked onChange={jest.fn} />,
    )

    expect(getByText('Test Checkbox')).toBeInTheDocument()
    expect(getByTestId('CheckboxIcon')).toBeInTheDocument()
  })

  it('should call onChange when checkbox is toggled', async () => {
    const { getByTestId, user } = useUser(
      <Checkbox label='Checkbox' data-testid='checkbox' />,
    )

    const checkboxElement = getByTestId('checkbox')
    await user.click(checkboxElement)

    expect(checkboxElement).toBeChecked()
  })
})
