'use client'

import { MoreVertical, TentTree, Binoculars, BookPlus } from 'lucide-react'
import { useCharacterActions } from '../hooks/use-character-actions'
import { Menu, Popover, Tooltip } from '@/components/common'

export function CharacterActionsMenu() {
  const { options, ...actions } = useCharacterActions()

  const iconClasses =
    'size-10 rounded-full hover:bg-hover p-2.25 cursor-pointer text-text-primary hover:text-primary hidden sm:block'

  return (
    <div className='flex items-center justify-end gap-4'>
      <Tooltip title='Go Foraging' asChild>
        <Binoculars
          className={iconClasses}
          onClick={actions.forage.onClick as any}
        />
      </Tooltip>
      <Tooltip title='End Day' asChild>
        <TentTree
          className={iconClasses}
          onClick={actions.advanceDay.onClick as any}
        />
      </Tooltip>
      <Tooltip title='Learn Recipe' asChild>
        <BookPlus
          className={iconClasses}
          onClick={actions.learnRecipe.onClick as any}
        />
      </Tooltip>
      <Popover
        content={<Menu options={options} />}
        placement='bottom-end'
        asChild
      >
        <MoreVertical className='size-10 p-2 text-text-secondary hover:text-text-primary hover:bg-hover rounded-full cursor-pointer' />
      </Popover>
    </div>
  )
}
