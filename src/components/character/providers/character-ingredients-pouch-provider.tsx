import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'
import { noop } from 'lodash'
import { Rarity, RaritySort } from '@/types'

export const CharacterIngredientsPouchContext = createContext<{
  searchString: string
  filterRarity: Rarity | 'all'
  sortBy: RaritySort
  filterStatus: 'all' | 'available' | 'expired' | 'used'
}>({
  searchString: '',
  filterRarity: 'all',
  sortBy: 'default',
  filterStatus: 'all',
})

export const CharacterIngredientsPouchApiContext = createContext<{
  setSearchString: Dispatch<SetStateAction<string>>
  setFilterRarity: Dispatch<SetStateAction<Rarity | 'all'>>
  setSortBy: Dispatch<SetStateAction<RaritySort>>
  setFilterStatus: Dispatch<
    SetStateAction<'all' | 'available' | 'expired' | 'used'>
  >
}>({
  setSearchString: noop,
  setFilterRarity: noop,
  setSortBy: noop,
  setFilterStatus: noop,
})

export function CharacterIngredientsPouchProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchString, setSearchString] = useState<string>('')
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all')
  const [sortBy, setSortBy] = useState<RaritySort>('default')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'available' | 'expired' | 'used'
  >('all')

  const state = {
    searchString,
    filterRarity,
    sortBy,
    filterStatus,
  }

  const api = {
    setSearchString,
    setFilterRarity,
    setSortBy,
    setFilterStatus,
  }

  return (
    <CharacterIngredientsPouchApiContext.Provider value={api}>
      <CharacterIngredientsPouchContext.Provider value={state}>
        {children}
      </CharacterIngredientsPouchContext.Provider>
    </CharacterIngredientsPouchApiContext.Provider>
  )
}
