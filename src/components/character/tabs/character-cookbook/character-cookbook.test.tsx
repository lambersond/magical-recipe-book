import {
  fireEvent,
  mockFetch,
  render,
  screen,
  useUser,
  waitFor,
  within,
} from '@test-utils'
import { CharacterCookbook } from './character-cookbook'
import { RecipeListItem } from './sections/cookbook-recipes/views'
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
  screen.queryAllByRole('heading', { level: 3 }).map(h => h.textContent)

async function chooseSort(
  user: ReturnType<typeof useUser>['user'],
  label: string,
) {
  await user.click(screen.getByRole('button', { name: 'Sort by rarity' }))
  await user.click(screen.getByRole('button', { name: label }))
}

const unit = (ingredientId: string, state = {}) => ({
  isExpired: false,
  isUsed: false,
  magicalIngredient: { id: ingredientId },
  ...state,
})

// Stew and Bread can be made. Elixir is a common ingredient short, and its
// Elixir 0 have expired or been used.
const stockedCharacter = () => ({
  id: 'character-1',
  ingredientsPouch: {
    commonIngredients: 2,
    magicalIngredients: [
      unit('Stew-0'),
      unit('Stew-0'),
      unit('Stew-0'),
      unit('Stew-0'),
      unit('Stew-1'),
      unit('Elixir-0', { isExpired: true }),
      unit('Elixir-0', { isUsed: true }),
    ],
  },
  cookbook: {
    knownRecipes: [
      {
        ...recipe('Stew', ['common', 'uncommon']),
        mundaneIngredients: ['Salt', 'Water'],
      },
      {
        ...recipe('Elixir', ['legendary']),
        mundaneIngredients: ['Salt', 'Water', 'Honey'],
      },
      recipe('Bread', []),
    ],
  },
})

const missingIngredientsToggle = () =>
  screen.getByRole('checkbox', { name: 'Show recipes missing ingredients' })

const warnings = () =>
  screen.queryAllByRole('button', { name: /^Missing ingredients for / })

const listItem = () =>
  screen.getByRole('heading', { level: 3 }).closest('section')!

