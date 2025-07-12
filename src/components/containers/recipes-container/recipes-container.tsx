import { RecipeCard } from '@/components/cards'
import { Masonry } from '@/components/common'
import { recipeService } from '@/server/recipes'

export async function RecipesContainer() {
  const recipes = await recipeService.getAllRecipes()

  return (
    <Masonry>
      {recipes.map(recipe => (
        <RecipeCard {...recipe} key={recipe.id} />
      ))}
    </Masonry>
  )
}
