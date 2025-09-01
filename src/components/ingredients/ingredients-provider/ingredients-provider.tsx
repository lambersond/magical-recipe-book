'use client'

import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { noop } from 'lodash'
import type { Ingredient } from '@/types'

export const IngredientsContext = createContext<{
  ingredients: Ingredient[]
  defaultIngredients: Ingredient[]
}>({
  ingredients: [],
  defaultIngredients: [],
})
export const IngredientsApiContext =
  createContext<Dispatch<SetStateAction<Ingredient[]>>>(noop)

export function IngredientsProvider({
  children,
  defaultIngredients,
}: Readonly<{
  children: React.ReactNode
  defaultIngredients: Ingredient[]
}>) {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(defaultIngredients)

  const value = useMemo(
    () => ({
      defaultIngredients,
      ingredients,
    }),
    [defaultIngredients, ingredients],
  )

  return (
    <IngredientsApiContext.Provider value={setIngredients}>
      <IngredientsContext.Provider value={value}>
        {children}
      </IngredientsContext.Provider>
    </IngredientsApiContext.Provider>
  )
}
