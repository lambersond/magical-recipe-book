import { ToggleViewMode } from '../cookbook-recipes/components'
import { LearnRecipeButton } from '@/components/character/buttons/learn-recipe-button'
import { useCharacterCookbookApi } from '@/components/character/hooks/use-character-cookbook'
import { Search } from '@/components/common'

export function CookbookHeader() {
  const { setSearchString } = useCharacterCookbookApi()
  return (
    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
      <ToggleViewMode />
      <div className='flex items-center space-x-3'>
        <LearnRecipeButton className='sm:after:content-["Learn_Recipe"]' />
        <Search
          onChange={value => setSearchString(value)}
          placeholder='Search recipes...'
        />
      </div>
    </div>
  )
}
