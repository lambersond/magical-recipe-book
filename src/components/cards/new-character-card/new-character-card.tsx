'use client'

import { useRouter } from 'next/navigation'
import { NewCharacterCardProps } from './types'
import { newCharacterCardStyles } from './utils'
import { Card } from '@/components/common'
import { AddIcon } from '@/components/common/icons'
import { useModals } from '@/hooks/use-modals'

export function NewCharacterCard({
  color = 'primary',
  variant = 'large',
}: Readonly<NewCharacterCardProps>) {
  const { openModal } = useModals()
  const router = useRouter()
  const styles = newCharacterCardStyles({ color, variant })

  const handleClick = () => {
    openModal('AddCharacterModal', {
      onSubmit: async (character: any) => {
        try {
          const res = await fetch('/api/characters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(character),
          })
          if (!res.ok) {
            throw new Error('Failed to create character')
          }
          const newCharacter = await res.json()
          router.push(`/characters/${newCharacter.id}`)
        } catch (error) {
          console.error('Error creating character:', error)
          throw error
        }
      },
    })
  }

  return (
    <Card className={styles.containerClasses} onClick={handleClick}>
      <h2 className={styles.titleClasses}>Add New Character</h2>
      {variant === 'large' && (
        <p className='text-lg mb-4'>
          Start your adventure by creating a new character!
        </p>
      )}
      {variant === 'large' && (
        <div className='bg-primary text-white rounded-full size-28 flex items-center justify-center bg-gradient-to-br from-primary to-secondary'>
          <AddIcon className='size-12' />
        </div>
      )}
    </Card>
  )
}
