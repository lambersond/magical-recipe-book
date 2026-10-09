import { GoForagingButton } from '@/components/character/buttons/go-foraging-button'
import {
  useCharacterIngredientsPouch,
  useCharacterIngredientsPouchApi,
} from '@/components/character/hooks/use-character-ingredients-pouch'
import { Search } from '@/components/common'
import { RaritySortSelect } from '@/components/rarity-sort-select'

export function IngredientsPouchHeader() {
  const { setSearchString, setSortBy } = useCharacterIngredientsPouchApi()
  const { sortBy } = useCharacterIngredientsPouch()
  return (
    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
      <h2 className='text-2xl font-bold text-white'>Ingredients Pouch</h2>
      <div className='flex flex-wrap items-center justify-center gap-3'>
        <GoForagingButton className='sm:after:content-["Go_Foraging"] sm:after:ml-1' />
        <Search
          onChange={value => setSearchString(value)}
          placeholder='Search ingredients...'
        />
        <RaritySortSelect value={sortBy} onChange={setSortBy} />
      </div>
    </div>
  )
}
