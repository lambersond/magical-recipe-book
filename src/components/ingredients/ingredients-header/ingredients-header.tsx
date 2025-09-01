import { useIngredientsFilters } from '../hooks/use-ingredients'
import { Search } from '@/components/common'

export function IngredientsHeader() {
  const { searchOnChange } = useIngredientsFilters()

  return (
    <div className='flex items-center justify-between mb-4 w-full'>
      <h1 className='text-3xl font-bold tracking-tight text-text-primary'>
        Ingredients
      </h1>
      <Search onChange={searchOnChange} placeholder='Search ingredients...' />
    </div>
  )
}
