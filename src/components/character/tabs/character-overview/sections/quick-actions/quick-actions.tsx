import { noop } from 'lodash'
import { TentTree, Binoculars } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useCharacterApi } from '@/components/character/hooks/use-character'
import { Card } from '@/components/common'
import { useModals } from '@/hooks/use-modals'
import type { FullCharacter, LogForagingResults } from '@/types'

export function QuickActions() {
  const { id } = useParams<{ id: string }>()
  const updateCharacter = useCharacterApi()
  const { openModal } = useModals()

  const quickActions = [
    {
      label: 'Go Foraging',
      icon: <Binoculars className='size-5' />,
      action: async () => {
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
    },
    // {
    //   label: 'Cook Meal',
    //   icon: <CookingPot className='size-5' />,
    //   action: () => console.warn('Bake Bread'),
    // },
    {
      label: 'Advance Day',
      icon: <TentTree className='size-5' />,
      action: async () => {
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
    },
    // {
    //   label: 'Learn Recipe',
    //   icon: <BookPlus className='size-5' />,
    //   action: () => console.warn('Learn Recipe'),
    // },
  ]

  return (
    <Card className='lg:col-span-2 space-y-6 border border-border'>
      <h2 className='text-xl font-semibold mb-4 text-white'>Quick Actions</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className='cursor-pointer flex gap-4 items-center justify-center p-8 rounded-lg bg-success/80 hover:bg-primary hover:text-black transition-colors duration-400 text-lg'
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </Card>
  )
}
