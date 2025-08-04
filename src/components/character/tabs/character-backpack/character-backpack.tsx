'use client'

import { useCharacter, useCharacterApi } from '../../hooks/use-character'
import { CookedDishCard } from '@/components/cards'
import type { FullCharacter } from '@/types'

const handleConsumeCookedDish = (id: string) => {
  console.warn('TODO', id)
}

export function CharacterBackpack() {
  const character = useCharacter()
  const updateCharacter = useCharacterApi()

  const handleDiscardCookedDish = async (id: string) => {
    const response = await fetch(
      `/api/characters/${character.id}/cooked-dish/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      console.error('Failed to discard cooked dish:', response.statusText)
      return
    }
    const data = await response.json()

    updateCharacter((prev: FullCharacter) => ({
      ...prev,
      backpack: {
        ...prev.backpack,
        cookedDishes: prev.backpack?.cookedDishes.filter(
          dish => dish.id !== data.id,
        ),
      },
    }))
  }
  const cookedDishes = character.backpack?.cookedDishes || []

  return (
    <div className='py-4'>
      <span className='mb-4 flex items-center gap-2 justify-center sm:justify-start'>
        <h2 className='text-2xl font-semibold'>Backpack</h2>
      </span>
      {cookedDishes.length === 0 && (
        <p className='text-text-secondary'>Your backpack is empty.</p>
      )}
      <div className='flex flex-col gap-2'>
        {cookedDishes.map(cookedDish => (
          <CookedDishCard
            key={cookedDish.id}
            {...cookedDish}
            currentDay={character.currentDay}
            onConsume={handleConsumeCookedDish}
            onDiscard={handleDiscardCookedDish}
          />
        ))}
      </div>
    </div>
  )
}
