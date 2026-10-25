import {
  diceRollMock,
  mockManyFetch,
  screen,
  useUser,
  waitFor,
} from '@test-utils'
import { ForageBiome } from './forage-biome'
import type { CharacterMode } from '@/types'

// Forests is not first, so a dropdown that resets to its first option shows
const BIOMES = [
  { id: 'lakes', name: 'Lakes', image: '🏞️', ingredientCount: 12 },
  { id: 'forest', name: 'Forests', image: '🌲', ingredientCount: 9 },
]
const found = {
  ingredient: {
    id: 'sugar',
    name: 'Ash Sugar',
    rarity: 'rare',
    description: 'Sweet crystals from cooled lava.',
  },
  dc: 13,
  roll: 17,
  success: true,
  ingredientsPouch: { id: 'pouch-1' },
  foragingLog: [],
}

function setup(
  forageResponse: object = found,
  status = 200,
  mode?: CharacterMode,
) {
  const fetchMock = mockManyFetch([
    { responseData: BIOMES },
    { status, responseData: forageResponse },
  ])
  const onForaged = jest.fn()
  const onClose = jest.fn()
  const view = useUser(
    <ForageBiome
      characterId='character-1'
      mode={mode}
      onForaged={onForaged}
      onClose={onClose}
    />,
  )
  return { ...view, fetchMock, onForaged, onClose }
}

const setupGame = () => setup(found, 200, 'game')

async function chooseBiome(user: ReturnType<typeof useUser>['user']) {
  await user.click(screen.getByTestId('Dropdown__button'))
  await user.click(await screen.findByText('🌲 Forests'))
}

describe('components/modals/go-foraging-modal/forage-biome', () => {
  it('should ask for a biome before foraging', async () => {
    const { user, fetchMock } = setup()
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/biomes'))

    await user.type(screen.getByLabelText('Roll result'), '17')
    await user.click(screen.getByRole('button', { name: 'Forage' }))

    expect(screen.getByText('Choose a biome to forage')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('should ask for a roll result before foraging', async () => {
    const { user } = setup()

    await chooseBiome(user)
    await user.click(screen.getByRole('button', { name: 'Forage' }))

    expect(screen.getByText('Enter your roll result')).toBeInTheDocument()
  })

  it('should forage with an entered roll and add the find', async () => {
    const { user, fetchMock, onForaged } = setup()

    await chooseBiome(user)
    await user.type(screen.getByLabelText('Roll result'), '17')
    await user.click(screen.getByRole('button', { name: 'Forage' }))

    expect(await screen.findByText('You found')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenLastCalledWith(
      '/api/characters/character-1/forage/biome',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ biomeId: 'forest', roll: 17 }),
      }),
    )
    expect(screen.getByText('Ash Sugar')).toBeInTheDocument()
    expect(screen.getByTestId('forage-biome__outcome')).toHaveTextContent(
      'Rolled 17 vs DC 13: added to your ingredients pouch.',
    )
    expect(onForaged).toHaveBeenCalledWith(found)
  })

  it('should say nothing was found when the roll is below every DC', async () => {
    const { user, onForaged } = setup({ dc: 10, roll: 9, success: false })

    await chooseBiome(user)
    await user.type(screen.getByLabelText('Roll result'), '9')
    await user.click(screen.getByRole('button', { name: 'Forage' }))

    expect(await screen.findByText('Nothing found')).toBeInTheDocument()
    expect(
      screen.getByText('You were unable to locate a magical plant'),
    ).toBeInTheDocument()
    expect(screen.getByTestId('forage-biome__outcome')).toHaveTextContent(
      'Rolled 9 vs DC 10: nothing was added.',
    )
    expect(onForaged).not.toHaveBeenCalled()
  })

  it('should fill the roll result from the dice', async () => {
    diceRollMock.mockResolvedValue({
      id: 'roll-1',
      at: 0,
      pools: [{ sides: 20, count: 1, rolls: [[16]], kept: [16] }],
      modifier: 0,
      total: 16,
    })
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Roll' }))

    await waitFor(() =>
      expect(screen.getByLabelText('Roll result')).toHaveValue(16),
    )
    expect(screen.getByText('1d20 (16)')).toBeInTheDocument()
  })

  it('should show the server error and stay on the form', async () => {
    const { user } = setup({ error: 'No ingredients grow in that biome' }, 404)

    await chooseBiome(user)
    await user.type(screen.getByLabelText('Roll result'), '17')
    await user.click(screen.getByRole('button', { name: 'Forage' }))

    expect(
      await screen.findByText('No ingredients grow in that biome'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Forage' })).toBeInTheDocument()
  })

  it('should start over with Forage again, and close with Done', async () => {
    const { user, onClose } = setup()

    await chooseBiome(user)
    await user.type(screen.getByLabelText('Roll result'), '17')
    await user.click(screen.getByRole('button', { name: 'Forage' }))
    await user.click(
      await screen.findByRole('button', { name: 'Forage again' }),
    )

    expect(screen.getByLabelText('Roll result')).not.toHaveValue()
    expect(screen.getByTestId('Dropdown__button')).toHaveTextContent('Forests')

    await user.click(screen.getByRole('button', { name: 'Forage' }))
    expect(screen.getByText('Enter your roll result')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onClose).toHaveBeenCalled()
  })

  describe('in Game mode', () => {
    it('should not take a typed roll result', async () => {
      const { user } = setupGame()
      const rollResult = screen.getByLabelText('Roll result')

      await user.type(rollResult, '17')

      expect(rollResult).toHaveAttribute('readonly')
      expect(rollResult).not.toHaveValue()
      expect(rollResult).toHaveAttribute(
        'placeholder',
        'Roll your Survival check above',
      )
    })

    it('should ask for the Survival check before foraging', async () => {
      const { user, fetchMock } = setupGame()

      await chooseBiome(user)
      await user.click(screen.getByRole('button', { name: 'Forage' }))

      expect(
        screen.getByText('Roll your Survival check above', { selector: 'p' }),
      ).toBeInTheDocument()
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('should forage with the Survival check’s roll', async () => {
      diceRollMock.mockResolvedValue({
        id: 'roll-1',
        at: 0,
        pools: [{ sides: 20, count: 1, rolls: [[17]], kept: [17] }],
        modifier: 0,
        total: 17,
      })
      const { user, fetchMock } = setupGame()

      await chooseBiome(user)
      await user.click(screen.getByRole('button', { name: 'Roll' }))
      await waitFor(() =>
        expect(screen.getByLabelText('Roll result')).toHaveValue(17),
      )
      await user.click(screen.getByRole('button', { name: 'Forage' }))

      expect(await screen.findByText('You found')).toBeInTheDocument()
      expect(fetchMock).toHaveBeenLastCalledWith(
        '/api/characters/character-1/forage/biome',
        expect.objectContaining({
          body: JSON.stringify({ biomeId: 'forest', roll: 17 }),
        }),
      )
    })
  })
})
