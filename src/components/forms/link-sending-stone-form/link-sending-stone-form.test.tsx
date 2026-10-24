import { screen, useUser, waitFor } from '@test-utils'
import { LinkSendingStoneForm } from './link-sending-stone-form'

const input = () => screen.getByTestId('link-sending-stone-form__token')
const link = () => screen.getByRole('button', { name: 'Link' })

describe('components/forms/link-sending-stone-form', () => {
  it('should submit the trimmed link code', async () => {
    const onSubmit = jest.fn()
    const { user } = useUser(<LinkSendingStoneForm onSubmit={onSubmit} />)

    await user.type(input(), '  ss_abc123  ')
    await user.click(link())

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('ss_abc123'))
  })

  it.each([
    ['', 'Paste the link code from Sending Stone'],
    ['not a code', 'That isn’t a Sending Stone link code'],
  ])('should refuse %p', async (code, error) => {
    const onSubmit = jest.fn()
    const { user } = useUser(<LinkSendingStoneForm onSubmit={onSubmit} />)

    if (code) await user.type(input(), code)
    await user.click(link())

    expect(await screen.findByText(error)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
