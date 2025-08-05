import * as repository from './repository'
import type { CookedDishStatus } from '@/types'

export async function deleteCookedDishByIdCharacterIdAndUserId(
  id: string,
  characterId: string,
  userId: string,
) {
  return repository.deleteByIdCharacterIdAndUserId(id, characterId, userId)
}

export async function updateCookedDishByIdCharacterIdAndUserId(data: {
  cookedDishId: string
  characterId: string
  userId: string
  data: {
    status: CookedDishStatus
  }
}) {
  return repository.updateByIdCharacterIdAndUserId(data)
}
