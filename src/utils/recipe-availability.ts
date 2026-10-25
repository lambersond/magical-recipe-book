import type { MagicalIngredient } from '@/types'

type Ingredient = Pick<MagicalIngredient, 'id' | 'name'>

type RecipeNeeds = {
  mundaneIngredients: ReadonlyArray<string>
  magicalIngredients: ReadonlyArray<{ ingredient: Ingredient }>
}

type Pouch = {
  commonIngredients: number
  magicalIngredients: ReadonlyArray<{
    isExpired?: boolean
    isUsed?: boolean
    magicalIngredient?: Pick<MagicalIngredient, 'id'> | null
  }>
}

export type RecipeAvailability = {
  /** Whether the pouch holds everything the recipe needs */
  canMake: boolean
  hasCommonIngredients: boolean
  commonIngredients: { have: number; needed: number }
  /** Units in the pouch of each of the recipe's magical ingredients, by id */
  magicalIngredientCounts: Record<string, number>
  /** The recipe's magical ingredients the pouch has none of */
  missingMagicalIngredients: Ingredient[]
}

/**
 * How many units of a magical ingredient the pouch holds that can still go
 * into a dish: those that aren't used or expired.
 */
export function countAvailableMagicalIngredient(
  ingredientsPouch: Pick<Pouch, 'magicalIngredients'>,
  ingredientId: string,
) {
  return ingredientsPouch.magicalIngredients.filter(
    ({ isExpired, isUsed, magicalIngredient }) =>
      !isExpired && !isUsed && magicalIngredient?.id === ingredientId,
  ).length
}

/**
 * Whether the pouch holds what a recipe needs: at least as many common
 * ingredients as the recipe lists, and a unit of each of its magical
 * ingredients. The cookbook and the Cook and Prepare windows both decide
 * with this, so they always agree.
 */
export function getRecipeAvailability(
  recipe: RecipeNeeds,
  ingredientsPouch: Pouch,
): RecipeAvailability {
  const commonIngredients = {
    have: ingredientsPouch.commonIngredients,
    needed: recipe.mundaneIngredients.length,
  }
  const hasCommonIngredients =
    commonIngredients.have >= commonIngredients.needed

  const magicalIngredientCounts: Record<string, number> = {}
  for (const { ingredient } of recipe.magicalIngredients) {
    magicalIngredientCounts[ingredient.id] = countAvailableMagicalIngredient(
      ingredientsPouch,
      ingredient.id,
    )
  }
  const missingMagicalIngredients = recipe.magicalIngredients
    .map(({ ingredient }) => ({ id: ingredient.id, name: ingredient.name }))
    .filter(({ id }) => magicalIngredientCounts[id] === 0)

  return {
    canMake: hasCommonIngredients && missingMagicalIngredients.length === 0,
    hasCommonIngredients,
    commonIngredients,
    magicalIngredientCounts,
    missingMagicalIngredients,
  }
}
