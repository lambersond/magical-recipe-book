'use client'

import clsx from 'clsx'
import { Check, ListSortDescending } from 'lucide-react'
import { Menu, Popover, Tooltip, usePopover } from '@/components/common'
import type { RaritySortMenuProps, SortTriggerProps } from './types'
import type { RaritySort } from '@/types'

const OPTIONS: { value: RaritySort; label: string }[] = [
  { value: 'default', label: 'Default order' },
  { value: 'rarest', label: 'Rarest first' },
  { value: 'commonest', label: 'Most common first' },
]

export function RaritySortMenu({
  value,
  onChange,
}: Readonly<RaritySortMenuProps>) {
  return (
    <Popover
      asChild
      modal
      placement='bottom-end'
      content={<SortOptions value={value} onChange={onChange} />}
    >
      <SortTrigger isSorted={value !== 'default'} />
    </Popover>
  )
}

function SortOptions({ value, onChange }: Readonly<RaritySortMenuProps>) {
  const popover = usePopover()

  return (
    <Menu
      options={OPTIONS.map(option => ({
        label: option.label,
        icon: option.value === value ? <Check className='size-4' /> : undefined,
        onClick: () => {
          onChange(option.value)
          popover.setOpen(false)
        },
      }))}
    />
  )
}

// Receives the ref and handlers the popover's `asChild` trigger clones on
function SortTrigger({ isSorted, ref, ...rest }: Readonly<SortTriggerProps>) {
  return (
    <Tooltip title='Sort by rarity' placement='bottom' asChild>
      <button
        ref={ref}
        type='button'
        aria-label='Sort by rarity'
        className={clsx(
          'flex items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-text-primary/10',
          isSorted ? 'text-primary' : 'text-text-primary',
        )}
        {...rest}
      >
        <ListSortDescending className='size-6' />
      </button>
    </Tooltip>
  )
}
