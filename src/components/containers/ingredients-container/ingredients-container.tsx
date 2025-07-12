import { IngredientCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { ingredientsService } from '@/server/ingredients'

export async function IngredientsContainer() {
  const ingredients = await ingredientsService.getAllIngredients()

  return (
    <Masonry>
      {ingredients.map(ingredient => (
        <IngredientCard {...ingredient} key={ingredient.id} />
      ))}
    </Masonry>
  )
}
