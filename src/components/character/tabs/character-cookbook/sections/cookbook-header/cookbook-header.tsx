import { ToggleViewMode } from '../cookbook-recipes/components'
import { LearnRecipeButton } from '@/components/character/buttons/learn-recipe-button'
import {
  useCharacterCookbook,
  useCharacterCookbookApi,
} from '@/components/character/hooks/use-character-cookbook'
import { Search, Switch } from '@/components/common'
import { RaritySortMenu } from '@/components/rarity-sort-menu'

export function CookbookHeader() {
  const { setSearchString, setSortBy, setShowMissingIngredients } =
    useCharacterCookbookApi()
  const { sortBy, showMissingIngredients } = useCharacterCookbook()
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
        <Switch
          name='show-missing-ingredients'
          label='Show recipes missing ingredients'
          labelSize='sm'
          checked={showMissingIngredients}
          onChange={e => setShowMissingIngredients(e.target.checked)}
        />
      </div>
    </div>
  )
}
