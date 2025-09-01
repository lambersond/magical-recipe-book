import { useContext } from 'react'
import {
  IngredientsApiContext,
  IngredientsContext,
} from '../ingredients-provider'

export function useIngredients() {
  return useContext(IngredientsContext).ingredients
}

export function useIngredientsApi() {
  const ingredientsApi = useContext(IngredientsApiContext)
  return ingredientsApi
}

export function useIngredientsFilters() {
  const updateIngredients = useIngredientsApi()
  const ingredients = useContext(IngredientsContext).defaultIngredients

  const searchOnChange = (value: string) => {
    const searchString = value.toLowerCase()
    const filteredIngredients = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchString),
    )
    updateIngredients(filteredIngredients)
  }

  return {
    searchOnChange,
  }
}
