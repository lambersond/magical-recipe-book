import type { FullCharacter } from '@/types'

export type RecipeOutcomeProps = {
  type: 'success' | 'failure'
  flavorText: string
  ingredients: FullCharacter['cookbook']['knownRecipes'][number]['magicalIngredients']
}
