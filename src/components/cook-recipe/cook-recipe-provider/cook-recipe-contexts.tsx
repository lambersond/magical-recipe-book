import { createContext } from 'react'
import type {
  CookRecipeDataContextType,
  CookRecipeDispatchContextType,
} from './types'

export const CookRecipeDataContext = createContext<CookRecipeDataContextType>({
  recipe: undefined,
  ingredientsPouch: undefined,
  cookingState: 'selection',
  requiredIngredientsSelected: {},
  rollResults: 0,
  characterId: undefined,
  recipeId: undefined,
} as any)

export const CookRecipeDispatchContext =
  createContext<CookRecipeDispatchContextType>(undefined as any)
