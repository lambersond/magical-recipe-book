import { screen, useUser, waitFor } from '@test-utils'
import { LinkSendingStoneModal } from './link-sending-stone-modal'

const mockCloseModal = jest.fn()

jest.mock('@/hooks/use-modals', () => ({
  useModals: jest.fn(() => ({ closeModal: mockCloseModal })),
}))

function setup(props: Partial<Parameters<typeof LinkSendingStoneModal>[0]>) {
  const onLink = jest.fn<Promise<void>, [string]>(async () => {})
  const onUnlink = jest.fn(async () => {})
  return {
    onLink,
    onUnlink,
    ...useUser(
      <LinkSendingStoneModal
        open
        characterName='Thorin'
        onLink={onLink}
        onUnlink={onUnlink}
        {...props}
      />,
    ),
  }
}

describe('components/modals/link-sending-stone-modal', () => {
  it('should link the character and close', async () => {
    const { user, onLink } = setup({})

    await user.type(
      screen.getByTestId('link-sending-stone-form__token'),
      'ss_abc123',
    )
    await user.click(screen.getByRole('button', { name: 'Link' }))

    await waitFor(() => expect(onLink).toHaveBeenCalledWith('ss_abc123'))
    expect(mockCloseModal).toHaveBeenCalledWith('LinkSendingStoneModal')
  })

  it('should keep the modal open with why it wasn’t linked', async () => {
    const { user, onLink } = setup({})
    onLink.mockRejectedValue(new Error('Character not found'))

    await user.type(
      screen.getByTestId('link-sending-stone-form__token'),
      'ss_abc123',
    )
    await user.click(screen.getByRole('button', { name: 'Link' }))

    expect(await screen.findByText('Character not found')).toBeInTheDocument()
    expect(mockCloseModal).not.toHaveBeenCalled()
  })

  it('should offer to unlink a linked character', async () => {
    const { user, onUnlink } = setup({ linkedAt: '2026-10-24T12:00:00.000Z' })

    expect(screen.getByText(/Linked on/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Unlink' }))

    expect(onUnlink).toHaveBeenCalled()
  })

  it('should not offer to unlink a character that isn’t linked', () => {
    setup({})

    expect(
      screen.queryByRole('button', { name: 'Unlink' }),
    ).not.toBeInTheDocument()
  })
})
