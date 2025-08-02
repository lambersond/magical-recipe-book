import * as repository from './repository'

export async function deleteCookedDishByIdCharacterIdAndUserId(
  id: string,
  characterId: string,
  userId: string,
) {
  return repository.deleteByIdCharacterIdAndUserId(id, characterId, userId)
}
