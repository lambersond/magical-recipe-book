import { CookbookRecipeCard } from '@/components/cards/cookbook-recipe-card'
import { useCharacter } from '@/components/character/hooks/use-character'
import { useCharacterCookbook } from '@/components/character/hooks/use-character-cookbook'

export function CookbookRecipes() {
  const character = useCharacter()
  const { filter } = useCharacterCookbook()
  const { cookbook } = character

  return (
    <>
      <div className='grid  gap-4'>
        {cookbook.knownRecipes
          .filter(recipe => filter(recipe))
          .map(recipe => (
            <CookbookRecipeCard key={recipe.id} {...recipe} />
          ))}
        {cookbook.knownRecipes.length === 0 && (
          <div className='col-span-1 md:col-span-2 lg:col-span-3 text-center text-text-tertiary text-left'>
            No Recipes found.
          </div>
        )}
      </div>
    </>
  )
}
