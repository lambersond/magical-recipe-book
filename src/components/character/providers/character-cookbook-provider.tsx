import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'
import { noop } from 'lodash'
import { Rarity, RaritySort } from '@/types'

export type CookbookRecipesViewMode = 'card' | 'list'
type filterStatus = 'all' | 'available' | 'expired' | 'used'

export const CharacterCookbookContext = createContext<{
  searchString: string
  filterRarity: Rarity | 'all'
  sortBy: RaritySort
  filterStatus: filterStatus
  viewMode: CookbookRecipesViewMode
  /** Whether recipes the pouch lacks ingredients for are listed */
  showMissingIngredients: boolean
}>({
  searchString: '',
  filterRarity: 'all',
  sortBy: 'default',
  filterStatus: 'all',
  viewMode: 'card',
  showMissingIngredients: true,
})

export const CharacterCookbookApiContext = createContext<{
  setSearchString: Dispatch<SetStateAction<string>>
  setViewMode: Dispatch<SetStateAction<CookbookRecipesViewMode>>
  setFilterRarity: Dispatch<SetStateAction<Rarity | 'all'>>
  setSortBy: Dispatch<SetStateAction<RaritySort>>
  setFilterStatus: Dispatch<SetStateAction<filterStatus>>
  setShowMissingIngredients: Dispatch<SetStateAction<boolean>>
}>({
  setSearchString: noop,
  setFilterRarity: noop,
  setSortBy: noop,
  setFilterStatus: noop,
  setViewMode: noop,
  setShowMissingIngredients: noop,
})

export function CharacterCookbookProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [viewMode, setViewMode] = useState<CookbookRecipesViewMode>('card')
  const [searchString, setSearchString] = useState<string>('')
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all')
  const [sortBy, setSortBy] = useState<RaritySort>('default')
  const [filterStatus, setFilterStatus] = useState<filterStatus>('all')
  const [showMissingIngredients, setShowMissingIngredients] = useState(true)

  const state = {
    searchString,
    filterRarity,
    sortBy,
    filterStatus,
    viewMode,
    showMissingIngredients,
  }

  const api = {
    setSearchString,
    setFilterRarity,
    setSortBy,
    setFilterStatus,
    setViewMode,
    setShowMissingIngredients,
  }

  return (
    <CharacterCookbookApiContext.Provider value={api}>
      <CharacterCookbookContext.Provider value={state}>
        {children}
      </CharacterCookbookContext.Provider>
    </CharacterCookbookApiContext.Provider>
  )
}
