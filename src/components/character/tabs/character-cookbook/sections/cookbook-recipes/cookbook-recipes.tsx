'use client'

import { RecipeCard, RecipeListItem } from './views'
import { useCharacter } from '@/components/character/hooks/use-character'
import { useCharacterCookbook } from '@/components/character/hooks/use-character-cookbook'

export function CookbookRecipes() {
  const character = useCharacter()
  const { filter, matchesSearch, sort, viewMode } = useCharacterCookbook()
  const { cookbook } = character

  const ViewComponent = viewMode === 'card' ? RecipeCard : RecipeListItem

  const filteredRecipeList = cookbook.knownRecipes
    .filter(recipe => filter(recipe))
    .toSorted(sort)

  const emptyMessage = () => {
    if (cookbook.knownRecipes.length === 0) {
      return 'No recipes found in your cookbook.'
    }
    if (!cookbook.knownRecipes.some(recipe => matchesSearch(recipe))) {
      return 'No recipes match your search.'
    }
    return 'You don’t have the ingredients for any of these recipes. Turn on “Show recipes missing ingredients” to see them.'
  }

  if (filteredRecipeList.length === 0) {
    return (
      <div className='col-span-1 md:col-span-2 lg:col-span-3 text-center text-text-tertiary text-left'>
        {emptyMessage()}
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
