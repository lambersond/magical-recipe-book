import { ToggleViewMode } from '../cookbook-recipes/components'
import { LearnRecipeButton } from '@/components/character/buttons/learn-recipe-button'
import {
  useCharacterCookbook,
  useCharacterCookbookApi,
} from '@/components/character/hooks/use-character-cookbook'
import { Search } from '@/components/common'
import { RaritySortMenu } from '@/components/rarity-sort-menu'

export function CookbookHeader() {
  const { setSearchString, setSortBy } = useCharacterCookbookApi()
  const { sortBy } = useCharacterCookbook()
  return (
    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
      <ToggleViewMode />
      <div className='flex flex-wrap items-center justify-center gap-3'>
        <LearnRecipeButton className='sm:after:content-["Learn_Recipe"]' />
        <Search
          onChange={value => setSearchString(value)}
          placeholder='Search recipes...'
        />
        <RaritySortMenu value={sortBy} onChange={setSortBy} />
      </div>
    </div>
  )
}
