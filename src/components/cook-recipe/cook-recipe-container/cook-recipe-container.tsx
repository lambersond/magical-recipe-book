import { Cooking, Results, Selection } from '../cook-recipe-states'
import { useCookingState } from '../hooks/use-cook-recipe'

export function CookRecipeContainer() {
  const cookingState = useCookingState()

  if (cookingState === 'selection') {
    return <Selection />
  }

  if (cookingState === 'cooking') {
    return <Cooking />
  }

  if (cookingState === 'results') {
    return <Results />
  }

  return <p>Unknown State</p>
}
