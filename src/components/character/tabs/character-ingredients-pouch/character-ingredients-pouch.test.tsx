import { screen, useUser } from '@test-utils'
import { CharacterIngredientsPouch } from './character-ingredients-pouch'
import { ModalProvider } from '@/components/modals/modal-provider'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'character-1' }),
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}))

const useCharacterMock = jest.fn()
jest.mock('@/components/character/hooks/use-character', () => ({
  useCharacter: () => useCharacterMock(),
  useCharacterApi: () => jest.fn(),
}))

const foraged = (name: string, rarity: string, foundOnDay: number) => ({
  id: name,
  foundOnDay,
  isExpired: false,
  isUsed: false,
  magicalIngredient: { name, rarity },
})

const NAMES = ['Glowcap', 'Phoenix Feather', 'Moonleaf']
const ingredientNames = () =>
  screen
    .getAllByText(new RegExp(`^(${NAMES.join('|')})$`))
    .map(el => el.textContent)

describe('components/character/tabs/character-ingredients-pouch', () => {
  beforeEach(() => {
    useCharacterMock.mockReturnValue({
      id: 'character-1',
      ingredientsPouch: {
        commonIngredients: 4,
        magicalIngredients: [
          foraged('Glowcap', 'uncommon', 1),
          foraged('Phoenix Feather', 'legendary', 2),
          foraged('Moonleaf', 'common', 3),
        ],
      },
    })
  })

  it('should sort magical ingredients by rarity', async () => {
    const { user } = useUser(<CharacterIngredientsPouch />, {
      wrapper: ModalProvider,
    })
    const sort = screen.getByLabelText('Sort by rarity')

    expect(ingredientNames()).toEqual([
      'Glowcap',
      'Phoenix Feather',
      'Moonleaf',
    ])

    await user.selectOptions(sort, 'Rarest first')
    expect(ingredientNames()).toEqual([
      'Phoenix Feather',
      'Glowcap',
      'Moonleaf',
    ])

    await user.selectOptions(sort, 'Most common first')
    expect(ingredientNames()).toEqual([
      'Moonleaf',
      'Glowcap',
      'Phoenix Feather',
    ])
  })
})
