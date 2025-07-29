import { noop } from 'lodash'
import { Binoculars, BookPlus, Delete, EditIcon, TentTree } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCharacter, useCharacterApi } from '../hooks/use-character'
import { useModals } from '@/hooks/use-modals'
import type { Option } from '@/components/common'
import type {
  EditableCharacter,
  FullCharacter,
  LearnRecipe,
  LogForagingResults,
} from '@/types'

export function useCharacterActions() {
  const { id } = useParams<{ id: string }>()
  const character = useCharacter()
  const updateCharacter = useCharacterApi()
  const { openModal } = useModals()
  const router = useRouter()

  const forage: Option = {
    label: 'Go Foraging',
    icon: <Binoculars className='size-5' />,
    className: 'sm:hidden',
    onClick: () => {
      openModal('GoForagingModal', {
        onSubmit: async ({
          quantity,
          isMagical,
          magicalIngredientId,
        }: LogForagingResults) => {
          const res = await fetch(`/api/characters/${id}/forage`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              quantity,
              isMagical,
              magicalIngredientId,
            }),
          })
          const data = await res.json()
          updateCharacter((prev: FullCharacter) => ({
            ...prev,
            ingredientsPouch: data.ingredientsPouch,
            foragingLog: data.foragingLog,
          }))
        },
      })
    },
  }

  const advanceDay: Option = {
    label: 'Advance Day',
    icon: <TentTree className='size-5' />,
    className: 'sm:hidden',
    onClick: async () => {
      const updatedChar = await fetch(`/api/characters/${id}/advance-day`, {
        method: 'PUT',
        credentials: 'include',
        body: '{}',
      })
      const { character, expiredItemsCount } = await updatedChar.json()
      updateCharacter((prev: FullCharacter) => ({
        ...prev,
        currentDay: character.currentDay,
        ingredientsPouch: character.ingredientsPouch,
        foragingLog: character.foragingLog,
      }))

      openModal('ConfirmModal', {
        title: 'Day Advanced',
        message: (
          <>
            You have advanced to day{' '}
            <b className='text-lg'>{character.currentDay}</b>. <br />
            <b className='text-lg'>{expiredItemsCount}</b> magical ingredient
            {expiredItemsCount === 1 ? '' : 's'} have expired.
          </>
        ),
        confirmButtonText: 'Acknowledged',
        onConfirm: noop,
        hideCancelButton: true,
      })
    },
  }

  const learnRecipe: Option = {
    label: 'Learn Recipe',
    icon: <BookPlus className='size-5' />,
    className: 'sm:hidden',
    onClick: async () => {
      openModal('AddCookbookRecipeModal', {
        onSubmit: async (recipe: LearnRecipe) => {
          const res = await fetch(`/api/characters/${id}/add-recipe`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(recipe),
          })
          const data = await res.json()
          updateCharacter((prev: FullCharacter) => ({
            ...prev,
            ...data,
          }))
        },
      })
    },
  }

  const characterOptions: Option[] = [
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
              updateCharacter((prev: FullCharacter) => ({
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

  return {
    forage,
    advanceDay,
    learnRecipe,
    options: [forage, advanceDay, learnRecipe, ...characterOptions],
  }
}
