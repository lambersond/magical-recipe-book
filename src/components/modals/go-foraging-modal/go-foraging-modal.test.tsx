import { diceRollMock, mockManyFetch, screen, useUser } from '@test-utils'
import { GoForagingModal } from './go-foraging-modal'
import type { CharacterMode } from '@/types'

const mockCloseModal = jest.fn()

jest.mock('@/hooks/use-modals', () => ({
  useModals: jest.fn(() => ({ closeModal: mockCloseModal })),
}))

function setup(mode?: CharacterMode) {
  mockManyFetch([
    { responseData: [{ id: 'sugar', name: 'Ash Sugar' }] },
    { responseData: [] },
  ])
  const onSubmit = jest.fn()
  return {
    onSubmit,
    ...useUser(
      <GoForagingModal
        open
        characterId='character-1'
        mode={mode}
        onSubmit={onSubmit}
        onForaged={jest.fn()}
      />,
    ),
  }
}

const foragingType = () => screen.getByRole('checkbox')
const quantityButton = (quantity: number) =>
  screen.queryByRole('button', { name: String(quantity) })

describe('components/modals/go-foraging-modal', () => {
  it('should forage a biome by default for magical ingredients', () => {
    setup()

    expect(screen.getByRole('button', { name: 'Forage' })).toBeInTheDocument()
    expect(screen.getByText('Survival check')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Log Results' }),
    ).not.toBeInTheDocument()
  })

  it('should keep picking an ingredient as the other magical option', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Pick ingredient' }))

    expect(screen.getByText('Ingredient Foraged')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Log Results' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Survival check')).not.toBeInTheDocument()
  })

  it('should let the player choose how many common ingredients they found', async () => {
    const { user, onSubmit } = setup('companion')

    await user.click(foragingType())
    await user.click(quantityButton(4)!)
    await user.click(screen.getByRole('button', { name: 'Log Results' }))

    expect(onSubmit).toHaveBeenCalledWith({
      quantity: 4,
      isMagical: false,
      magicalIngredientId: undefined,
    })
  })

  describe('in Game mode', () => {
    it('should find magical ingredients only by foraging a biome', () => {
      setup('game')

      expect(
        screen.queryByRole('button', { name: 'Pick ingredient' }),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Forage a biome' }),
      ).not.toBeInTheDocument()
      expect(screen.getByText('Survival check')).toBeInTheDocument()
    })

    it('should take the common quantity only from the roll', async () => {
      diceRollMock.mockResolvedValue({ total: 5 })
      const { user, onSubmit } = setup('game')

      await user.click(foragingType())

      for (const quantity of [2, 3, 4, 5, 6, 7]) {
        expect(quantityButton(quantity)).not.toBeInTheDocument()
      }
      expect(
        screen.getByTestId('go-foraging-modal__quantity'),
      ).toHaveTextContent('Roll 1d6 + 1 for how many you found.')

      await user.click(screen.getByRole('button', { name: 'Roll' }))

      expect(diceRollMock).toHaveBeenCalledWith({
        pools: [{ sides: 6, count: 1 }],
        modifier: 1,
      })
      expect(
        await screen.findByText('You found 5 common ingredients.'),
      ).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Log Results' }))
      expect(onSubmit).toHaveBeenCalledWith({
        quantity: 5,
        isMagical: false,
        magicalIngredientId: undefined,
      })
    })
  })
})
