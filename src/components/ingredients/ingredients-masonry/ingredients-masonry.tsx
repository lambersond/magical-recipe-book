import { useIngredients } from '../hooks/use-ingredients'
import { IngredientCard } from '@/components/cards/ingredient-card/ingredient-card'
import { Masonry } from '@/components/common'
import { getMasonryBreakpoints } from '@/utils/get-masonry-breakpoints'

export function IngredientsMasonry() {
  const ingredients = useIngredients()
  const breakpoints = getMasonryBreakpoints(ingredients.length)

  return (
    <Masonry breakpointCols={breakpoints}>
      {ingredients.map(ingredient => (
        <IngredientCard {...ingredient} key={ingredient.id} />
      ))}
    </Masonry>
  )
}
