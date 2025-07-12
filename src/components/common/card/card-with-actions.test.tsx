import { useUser } from '@test-utils'
import { CardWithActions } from './card-with-actions'

describe('components/common/card/card-with-options', () => {
  it('should render options', async () => {
    const { getByText, getByTestId, user } = useUser(
      <CardWithActions
        title='Test Title'
        options={[{ label: 'Option 1', onClick: jest.fn }]}
      >
        <p>Test Content</p>
      </CardWithActions>,
    )

    await user.click(getByTestId('MoreVertIcon'))

    expect(getByText('Option 1')).toBeInTheDocument()
    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Option 1')).toBeInTheDocument()
  })

  it('should not render options when empty', () => {
    const { queryByTestId } = useUser(
      <CardWithActions title='Test Title' options={[]}>
        <p>Test Content</p>
      </CardWithActions>,
    )

    expect(queryByTestId('MoreVertIcon')).not.toBeInTheDocument()
  })
})
