import { ArrowDownUp } from 'lucide-react'
import type { RaritySortSelectProps } from './types'
import type { RaritySort } from '@/types'

const OPTIONS: { value: RaritySort; label: string }[] = [
  { value: 'default', label: 'Default order' },
  { value: 'rarest', label: 'Rarest first' },
  { value: 'commonest', label: 'Most common first' },
]

export function RaritySortSelect({
  value,
  onChange,
}: Readonly<RaritySortSelectProps>) {
  return (
    <div className='relative flex items-center'>
      <ArrowDownUp className='absolute left-3 w-4 h-full text-text-secondary pointer-events-none' />
      <select
        aria-label='Sort by rarity'
        value={value}
        onChange={e => onChange(e.target.value as RaritySort)}
        className='py-2 pl-9 pr-3 bg-card/70 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer'
      >
        {OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
