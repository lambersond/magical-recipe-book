import { screen, useUser, within } from '@test-utils'
import { CookRecipe, PrepareRecipe } from '.'
import type { IngredientsPouch, Rarity, Recipe } from '@/types'

const ingredient = (name: string, rarity: Rarity) => ({
  id: name,
  name,
  rarity,
  description: '',
  boon: '',
  bane: '',
})

const recipe = {
  id: 'stew',
  name: 'Stew',
  description: '',
  difficulty: 10,
  boonText: '',
  baneText: '',
  mundaneIngredients: ['Salt', 'Water'],
  magicalIngredients: [
    { ingredient: ingredient('Ember Root', 'common') },
    { ingredient: ingredient('Frost Lily', 'rare') },
  ],
} as unknown as Recipe

const unit = (ingredientId: string, state = {}) => ({
  isExpired: false,
  isUsed: false,
  magicalIngredient: { id: ingredientId },
  ...state,
})

const pouch = (
  commonIngredients: number,
  magicalIngredients: ReturnType<typeof unit>[],
) =>
  ({
    id: 'pouch-1',
    characterId: 'character-1',
    commonIngredients,
    magicalIngredients,
  }) as unknown as IngredientsPouch

// An ingredient's card in the picker
const picker = (name: string) =>
  screen.getByText(name).parentElement!.parentElement!

const selectButton = (name: string) =>
  within(picker(name)).getByRole('button', { name: 'Select Ingredient' })

const counts = () => screen.queryAllByText(/^You have \d+$/)

describe('components/cook-recipe', () => {
  it('should say how many of an ingredient the character has, when it’s more than one', () => {
    useUser(
      <CookRecipe
        recipe={recipe}
        ingredientsPouch={pouch(2, [
          unit('Ember Root'),
          unit('Ember Root'),
          unit('Ember Root'),
          unit('Frost Lily'),
        ])}
        onCook={jest.fn()}
      />,
    )

    expect(counts()).toHaveLength(1)
    expect(within(picker('Ember Root')).getByText('You have 3')).toBeVisible()
  })

  it('should not count expired or used ingredients', () => {
    useUser(
      <CookRecipe
        recipe={recipe}
        ingredientsPouch={pouch(2, [
          unit('Ember Root', { isExpired: true }),
          unit('Ember Root', { isUsed: true }),
          unit('Ember Root'),
          unit('Frost Lily', { isExpired: true }),
          unit('Frost Lily', { isUsed: true }),
        ])}
        onCook={jest.fn()}
      />,
    )

    expect(counts()).toHaveLength(0)
    expect(selectButton('Ember Root')).toBeEnabled()
    expect(selectButton('Frost Lily')).toBeDisabled()
  })

  it('should cook once every magical ingredient is selected', async () => {
    const { user } = useUser(
      <CookRecipe
        recipe={recipe}
        ingredientsPouch={pouch(2, [unit('Ember Root'), unit('Frost Lily')])}
        onCook={jest.fn()}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Select All Magical Ingredients' }),
    ).toBeDisabled()

    await user.click(selectButton('Ember Root'))
    await user.click(selectButton('Frost Lily'))

    expect(screen.getByRole('button', { name: 'Cook Recipe' })).toBeEnabled()
  })

  it('should not cook while common ingredients are short', async () => {
    const { user } = useUser(
      <CookRecipe
        recipe={recipe}
        ingredientsPouch={pouch(1, [unit('Ember Root'), unit('Frost Lily')])}
        onCook={jest.fn()}
      />,
    )

    await user.click(selectButton('Ember Root'))
    await user.click(selectButton('Frost Lily'))

    expect(
      screen.getByRole('button', { name: 'Select All Magical Ingredients' }),
    ).toBeDisabled()
  })

  it('should say how many the character has when preparing', async () => {
    const { user } = useUser(
      <PrepareRecipe
        recipe={recipe}
        ingredientsPouch={pouch(2, [
          unit('Ember Root'),
          unit('Frost Lily'),
          unit('Frost Lily'),
        ])}
        onPrepare={jest.fn()}
      />,
    )

    expect(counts()).toHaveLength(1)
    expect(within(picker('Frost Lily')).getByText('You have 2')).toBeVisible()

    await user.click(selectButton('Ember Root'))
    await user.click(selectButton('Frost Lily'))

    expect(screen.getByRole('button', { name: 'Prepare Recipe' })).toBeEnabled()
  })
})
