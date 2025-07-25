import * as repository from './repository'
import type { LogForagingResults, NewCharacter } from '@/types'

export async function createCharacter(data: NewCharacter, accountId: string) {
  return repository.createCharacter(data, accountId)
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
  const updatedCharacter = await repository.updateCharacterForagingLogById(
    id,
    {
      commonIngredients: data.quantity,
      magicalIngredientId: data.isMagical
        ? data.magicalIngredientId
        : undefined,
    },
    userId,
  )

  return updatedCharacter
}
