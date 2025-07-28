'use client'

import { Delete, EditIcon, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCharacter, useCharacterApi } from '../hooks/use-character'
import { Menu, type Option, Popover } from '@/components/common'
import { useModals } from '@/hooks/use-modals'
import type { EditableCharacter, FullCharacter } from '@/types'

export function CharacterActionsMenu() {
  const { openModal } = useModals()
  const router = useRouter()
  const character = useCharacter()
  const setCharacter = useCharacterApi()

  const options: Option[] = [
    {
      label: 'Edit Character',
      icon: <EditIcon />,
      onClick: () => {
        openModal('EditCharacterModal', {
          character,
          onSubmit: async (updatedCharacter: EditableCharacter) => {
            try {
              const res = await fetch(`/api/characters/${character.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedCharacter),
              })
              if (!res.ok) {
                throw new Error('Failed to update character')
              }
              const updatedData = await res.json()
              setCharacter((prev: FullCharacter) => ({
                ...prev,
                ...updatedData,
              }))
            } catch (error) {
              console.error('Error updating character:', error)
            }
          },
        })
      },
    },
    {
      label: 'Delete Character',
      icon: <Delete />,
      color: 'danger',
      onClick: () => {
        openModal('ConfirmModal', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          message: `Do you really wanna delete "${character.name}"? This action cannot be undone.`,
          onConfirm: async () => {
            try {
              const res = await fetch(`/api/characters/${character.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              })
              if (!res.ok) {
                throw new Error('Failed to delete character')
              }
              router.push('/user')
            } catch (error) {
              console.error('Error deleting character:', error)
            }
          },
        })
      },
    },
  ]

  return (
    <Popover
      content={<Menu options={options} />}
      placement='bottom-end'
      asChild
    >
      <MoreVertical className='size-10 p-2 text-text-secondary hover:text-text-primary hover:bg-hover rounded-full cursor-pointer' />
    </Popover>
  )
}
