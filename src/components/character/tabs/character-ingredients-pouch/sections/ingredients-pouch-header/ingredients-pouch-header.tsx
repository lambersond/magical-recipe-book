import { GoForagingButton } from '@/components/character/buttons/go-foraging-button'
import { useCharacterIngredientsPouchApi } from '@/components/character/hooks/use-character-ingredients-pouch'
import { Search } from '@/components/common'

export function IngredientsPouchHeader() {
  const { setSearchString } = useCharacterIngredientsPouchApi()
  return (
    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
      <h2 className='text-2xl font-bold text-white'>Ingredients Pouch</h2>
      <div className='flex items-center space-x-3'>
        <GoForagingButton className='sm:after:content-["Go_Foraging"] sm:after:ml-1' />
        <Search
          onChange={value => setSearchString(value)}
          placeholder='Search ingredients...'
        />
      </div>
    </div>
  )
}
