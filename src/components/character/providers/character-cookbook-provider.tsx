import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'
import { noop } from 'lodash'
import { Rarity } from '@/types'

export type CookbookRecipesViewMode = 'card' | 'list'
type filterStatus = 'all' | 'available' | 'expired' | 'used'

export const CharacterCookbookContext = createContext<{
  searchString: string
  filterRarity: Rarity | 'all'
  filterStatus: filterStatus
  viewMode: CookbookRecipesViewMode
}>({
  searchString: '',
  filterRarity: 'all',
  filterStatus: 'all',
  viewMode: 'card',
})

export const CharacterCookbookApiContext = createContext<{
  setSearchString: Dispatch<SetStateAction<string>>
  setViewMode: Dispatch<SetStateAction<CookbookRecipesViewMode>>
  setFilterRarity: Dispatch<SetStateAction<Rarity | 'all'>>
  setFilterStatus: Dispatch<SetStateAction<filterStatus>>
}>({
  setSearchString: noop,
  setFilterRarity: noop,
  setFilterStatus: noop,
  setViewMode: noop,
})

export function CharacterCookbookProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [viewMode, setViewMode] = useState<CookbookRecipesViewMode>('card')
  const [searchString, setSearchString] = useState<string>('')
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<filterStatus>('all')

  const state = {
    searchString,
    filterRarity,
    filterStatus,
    viewMode,
  }

  const api = {
    setSearchString,
    setFilterRarity,
    setFilterStatus,
    setViewMode,
  }

  return (
    <CharacterCookbookApiContext.Provider value={api}>
      <CharacterCookbookContext.Provider value={state}>
        {children}
      </CharacterCookbookContext.Provider>
    </CharacterCookbookApiContext.Provider>
  )
}
