import { mockFetch, screen, useUser, waitFor, within } from '@test-utils'
import { CharacterCookbook } from './character-cookbook'
import { ModalProvider } from '@/components/modals/modal-provider'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'character-1' }),
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}))

const useCharacterMock = jest.fn()
const updateCharacterMock = jest.fn()
jest.mock('@/components/character/hooks/use-character', () => ({
  useCharacter: () => useCharacterMock(),
  useCharacterApi: () => updateCharacterMock,
}))

const recipe = (name: string, rarities: string[]) => ({
  id: name,
  name,
  description: '',
  difficulty: 10,
  mundaneIngredients: [],
  defaultMundaneIngredients: [],
  magicalIngredients: rarities.map((rarity, index) => ({
    ingredient: { id: `${name}-${index}`, name: `${name} ${index}`, rarity },
  })),
})

const recipeNames = () =>
  screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent)

describe('components/character/tabs/character-cookbook', () => {
  beforeEach(() => {
    useCharacterMock.mockReturnValue({
      id: 'character-1',
      ingredientsPouch: { commonIngredients: 0, magicalIngredients: [] },
      cookbook: {
        knownRecipes: [
          {
            ...recipe('Stew', ['common', 'uncommon']),
            mundaneIngredients: ['Sea Salt', 'Water'],
            defaultMundaneIngredients: ['Salt', 'Water'],
          },
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

  it("should rename a recipe's common ingredients for this cookbook", async () => {
    mockFetch({
      responseData: {
        id: 'Stew',
        mundaneIngredients: ['Sea Salt', 'Spring Water'],
        defaultMundaneIngredients: ['Salt', 'Water'],
      },
    })
    const { user } = useUser(<CharacterCookbook />, { wrapper: ModalProvider })

    expect(screen.getByText('Sea Salt')).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Edit common ingredients' }),
    )
    const dialog = await screen.findByTestId('modal')
    const second = within(dialog).getByTestId(
      'edit-common-ingredients-form__ingredient-1',
    )
    await user.clear(second)
    await user.type(second, 'Spring Water')
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))

    await waitFor(() => expect(updateCharacterMock).toHaveBeenCalled())
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/characters/character-1/cookbook/Stew',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({
          mundaneIngredients: ['Sea Salt', 'Spring Water'],
        }),
      }),
    )
    const updater = updateCharacterMock.mock.calls[0][0]
    const updated = updater(useCharacterMock())
    expect(updated.cookbook.knownRecipes[0].mundaneIngredients).toEqual([
      'Sea Salt',
      'Spring Water',
    ])
    expect(updated.cookbook.knownRecipes[1]).toEqual(
      useCharacterMock().cookbook.knownRecipes[1],
    )
  })
})
