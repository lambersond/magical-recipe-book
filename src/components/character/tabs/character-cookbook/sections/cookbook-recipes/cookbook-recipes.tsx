'use client'

import { RecipeCard, RecipeListItem } from './views'
import { useCharacter } from '@/components/character/hooks/use-character'
import { useCharacterCookbook } from '@/components/character/hooks/use-character-cookbook'

export function CookbookRecipes() {
  const character = useCharacter()
  const { filter, viewMode } = useCharacterCookbook()
  const { cookbook } = character

  const ViewComponent = viewMode === 'card' ? RecipeCard : RecipeListItem

  const filteredRecipeList = cookbook.knownRecipes.filter(recipe =>
    filter(recipe),
  )

  if (filteredRecipeList.length === 0) {
    return (
      <div className='col-span-1 md:col-span-2 lg:col-span-3 text-center text-text-tertiary text-left'>
        No recipes found in your cookbook.
      </div>
    )
  }

  return (
    <div className='grid gap-2'>
      {filteredRecipeList.map(recipe => (
        <ViewComponent key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