const counts = (container: HTMLElement = document.body) =>
  within(container).queryAllByText(/^You have \d+$/)

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

    expect(recipeNames()).toEqual(['Stew', 'Elixir', 'Bread'])

    await chooseSort(user, 'Rarest first')
    expect(recipeNames()).toEqual(['Elixir', 'Stew', 'Bread'])

    await chooseSort(user, 'Most common first')
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

  describe('recipes missing ingredients', () => {
    beforeEach(() => {
      useCharacterMock.mockReturnValue(stockedCharacter())
    })

    it('should show every recipe, with a warning on those missing ingredients', () => {
      useUser(<CharacterCookbook />, { wrapper: ModalProvider })

      expect(missingIngredientsToggle()).toBeChecked()
      expect(recipeNames()).toEqual(['Stew', 'Elixir', 'Bread'])
      expect(warnings()).toHaveLength(1)
      const elixir = screen.getByRole('heading', { name: 'Elixir' })
      expect(
        within(elixir.parentElement!).getByRole('button', {
          name: 'Missing ingredients for Elixir',
        }),
      ).toBeInTheDocument()
    })

    it('should say which ingredients a recipe is missing', async () => {
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })

      await user.click(warnings()[0])

      expect(
        screen.getByText('Common ingredients: you have 2 of the 3 needed.'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Magical ingredients: you’re missing Elixir 0.'),
      ).toBeInTheDocument()
    })

    it('should name each missing magical ingredient, and only those', async () => {
      useCharacterMock.mockReturnValue({
        ...stockedCharacter(),
        ingredientsPouch: { commonIngredients: 5, magicalIngredients: [] },
      })
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })

      await user.click(warnings()[0])

      expect(
        screen.getByText(
          'Magical ingredients: you’re missing Stew 0 and Stew 1.',
        ),
      ).toBeInTheDocument()
      expect(screen.queryByText(/^Common ingredients:/)).not.toBeInTheDocument()
    })

    it('should disable Prepare and Cook while a recipe is missing ingredients', async () => {
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })
      const [stewPrepare, elixirPrepare, breadPrepare] = screen.getAllByRole(
        'button',
        { name: 'Prepare' },
      )
      const [stewCook, elixirCook, breadCook] = screen.getAllByRole('button', {
        name: 'Cook',
      })

      expect(elixirPrepare).toBeDisabled()
      expect(elixirCook).toBeDisabled()
      for (const button of [stewPrepare, stewCook, breadPrepare, breadCook]) {
        expect(button).toBeEnabled()
      }

      // Each window opens once first, so one that opens again shows at once
      for (const button of [stewPrepare, stewCook]) {
        await user.click(button)
        await user.click(await screen.findByTestId('modal__backdrop'))
      }
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()

      await user.click(elixirPrepare)
      await user.click(elixirCook)
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('should hide recipes missing ingredients while the toggle is off', async () => {
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })

      await user.click(missingIngredientsToggle())

      expect(missingIngredientsToggle()).not.toBeChecked()
      expect(recipeNames()).toEqual(['Stew', 'Bread'])
      expect(warnings()).toHaveLength(0)

      await user.click(missingIngredientsToggle())

      expect(recipeNames()).toEqual(['Stew', 'Elixir', 'Bread'])
    })

    it('should say when the toggle hides every recipe', async () => {
      const [stew, elixir] = stockedCharacter().cookbook.knownRecipes
      useCharacterMock.mockReturnValue({
        ...stockedCharacter(),
        ingredientsPouch: { commonIngredients: 0, magicalIngredients: [] },
        cookbook: { knownRecipes: [stew, elixir] },
      })
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })

      await user.click(missingIngredientsToggle())

      expect(recipeNames()).toEqual([])
      expect(
        screen.getByText(
          'You don’t have the ingredients for any of these recipes. Turn on “Show recipes missing ingredients” to see them.',
        ),
      ).toBeInTheDocument()
    })

    it('should say when the toggle hides every recipe the search matches', async () => {
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })

      await user.click(missingIngredientsToggle())
      await user.type(screen.getByPlaceholderText('Search recipes...'), 'eli')

      expect(
        await screen.findByText(
          /^You don’t have the ingredients for any of these recipes/,
        ),
      ).toBeInTheDocument()
    })

    it('should say when nothing matches the search', async () => {
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })

      await user.type(screen.getByPlaceholderText('Search recipes...'), 'pie')

      expect(
        await screen.findByText('No recipes match your search.'),
      ).toBeInTheDocument()
    })

    it('should say when the cookbook has no recipes', () => {
      useCharacterMock.mockReturnValue({
        ...stockedCharacter(),
        cookbook: { knownRecipes: [] },
      })

      useUser(<CharacterCookbook />, { wrapper: ModalProvider })

      expect(
        screen.getByText('No recipes found in your cookbook.'),
      ).toBeInTheDocument()
    })

    it('should say how many of a magical ingredient the character has', () => {
      useUser(<CharacterCookbook />, { wrapper: ModalProvider })

      // Four Stew 0, and nothing extra for the one Stew 1
      expect(counts()).toHaveLength(1)
      const stew0 = screen.getByText('Stew 0').closest('div')!.parentElement!
      expect(within(stew0).getByText('You have 4')).toBeInTheDocument()
    })

    it('should say how many the character has in the Prepare and Cook windows', async () => {
      const { user } = useUser(<CharacterCookbook />, {
        wrapper: ModalProvider,
      })
      const [stewPrepare] = screen.getAllByRole('button', { name: 'Prepare' })
      const [stewCook] = screen.getAllByRole('button', { name: 'Cook' })

      for (const button of [stewPrepare, stewCook]) {
        await user.click(button)
        const dialog = await screen.findByTestId('modal')

        expect(counts(dialog)).toHaveLength(1)
        expect(within(dialog).getByText('You have 4')).toBeInTheDocument()

        await user.click(screen.getByTestId('modal__backdrop'))
      }
    })
  })

  describe('as a list', () => {
    const [stew, elixir] = stockedCharacter().cookbook.knownRecipes as any[]

    beforeEach(() => {
      useCharacterMock.mockReturnValue(stockedCharacter())
    })

    it('should disable Prepare and Cook without toggling the item', () => {
      render(<RecipeListItem recipe={elixir} />, { wrapper: ModalProvider })
      const cook = screen.getByRole('button', { name: 'Cook' })

      expect(cook).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Prepare' })).toBeDisabled()

      fireEvent.click(cook)

      expect(listItem()).toHaveAttribute('data-state', 'false')
    })

    it('should open the warning without toggling the item', async () => {
      const { user } = useUser(<RecipeListItem recipe={elixir} />, {
        wrapper: ModalProvider,
      })

      await user.click(
        screen.getByRole('button', { name: 'Missing ingredients for Elixir' }),
      )
      // Focus lands on the dialog itself, so it carries the name and words
      const dialog = await screen.findByRole('dialog', {
        name: 'Missing ingredients for Elixir',
      })
      expect(dialog).toHaveAccessibleDescription(
        /Common ingredients: you have 2 of the 3 needed\./,
      )
      expect(dialog).toHaveFocus()
      const text = screen.getByText(
        'Common ingredients: you have 2 of the 3 needed.',
      )
      await user.click(text)

      expect(text).toBeInTheDocument()
      expect(listItem()).toHaveAttribute('data-state', 'false')
    })

    it('should say how many of a magical ingredient the character has', () => {
      render(<RecipeListItem recipe={stew} />, { wrapper: ModalProvider })

      expect(warnings()).toHaveLength(0)
      expect(screen.getByRole('button', { name: 'Cook' })).toBeEnabled()
      expect(counts()).toHaveLength(1)
      expect(screen.getByText('You have 4')).toBeInTheDocument()
    })
  })
})
