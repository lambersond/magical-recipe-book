/* eslint-disable unicorn/no-null */
import { screen, useUser, waitFor } from '@test-utils'
import { CharacterSettingsModal } from './character-settings-modal'
import type { CharacterSettings } from '@/types'

const mockCloseModal = jest.fn()

jest.mock('@/hooks/use-modals', () => ({
  useModals: jest.fn(() => ({ closeModal: mockCloseModal })),
}))

const LINKED_AT = '2026-10-24T12:00:00.000Z'

function setup({
  settings = {
    mode: 'companion',
    sendToFoundry: false,
    sendingStoneLinkedAt: null,
  },
  isSendingStoneEnabled = true,
}: {
  settings?: CharacterSettings | null
  isSendingStoneEnabled?: boolean
} = {}) {
  const onSave = jest.fn(async () => {})
  const onLink = jest.fn(async () => LINKED_AT)
  const onUnlink = jest.fn(async () => null)
  return {
    onSave,
    onLink,
    onUnlink,
    ...useUser(
      <CharacterSettingsModal
        open
        characterName='Thorin'
        settings={settings}
        isSendingStoneEnabled={isSendingStoneEnabled}
        onSave={onSave}
        onLink={onLink}
        onUnlink={onUnlink}
      />,
    ),
  }
}

const sendSwitch = () =>
  screen.queryByLabelText('Send to FoundryVTT via the Sending Stone')
const tokenInput = () => screen.queryByTestId('link-sending-stone-form__token')

describe('components/modals/character-settings-modal', () => {
  it('should explain the mode chosen', async () => {
    const { user } = setup()

    expect(screen.getByText('Thorin')).toBeInTheDocument()
    expect(
      screen.getByText('You enter your own roll results when foraging.'),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Game' }))

    expect(
      screen.getByText(
        'Foraging rolls come from the app’s dice, and magical ingredients only from biomes.',
      ),
    ).toBeInTheDocument()
  })

  it('should save the mode and switch, then close', async () => {
    const { user, onSave } = setup({
      settings: {
        mode: 'companion',
        sendToFoundry: false,
        sendingStoneLinkedAt: LINKED_AT,
      },
    })

    await user.click(screen.getByRole('button', { name: 'Game' }))
    await user.click(sendSwitch()!)
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSave).toHaveBeenCalledWith({ mode: 'game', sendToFoundry: true })
    await waitFor(() =>
      expect(mockCloseModal).toHaveBeenCalledWith('CharacterSettingsModal'),
    )
  })

  it('should not save sending before the character is linked', async () => {
    const { user, onSave } = setup()

    await user.click(sendSwitch()!)
    await user.type(tokenInput()!, 'ss_abc123')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(
      screen.getByText('Link this character first, or turn sending off.'),
    ).toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()
    expect(mockCloseModal).not.toHaveBeenCalled()

    // Linking answers it
    await user.click(screen.getByRole('button', { name: 'Link' }))
    expect(await screen.findByText(/Linked on/)).toBeInTheDocument()
    expect(
      screen.queryByText('Link this character first, or turn sending off.'),
    ).not.toBeInTheDocument()
  })

  it('should start a character without settings in Companion mode, not sending', async () => {
    const { user, onSave } = setup({ settings: null })

    expect(sendSwitch()).not.toBeChecked()
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSave).toHaveBeenCalledWith({
      mode: 'companion',
      sendToFoundry: false,
    })
  })

  it('should show nothing of Sending Stone while sending is off', async () => {
    const { user, onSave } = setup({
      settings: {
        mode: 'game',
        sendToFoundry: true,
        sendingStoneLinkedAt: LINKED_AT,
      },
      isSendingStoneEnabled: false,
    })

    expect(sendSwitch()).not.toBeInTheDocument()
    expect(screen.queryByText(/Sending Stone/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Linked on/)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onSave).toHaveBeenCalledWith({ mode: 'game' })
  })

  it('should keep the modal open with why it wasn’t saved', async () => {
    const { user, onSave } = setup()
    onSave.mockRejectedValue(new Error('Character not found'))

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Character not found')).toBeInTheDocument()
    expect(mockCloseModal).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
  })

  it('should close without saving on Cancel', async () => {
    const { user, onSave } = setup()

    await user.click(screen.getByRole('button', { name: 'Game' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onSave).not.toHaveBeenCalled()
    expect(mockCloseModal).toHaveBeenCalledWith('CharacterSettingsModal')
  })

  it('should show the link code form once sending is on', async () => {
    const { user } = setup()

    expect(tokenInput()).not.toBeInTheDocument()
    await user.click(sendSwitch()!)

    expect(tokenInput()).toBeInTheDocument()
  })

  it('should link the character at once, then show when', async () => {
    const { user, onLink, onSave } = setup()

    await user.click(sendSwitch()!)
    await user.type(tokenInput()!, 'ss_abc123')
    await user.click(screen.getByRole('button', { name: 'Link' }))

    await waitFor(() => expect(onLink).toHaveBeenCalledWith('ss_abc123'))
    expect(await screen.findByText(/Linked on/)).toBeInTheDocument()
    expect(tokenInput()).not.toBeInTheDocument()
    // Linked is sending, so closing without Save still shows Send
    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith({ sendToFoundry: true }),
    )
    expect(mockCloseModal).not.toHaveBeenCalled()
  })

  it('should say why the character wasn’t linked', async () => {
    const { user, onLink } = setup()
    onLink.mockRejectedValue(new Error('That isn’t your character'))

    await user.click(sendSwitch()!)
    await user.type(tokenInput()!, 'ss_abc123')
    await user.click(screen.getByRole('button', { name: 'Link' }))

    expect(
      await screen.findByText('That isn’t your character'),
    ).toBeInTheDocument()
    expect(tokenInput()).toBeInTheDocument()
  })

  describe('for a linked character', () => {
    const linked = {
      mode: 'companion',
      sendToFoundry: true,
      sendingStoneLinkedAt: LINKED_AT,
    } as const

    it('should show when it was linked', () => {
      setup({ settings: linked })

      expect(sendSwitch()).toBeChecked()
      expect(screen.getByText(/Linked on/)).toBeInTheDocument()
      expect(tokenInput()).not.toBeInTheDocument()
    })

    it('should change the code', async () => {
      const { user, onLink } = setup({ settings: linked })

      await user.click(screen.getByRole('button', { name: 'Change code' }))
      await user.type(tokenInput()!, 'ss_new456')
      await user.click(screen.getByRole('button', { name: 'Link' }))

      await waitFor(() => expect(onLink).toHaveBeenCalledWith('ss_new456'))
      await waitFor(() => expect(tokenInput()).not.toBeInTheDocument())
    })

    it('should unlink it at once', async () => {
      const { user, onUnlink } = setup({ settings: linked })

      await user.click(screen.getByRole('button', { name: 'Unlink' }))

      expect(onUnlink).toHaveBeenCalled()
      expect(
        await screen.findByTestId('link-sending-stone-form__token'),
      ).toBeInTheDocument()
      expect(screen.queryByText(/Linked on/)).not.toBeInTheDocument()
    })
  })
})
