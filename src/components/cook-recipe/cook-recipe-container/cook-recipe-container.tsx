import { Cooking, Prepare, Results, Selection } from '../cook-recipe-states'
import { useCookingState } from '../hooks/use-cook-recipe'

export function CookRecipeContainer() {
  const cookingState = useCookingState()

  if (cookingState === 'selection' || cookingState === 'prepareSelection') {
    return <Selection />
  }

  if (cookingState === 'prepare') {
    return <Prepare />
  }

  if (cookingState === 'cooking') {
    return <Cooking />
  }

  if (cookingState === 'results') {
    return <Results />
  }

  return <p>Unknown State</p>
}
