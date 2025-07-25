import { useCallback } from 'react'
import { debounce } from 'lodash'
import { Search as SearchIcon } from 'lucide-react'

export function Search({
  onChange,
  placeholder = 'Search...',
}: {
  onChange: (value: string) => void
  placeholder?: string
}) {
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value)
    }, 300),
    [onChange],
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    debouncedOnChange(value)
  }
  return (
    <div className='relative flex items-center'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={handleChange}
        className='relative z-0 w-64 px-4 py-2 bg-card/70 border border-border rounded-lg text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10'
      />
      <SearchIcon className='absolute right-3 top-0 w-4 h-full text-text-secondary' />
    </div>
  )
}
