import type { RaritySort } from '@/types'
import type { ButtonHTMLAttributes, Ref } from 'react'

export type RaritySortMenuProps = {
  value: RaritySort
  onChange: (value: RaritySort) => void
}

export type SortTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSorted: boolean
  ref?: Ref<HTMLButtonElement>
}
