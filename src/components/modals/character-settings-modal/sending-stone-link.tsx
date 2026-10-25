'use client'

import { useState } from 'react'
import { LinkSendingStoneForm } from '@/components/forms'
import { secondaryButton } from '@/utils/styles'
import type { SendingStoneLinkProps } from './types'

/** The character's link to Sending Stone, saved as soon as it's changed. */
export function SendingStoneLink({
  linkedAt,
  onLink,
  onUnlink,
}: Readonly<SendingStoneLinkProps>) {
  const [isChanging, setIsChanging] = useState(false)
  const [error, setError] = useState('')

  const run = async (action: () => Promise<void>) => {
    setError('')
    try {
      await action()
      setIsChanging(false)
    } catch (error_) {
      setError(
        error_ instanceof Error ? error_.message : 'Could not save the link',
      )
    }
  }

  return (
    <div className='flex flex-col gap-2 rounded-lg border border-border p-3'>
      {!!linkedAt && (
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <p className='text-sm text-text-primary'>
            Linked on {new Date(linkedAt).toLocaleDateString()}.
          </p>
          <div className='flex gap-2'>
            {!isChanging && (
              <button
                type='button'
                className={secondaryButton}
                onClick={() => setIsChanging(true)}
              >
                Change code
              </button>
            )}
            <button
              type='button'
              className={secondaryButton}
              onClick={() => run(onUnlink)}
            >
              Unlink
            </button>
          </div>
        </div>
      )}
      {(!linkedAt || isChanging) && (
        <>
          <p className='text-text-secondary text-sm'>
            Paste the link code Sending Stone gives you for this character.
            Dishes you send then reach your game, where your Gamemaster chooses
            who ate them.
          </p>
          <LinkSendingStoneForm onSubmit={token => run(() => onLink(token))} />
        </>
      )}
      {error && <p className='text-danger text-sm'>{error}</p>}
    </div>
  )
}
