/* eslint-disable unicorn/no-null */
import { screen, useUser } from '@test-utils'
import { CharacterActionsMenu } from './character-actions-menu'
import { CharacterProvider } from '@/components/character/providers/character-provider'
import { ModalProvider } from '@/components/modals/modal-provider'
import { useFeatureFlags } from '@/hooks/use-feature-flags'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'character-1' }),
  useRouter: () => ({ push: jest.fn() }),
}))
jest.mock('@/hooks/use-feature-flags', () => ({ useFeatureFlags: jest.fn() }))

const useFeatureFlagsMock = jest.mocked(useFeatureFlags)

function setup(linkedAt: string | null = null) {
  const rendered = useUser(
    <ModalProvider>
      <CharacterProvider
        defaultCharacter={{
          id: 'character-1',
          name: 'Thorin',
          settings: { sendingStoneLinkedAt: linkedAt },
        }}
      >
        <CharacterActionsMenu />
      </CharacterProvider>
    </ModalProvider>,
  )
  const openMenu = () =>
    rendered.user.click(document.querySelector('.lucide-ellipsis-vertical')!)
  return { ...rendered, openMenu }
}

describe('components/character/character-actions-menu', () => {
  it('should not offer Sending Stone while sending is off', async () => {
    useFeatureFlagsMock.mockReturnValue({})
    const { openMenu } = setup()

    await openMenu()

    expect(screen.getByText('Edit Character')).toBeInTheDocument()
    expect(screen.queryByText('Link Sending Stone')).not.toBeInTheDocument()
  })

  it('should link the character to Sending Stone', async () => {
    useFeatureFlagsMock.mockReturnValue({ isSendingStoneEnabled: true })
    const { user, openMenu } = setup()

    await openMenu()
    await user.click(screen.getByText('Link Sending Stone'))

    expect(
      await screen.findByTestId('link-sending-stone-form__token'),
    ).toBeInTheDocument()
  })

  it('should show a linked character’s link', async () => {
    useFeatureFlagsMock.mockReturnValue({ isSendingStoneEnabled: true })
    const { openMenu } = setup('2026-10-24T12:00:00.000Z')

    await openMenu()

    expect(screen.getByText('Sending Stone Link')).toBeInTheDocument()
  })
})
