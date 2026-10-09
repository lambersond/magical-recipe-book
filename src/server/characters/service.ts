import { isEqual } from 'lodash'
import * as repository from './repository'
import { isSelf } from '@/lib/auth-handlers'
import type {
  CookedDishStatus,
  EditableCharacter,
  LogForagingResults,
} from '@/types'

type RecipeOverride = { recipeId: string; mundaneIngredients: string[] }

/**
 * A character's names for a recipe's common ingredients. An override saved
 * before the recipe's ingredient count changed (e.g. by a reseed) is stale,
 * so the recipe's own names are used instead.
 */
function effectiveCommonIngredients(defaults: string[], override?: string[]) {
  return override?.length === defaults.length ? override : defaults
}

/**
 * Applies the cookbook's common ingredient overrides to its known recipes,
 * keeping each recipe's own names as `defaultMundaneIngredients`.
 */
export function personalizeCookbook<
  R extends { id: string; mundaneIngredients: string[] },
  C extends { knownRecipes: R[]; recipeOverrides: RecipeOverride[] },
>({ knownRecipes, recipeOverrides, ...cookbook }: C) {
  const overrides = new Map(
    recipeOverrides.map(({ recipeId, mundaneIngredients }) => [
      recipeId,
      mundaneIngredients,
    ]),
  )
  return {
    ...cookbook,
    knownRecipes: knownRecipes.map(recipe => ({
      ...recipe,
      mundaneIngredients: effectiveCommonIngredients(
        recipe.mundaneIngredients,
        overrides.get(recipe.id),
      ),
      defaultMundaneIngredients: recipe.mundaneIngredients,
    })),
  }
}

function withPersonalizedCookbook<
  T extends { cookbook: Parameters<typeof personalizeCookbook>[0] | null },
>(character: T | null) {
  if (!character) return character
  return {
    ...character,
    cookbook: character.cookbook && personalizeCookbook(character.cookbook),
  }
}

function constrainEditableCharacter(data: EditableCharacter) {
  if (data.name.length > 100) {
    console.warn(
      `Character name truncated from ${data.name.length} to 100 characters`,
    )
  }

  if (data.description && data.description.length > 1000) {
    console.warn(
      `Character description truncated from ${data.description.length} to 1000 characters`,
    )
  }

  return {
    ...data,
    name: data.name.trim().slice(0, 100),
    description: data.description?.trim().slice(0, 1000),
    abilities: {
      ...data.abilities,
      proficiency: Math.min(Math.max(data.abilities.proficiency || 0, 0), 10),
      cookingAbility: Math.min(
        Math.max(data.abilities.cookingAbility || 0, -5),
        10,
      ),
    },
  }
}

export async function createCharacter(
  data: EditableCharacter,
  accountId: string,
) {
  const processedData = constrainEditableCharacter(data)
  return repository.createCharacter(processedData, accountId)
}

export async function getUserCharacterNamesByUserId(userId: string) {
  const characters = await repository.findCharactersByUserId(userId)
  return characters.map(character => character.name)
}

export async function updateCharacter(
  data: EditableCharacter,
  accountId: string,
  id: string,
) {
  const processedData = constrainEditableCharacter(data)
  return repository.updateCharacterById(processedData, accountId, id)
}

export async function findCharactersByUserId(userId: string) {
  return repository.findCharactersByUserId(userId)
}

export async function getCharacterById(id: string) {
  return withPersonalizedCookbook(await repository.findFullCharacterById(id))
}

export async function getCharacterByIdAndUserId(id: string, userId: string) {
  const data = await repository.findFullCharacterById(id)

  if (!data || !isSelf(userId, data.userId)) {
    return
  }
  return withPersonalizedCookbook(data)
}

export async function advanceDay(id: string, userId: string) {
  const character = await repository.findFullCharacterById(id)

  if (!character || character.userId !== userId) {
    return
  }

  character.currentDay++
  const updatedCharacter = await repository.advanceDayForCharacterById(
    id,
    { currentDay: character.currentDay },
    userId,
  )

  return updatedCharacter
}

export async function logForagingResults(
  id: string,
  data: LogForagingResults,
  userId: string,
) {
  const minQuantity = Math.max(0, data.quantity || 0)
  const quantity = Math.min(minQuantity, 7)
  const updatedCharacter = await repository.updateCharacterForagingLogById(
    id,
    {
      commonIngredients: quantity,
      magicalIngredientId: data.isMagical
        ? data.magicalIngredientId
        : undefined,
    },
    userId,
  )

  return updatedCharacter
}

export async function getUserCharactersLite(userId: string) {
  return repository.getUserCharactersLite(userId)
}

export async function deleteCharacterById(id: string, userId: string) {
  return repository.deleteCharacterById(id, userId)
}

export async function addRecipeToCharacterCookbook(
  characterId: string,
  recipeId: string,
  userId: string,
) {
  return withPersonalizedCookbook(
    await repository.addRecipeToCharacterCookbook(
      characterId,
      recipeId,
      userId,
    ),
  )
}

export type UpdateCommonIngredientsResult =
  | {
      ok: true
      recipe: {
        id: string
        mundaneIngredients: string[]
        defaultMundaneIngredients: string[]
      }
    }
  | { ok: false; status: 400 | 404; error: string }

/**
 * Renames a cookbook recipe's common ingredients for one character. Names
 * matching the recipe's own clear the override.
 */
export async function updateCookbookRecipeCommonIngredients(
  characterId: string,
  userId: string,
  recipeId: string,
  mundaneIngredients: string[],
): Promise<UpdateCommonIngredientsResult> {
  const cookbook = await repository.findCookbookWithKnownRecipe(
    characterId,
    userId,
    recipeId,
  )
  const defaults = cookbook?.knownRecipes[0]?.mundaneIngredients
  if (!cookbook || !defaults) {
    return {
      ok: false,
      status: 404,
      error: "Recipe not found in this character's cookbook",
    }
  }

  if (mundaneIngredients.length !== defaults.length) {
    return {
      ok: false,
      status: 400,
      error: `Expected ${defaults.length} common ingredients, got ${mundaneIngredients.length}`,
    }
  }

  await (isEqual(mundaneIngredients, defaults)
    ? repository.deleteCookbookRecipeOverride(cookbook.id, recipeId)
    : repository.upsertCookbookRecipeOverride(
        cookbook.id,
        recipeId,
        mundaneIngredients,
      ))

  return {
    ok: true,
    recipe: {
      id: recipeId,
      mundaneIngredients,
      defaultMundaneIngredients: defaults,
    },
  }
}

export function cookRecipe(
  id: string,
  userId: string,
  recipeId: string,
  status: CookedDishStatus,
  isConsumed: boolean = true,
) {
  return repository.createCookedDishForCharacter(
    id,
    userId,
    recipeId,
    status,
    isConsumed,
  )
}
