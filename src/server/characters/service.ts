import * as repository from './repository'
import type {
  CookedDishStatus,
  EditableCharacter,
  LogForagingResults,
} from '@/types'

export async function createCharacter(
  data: EditableCharacter,
  accountId: string,
) {
  return repository.createCharacter(data, accountId)
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
  const processedData = {
    ...data,
    name: data.name.trim().slice(0, 100),
    description: data.description?.trim().slice(0, 1000),
  }

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

  return repository.updateCharacterById(processedData, accountId, id)
}

export async function findCharactersByUserId(userId: string) {
  return repository.findCharactersByUserId(userId)
}

export async function getCharacterById(id: string) {
  return repository.findFullCharacterById(id)
}

export async function getCharacterByIdAndUserId(id: string, userId: string) {
  const data = await repository.findFullCharacterById(id)

  if (!data || data.userId !== userId) {
    return
  }
  return data
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
  return repository.addRecipeToCharacterCookbook(characterId, recipeId, userId)
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
