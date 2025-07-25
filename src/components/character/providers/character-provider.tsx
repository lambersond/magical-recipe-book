import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { noop } from 'lodash'

export const CharacterContext = createContext<any>({})
export const CharacterApiContext =
  createContext<Dispatch<SetStateAction<any>>>(noop)

export function CharacterProvider<T extends object>({
  children,
  defaultCharacter,
}: {
  children: React.ReactNode
  defaultCharacter: T
}) {
  const [character, setCharacter] = useState<T>(defaultCharacter)

  return (
    <CharacterApiContext.Provider value={setCharacter}>
      <CharacterContext.Provider value={character}>
        {children}
      </CharacterContext.Provider>
    </CharacterApiContext.Provider>
  )
}
