import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'
import { noop } from 'lodash'
import { Rarity } from '@/types'

export const CharacterCookbookContext = createContext<{
  searchString: string
  filterRarity: Rarity | 'all'
  filterStatus: 'all' | 'available' | 'expired' | 'used'
}>({
  searchString: '',
  filterRarity: 'all',
  filterStatus: 'all',
})

export const CharacterCookbookApiContext = createContext<{
  setSearchString: Dispatch<SetStateAction<string>>
  setFilterRarity: Dispatch<SetStateAction<Rarity | 'all'>>
  setFilterStatus: Dispatch<
    SetStateAction<'all' | 'available' | 'expired' | 'used'>
  >
}>({
  setSearchString: noop,
  setFilterRarity: noop,
  setFilterStatus: noop,
})

export function CharacterCookbookProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchString, setSearchString] = useState<string>('')
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'available' | 'expired' | 'used'
  >('all')

  const state = {
    searchString,
    filterRarity,
    filterStatus,
  }

  const api = {
    setSearchString,
    setFilterRarity,
    setFilterStatus,
  }

  return (
    <CharacterCookbookApiContext.Provider value={api}>
      <CharacterCookbookContext.Provider value={state}>
        {children}
      </CharacterCookbookContext.Provider>
    </CharacterCookbookApiContext.Provider>
  )
}
