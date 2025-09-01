'use client'

import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { noop } from 'lodash'
import type { Biome } from '@/types'

export const BiomesContext = createContext<{
  biomes: Biome[]
  defaultBiomes: Biome[]
}>({
  biomes: [],
  defaultBiomes: [],
})
export const BiomesApiContext =
  createContext<Dispatch<SetStateAction<Biome[]>>>(noop)

export function BiomesProvider({
  children,
  defaultBiomes,
}: Readonly<{
  children: React.ReactNode
  defaultBiomes: Biome[]
}>) {
  const [biomes, setBiomes] = useState<Biome[]>(defaultBiomes)

  const value = useMemo(
    () => ({
      defaultBiomes,
      biomes,
    }),
    [defaultBiomes, biomes],
  )

  return (
    <BiomesApiContext.Provider value={setBiomes}>
      <BiomesContext.Provider value={value}>{children}</BiomesContext.Provider>
    </BiomesApiContext.Provider>
  )
}
