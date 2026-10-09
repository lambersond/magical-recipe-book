import { screen, useUser } from '@test-utils'
import { CharacterCookbook } from './character-cookbook'
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

const recipe = (name: string, rarities: string[]) => ({
  id: name,
  name,
  description: '',
  difficulty: 10,
  mundaneIngredients: [],
  magicalIngredients: rarities.map((rarity, index) => ({
    ingredient: { id: `${name}-${index}`, name: `${name} ${index}`, rarity },
  })),
})

const recipeNames = () =>
  screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent)

describe('components/character/tabs/character-cookbook', () => {
  beforeEach(() => {
    useCharacterMock.mockReturnValue({
      ingredientsPouch: { commonIngredients: 0, magicalIngredients: [] },
      cookbook: {
        knownRecipes: [
          recipe('Stew', ['common', 'uncommon']),
          recipe('Elixir', ['legendary']),
          recipe('Bread', []),
        ],
      },
    })
  })

  it('should sort known recipes by their rarest magical ingredient', async () => {
    const { user } = useUser(<CharacterCookbook />, { wrapper: ModalProvider })
    const sort = screen.getByLabelText('Sort by rarity')

    expect(recipeNames()).toEqual(['Stew', 'Elixir', 'Bread'])

    await user.selectOptions(sort, 'Rarest first')
    expect(recipeNames()).toEqual(['Elixir', 'Stew', 'Bread'])

    await user.selectOptions(sort, 'Most common first')
    expect(recipeNames()).toEqual(['Bread', 'Stew', 'Elixir'])
  })
})
