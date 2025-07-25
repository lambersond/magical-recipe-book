'use client'

import { CharacterProvider } from '../providers/character-provider'
import { CharacterWrapperProps } from './types'

export function CharacterWrapper<T extends object>({
  children,
  character,
}: Readonly<CharacterWrapperProps<T>>) {
  return (
    <CharacterProvider defaultCharacter={character}>
      {children}
    </CharacterProvider>
  )
}
