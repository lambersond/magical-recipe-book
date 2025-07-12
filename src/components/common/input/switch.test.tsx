import { render, useUser } from '@test-utils'
import { Switch } from './switch'

describe('components/common/input/switch', () => {
  it('should render switch with correct label and default checked', () => {
    const { getByText, getByLabelText } = render(<Switch label='Test Switch' />)

    expect(getByText('Test Switch')).toBeInTheDocument()
    expect(getByLabelText('Test Switch')).not.toBeChecked()
  })

  it('should call onChange when switch is toggled', async () => {
    const { getByTestId, user } = useUser(
      <Switch label='Switch' data-testid='switch' />,
    )

    const switchElement = getByTestId('switch')
    await user.click(switchElement)

    expect(switchElement).toBeChecked()
  })
})
