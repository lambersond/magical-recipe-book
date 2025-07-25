import { use } from 'react'
import {
  CharacterApiContext,
  CharacterContext,
} from '../providers/character-provider'
import type { FullCharacter } from '@/types'

export function useCharacter<T extends FullCharacter>() {
  return use<T>(CharacterContext)
}

export function useCharacterApi() {
  return use(CharacterApiContext)
}
