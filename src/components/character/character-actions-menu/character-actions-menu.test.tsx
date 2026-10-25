/* eslint-disable unicorn/no-null */
import { screen, useUser, waitFor } from '@test-utils'
import { CharacterActionsMenu } from './character-actions-menu'
import { CharacterProvider } from '@/components/character/providers/character-provider'
import { ModalProvider } from '@/components/modals/modal-provider'
import { useFeatureFlags } from '@/hooks/use-feature-flags'
import type { CharacterSettings } from '@/types'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'character-1' }),
  useRouter: () => ({ push: jest.fn() }),
}))
jest.mock('@/hooks/use-feature-flags', () => ({ useFeatureFlags: jest.fn() }))

const useFeatureFlagsMock = jest.mocked(useFeatureFlags)

const LINKED_AT = '2026-10-24T12:00:00.000Z'

type Answer = { status?: number; body?: unknown }

/** Answers each "METHOD url" with its body; anything else with []. */
function mockApi(answers: Record<string, Answer> = {}) {
  const fetchMock = jest.fn(async (url: string, init?: RequestInit) => {
    const { status = 200, body = [] } =
      answers[`${init?.method ?? 'GET'} ${url}`] ?? {}
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    } as Response
  })
  globalThis.fetch = fetchMock as typeof fetch
  return fetchMock
}

function setup(settings: Partial<CharacterSettings> | null = {}) {
  const rendered = useUser(
    <ModalProvider>
      <CharacterProvider
        defaultCharacter={{
          id: 'character-1',
          name: 'Thorin',
          ingredientsPouch: { id: 'pouch-1', magicalIngredients: [] },
          foragingLog: [],
          settings: settings && {
            mode: 'companion',
            sendToFoundry: false,
            sendingStoneLinkedAt: null,
            ...settings,
          },
        }}
      >
        <CharacterActionsMenu />
      </CharacterProvider>
    </ModalProvider>,
  )
  const choose = async (label: string) => {
    await rendered.user.click(
      document.querySelector('.lucide-ellipsis-vertical')!,
    )
    await rendered.user.click(screen.getByRole('button', { name: label }))
  }
  return { ...rendered, choose }
}

const sendSwitch = () =>
  screen.queryByLabelText('Send to FoundryVTT via the Sending Stone')

describe('components/character/character-actions-menu', () => {
  beforeEach(() => {
    useFeatureFlagsMock.mockReturnValue({ isSendingStoneEnabled: true })
    mockApi()
  })

  it('should open the character’s settings', async () => {
    const { choose } = setup()

    await choose('Character Settings')

    expect(await screen.findByText('⚙️ Character Settings')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Companion' })).toBeVisible()
    expect(sendSwitch()).not.toBeChecked()
  })

  it('should not offer Sending Stone while sending is off', async () => {
    useFeatureFlagsMock.mockReturnValue({})
    const { choose } = setup()

    await choose('Character Settings')

    expect(await screen.findByText('⚙️ Character Settings')).toBeInTheDocument()
    expect(sendSwitch()).not.toBeInTheDocument()
    expect(screen.queryByText(/Sending Stone/)).not.toBeInTheDocument()
  })

  it('should save the settings to the character', async () => {
    const fetchMock = mockApi({
      'PUT /api/characters/character-1/settings': {
        body: {
          mode: 'game',
          sendToFoundry: true,
          sendingStoneLinkedAt: LINKED_AT,
        },
      },
    })
    const { user, choose } = setup({ sendingStoneLinkedAt: LINKED_AT })

    await choose('Character Settings')
    await user.click(await screen.findByRole('button', { name: 'Game' }))
    await user.click(sendSwitch()!)
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/characters/character-1/settings',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ mode: 'game', sendToFoundry: true }),
      },
    )
    await waitFor(() =>
      expect(
        screen.queryByText('⚙️ Character Settings'),
      ).not.toBeInTheDocument(),
    )

    // The character now forages in Game mode, and opens with what was saved
    await choose('Go Foraging')
    expect(await screen.findByText('Survival check')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Pick ingredient' }),
    ).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await choose('Character Settings')
    expect(sendSwitch()).toBeChecked()
  })

  it('should say why the settings weren’t saved', async () => {
    mockApi({
      'PUT /api/characters/character-1/settings': {
        status: 404,
        body: { error: 'Character not found' },
      },
    })
    const { user, choose } = setup()

    await choose('Character Settings')
    await user.click(await screen.findByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Character not found')).toBeInTheDocument()
  })

  it('should unlink the character from Sending Stone', async () => {
    const fetchMock = mockApi({
      'DELETE /api/characters/character-1/sending-stone': {
        body: { sendingStoneLinkedAt: null },
      },
    })
    const { user, choose } = setup({
      sendToFoundry: true,
      sendingStoneLinkedAt: LINKED_AT,
    })

    await choose('Character Settings')
    expect(await screen.findByText(/Linked on/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Unlink' }))

    expect(
      await screen.findByTestId('link-sending-stone-form__token'),
    ).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/characters/character-1/sending-stone',
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
    )

    // Unlinking saved at once, so it's kept without saving
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await choose('Character Settings')
    expect(
      await screen.findByTestId('link-sending-stone-form__token'),
    ).toBeInTheDocument()
  })

  it('should forage in the character’s mode', async () => {
    const { choose } = setup({ mode: 'game' })

    await choose('Go Foraging')

    expect(await screen.findByText('Survival check')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Pick ingredient' }),
    ).not.toBeInTheDocument()
  })

  it('should forage in Companion mode for a character without settings', async () => {
    const { choose } = setup(null)

    await choose('Go Foraging')

    expect(
      await screen.findByRole('button', { name: 'Pick ingredient' }),
    ).toBeInTheDocument()
  })

  it('should say why what was foraged wasn’t logged', async () => {
    mockApi({
      'GET /api/ingredients': { body: [{ id: 'sugar', name: 'Ash Sugar' }] },
      'POST /api/characters/character-1/forage': {
        status: 409,
        body: {
          error:
            'In Game mode, magical ingredients are found by foraging a biome',
        },
      },
    })
    const { user, choose } = setup()

    await choose('Go Foraging')
    await user.click(
      await screen.findByRole('button', { name: 'Pick ingredient' }),
    )
    await user.click(screen.getByTestId('Dropdown__button'))
    await user.click(await screen.findByTestId('Dropdown__option-sugar'))
    await user.click(screen.getByRole('button', { name: 'Log Results' }))

    expect(await screen.findByText('Not Logged')).toBeInTheDocument()
    expect(
      screen.getByText(
        'In Game mode, magical ingredients are found by foraging a biome',
      ),
    ).toBeInTheDocument()
  })
})
