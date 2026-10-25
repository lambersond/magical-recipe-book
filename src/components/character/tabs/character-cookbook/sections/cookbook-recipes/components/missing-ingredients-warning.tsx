'use client'

import { type ReactNode, useId, useLayoutEffect } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Popover, usePopover } from '@/components/common'
import type { MissingIngredientsWarningProps } from './types'

const listFormat = new Intl.ListFormat('en', { type: 'conjunction' })

/**
 * The popover's words, named for the dialog it opens: focus lands on the
 * dialog itself, as nothing in it can take focus.
 */
function MissingIngredientsDetails({
  label,
  children,
}: Readonly<{ label: string; children: ReactNode }>) {
  const { setLabelId, setDescriptionId } = usePopover()
  const labelId = useId()
  const descriptionId = useId()

  useLayoutEffect(() => {
    setLabelId(labelId)
    setDescriptionId(descriptionId)
  }, [labelId, descriptionId, setLabelId, setDescriptionId])

  return (
    // React bubbles clicks out of the popover's portal to the list item,
    // which would toggle
    <div
      className='max-w-xs bg-paper rounded-lg border border-border-light shadow-md p-3 space-y-1 text-sm text-text-secondary'
      onClick={e => e.stopPropagation()}
    >
      <p id={labelId} className='sr-only'>
        {label}
      </p>
      <div id={descriptionId} className='space-y-1'>
        {children}
      </div>
    </div>
  )
}

export function MissingIngredientsWarning({
  availability,
  recipeName,
}: Readonly<MissingIngredientsWarningProps>) {
  if (availability.canMake) return

  const { have, needed } = availability.commonIngredients
  const missingNames = availability.missingMagicalIngredients.map(
    ({ name }) => name,
  )
  const label = recipeName
    ? `Missing ingredients for ${recipeName}`
    : 'Missing ingredients'

  return (
    <Popover
      asChild
      placement='bottom-start'
      content={
        <MissingIngredientsDetails label={label}>
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
        </MissingIngredientsDetails>
      }
    >
      <button
        type='button'
        aria-label={label}
        className='p-1 rounded-full text-warning hover:bg-warning/10 cursor-pointer'
      >
        <TriangleAlert className='size-5' />
      </button>
    </Popover>
  )
}
