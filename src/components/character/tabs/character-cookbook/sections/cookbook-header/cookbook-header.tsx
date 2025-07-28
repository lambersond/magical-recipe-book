import { useCharacterCookbookApi } from '@/components/character/hooks/use-character-cookbook'
import { Search } from '@/components/common'

export function CookbookHeader() {
  const { setSearchString } = useCharacterCookbookApi()
  return (
    <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
      <h2 className='text-2xl font-bold text-white'>Cookbook</h2>
      <div className='flex items-center space-x-3'>
        <Search
          onChange={value => setSearchString(value)}
          placeholder='Search recipes...'
        />
      </div>
    </div>
  )
}
