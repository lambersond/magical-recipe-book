/* eslint-disable unicorn/no-null */
import { mockFetch, screen, useUser, waitFor } from '@test-utils'
import { CharacterBackpack } from './character-backpack'
import { CharacterProvider } from '@/components/character/providers/character-provider'
import { ModalProvider } from '@/components/modals/modal-provider'
import { useFeatureFlags } from '@/hooks/use-feature-flags'

jest.mock('@/hooks/use-feature-flags', () => ({ useFeatureFlags: jest.fn() }))

const useFeatureFlagsMock = jest.mocked(useFeatureFlags)

const dish = {
  id: 'dish-1',
  status: 'boon',
  cookedOnDay: 3,
  consumedOnDay: 3,
  sentAt: null,
  recipe: {
    name: 'Ember Stew',
    description: 'A warming stew.',
    difficulty: 14,
    boonText: 'The stew sings.',
    baneText: 'The stew sulks.',
    magicalIngredients: [],
  },
}

function setup({
  linkedAt = '2026-10-23T12:00:00.000Z',
  sendToFoundry = true,
}: { linkedAt?: string | null; sendToFoundry?: boolean } = {}) {
  return useUser(
    <ModalProvider>
      <CharacterProvider
        defaultCharacter={{
          id: 'character-1',
          name: 'Thorin',
          currentDay: 3,
          backpack: { cookedDishes: [dish] },
          settings: {
            mode: 'companion',
            sendToFoundry,
            sendingStoneLinkedAt: linkedAt,
          },
        }}
      >
        <CharacterBackpack />
      </CharacterProvider>
    </ModalProvider>,
  )
}

const sendButton = () =>
  screen.queryByRole('button', { name: 'Send to Foundry' })

describe('components/character/tabs/character-backpack', () => {
  beforeEach(() => {
    useFeatureFlagsMock.mockReturnValue({ isSendingStoneEnabled: true })
  })

  it('should not offer to send dishes while sending is off', () => {
    useFeatureFlagsMock.mockReturnValue({})

    setup()

    expect(sendButton()).not.toBeInTheDocument()
  })

  it('should not offer to send the dishes of a character that doesn’t send them', () => {
    setup({ sendToFoundry: false })

    expect(sendButton()).not.toBeInTheDocument()
  })

  it('should send the dish and mark it sent', async () => {
    mockFetch({
      responseData: { id: 'dish-1', sentAt: '2026-10-24T12:00:00.000Z' },
    })
    const { user } = setup()

    await user.click(sendButton()!)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/characters/character-1/cooked-dish/dish-1/send',
      { method: 'POST', credentials: 'include' },
    )
    expect(await screen.findByText('sent to Foundry')).toBeInTheDocument()
    expect(sendButton()).not.toBeInTheDocument()
  })

  it('should say why the dish wasn’t sent', async () => {
    mockFetch({
      status: 502,
      responseData: { error: 'Sending Stone doesn’t take dishes yet.' },
    })
    const { user } = setup()

    await user.click(sendButton()!)

    expect(
      await screen.findByText('Sending Stone doesn’t take dishes yet.'),
    ).toBeInTheDocument()
    await waitFor(() => expect(sendButton()).toBeEnabled())
  })

  it('should open the character’s settings to link it before sending its first dish', async () => {
    mockFetch()
    const { user } = setup({ linkedAt: null })

    await user.click(sendButton()!)

    expect(await screen.findByText('⚙️ Character Settings')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Send to FoundryVTT via the Sending Stone'),
    ).toBeChecked()
    expect(
      screen.getByTestId('link-sending-stone-form__token'),
    ).toBeInTheDocument()
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('should send once the character is linked', async () => {
    mockFetch({
      responseData: { sendingStoneLinkedAt: '2026-10-24T12:00:00.000Z' },
    })
    const { user } = setup({ linkedAt: null })

    await user.click(sendButton()!)
    await user.type(
      await screen.findByTestId('link-sending-stone-form__token'),
      'ss_abc123',
    )
    await user.click(screen.getByRole('button', { name: 'Link' }))

    await waitFor(() =>
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/characters/character-1/sending-stone',
        {
          method: 'PUT',
          body: JSON.stringify({ token: 'ss_abc123' }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        },
      ),
    )
    expect(await screen.findByText(/Linked on/)).toBeInTheDocument()
    expect(
      screen.queryByTestId('link-sending-stone-form__token'),
    ).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    mockFetch({
      responseData: { id: 'dish-1', sentAt: '2026-10-24T12:00:00.000Z' },
    })
    await user.click(sendButton()!)

    expect(await screen.findByText('sent to Foundry')).toBeInTheDocument()
  })
})
