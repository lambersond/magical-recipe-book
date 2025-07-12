import { IngredientCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { Ingredient } from '@/types'
import { extractHeaders } from '@/utils/extract-headers'

const getIngredients = async (): Promise<Ingredient[]> => {
  const { api } = await extractHeaders()
  const res = await fetch(`${api}/ingredients`)
  const data = await res.json()
  return data || []
}

export async function IngredientsContainer() {
  const ingredients = await getIngredients()

  return (
    <Masonry>
      {ingredients.map(ingredient => (
        <IngredientCard {...ingredient} key={ingredient.id} />
      ))}
    </Masonry>
  )
}
