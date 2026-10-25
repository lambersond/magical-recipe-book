'use client'

import { TriangleAlert } from 'lucide-react'
import { Popover } from '@/components/common'
import type { MissingIngredientsWarningProps } from './types'

const listFormat = new Intl.ListFormat('en', { type: 'conjunction' })

export function MissingIngredientsWarning({
  availability,
}: Readonly<MissingIngredientsWarningProps>) {
  if (availability.canMake) return

  const { have, needed } = availability.commonIngredients
  const missingNames = availability.missingMagicalIngredients.map(
    ({ name }) => name,
  )

  return (
    <Popover
      asChild
      placement='bottom-start'
      content={
        // React bubbles clicks out of the popover's portal to the list item,
        // which would toggle
        <div
          className='max-w-xs bg-paper rounded-lg border border-border-light shadow-md p-3 space-y-1 text-sm text-text-secondary'
          onClick={e => e.stopPropagation()}
        >
          {!availability.hasCommonIngredients && (
            <p>
              Common ingredients: you have {have} of the {needed} needed.
            </p>
          )}
          {missingNames.length > 0 && (
            <p>
              Magical ingredients: you’re missing{' '}
              {listFormat.format(missingNames)}.
            </p>
          )}
        </div>
      }
    >
      <button
        type='button'
        aria-label='Missing ingredients'
        className='p-1 rounded-full text-warning hover:bg-warning/10 cursor-pointer'
      >
        <TriangleAlert className='size-5' />
      </button>
    </Popover>
  )
}
