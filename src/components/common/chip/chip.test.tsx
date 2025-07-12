import { render, useUser } from '@test-utils'
import { Chip } from './chip'

describe('components/common/chip', () => {
  it('should render chip with text', () => {
    const { getByText, queryByTestId } = render(<Chip label='Test Chip' />)
    expect(getByText('Test Chip')).toBeInTheDocument()
    expect(queryByTestId('NewIcon')).not.toBeInTheDocument()
    expect(queryByTestId('CloseIcon')).not.toBeInTheDocument()
  })

  it('should render chip with new icon when isNew is true', () => {
    const { getByTestId } = render(<Chip label='New Chip' isNew />)
    expect(getByTestId('NewIcon')).toBeInTheDocument()
  })

  it('should render chip with close icon when onRemove is provided', async () => {
    const onRemove = jest.fn()
    const { getByTestId, user } = useUser(
      <Chip label='Removable Chip' onRemove={onRemove} />,
    )
    expect(getByTestId('CloseIcon')).toBeInTheDocument()

    await user.click(getByTestId('CloseIcon'))
    expect(onRemove).toHaveBeenCalled()
  })
})
