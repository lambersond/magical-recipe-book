'use client'

import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { CharacterActionsMenu } from '../character-actions-menu'
import { useCharacter } from '../hooks/use-character'

export function CharacterHeader() {
  const { name, image, currentDay } = useCharacter()
  return (
    <div className='bg-card w-full border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-start justify-between py-6'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-4'>
              {!!image && (
                <Image
                  src={image}
                  alt={name}
                  className='size-16 rounded-full border-2 border-primary'
                  width={64}
                  height={64}
                />
              )}
              <div>
                <h1 className='text-3xl font-bold text-primary'>{name}</h1>
                <p className='text-text-secondary flex items-center'>
                  <Calendar className='size-4 mr-2' />
                  Day {currentDay}
                </p>
              </div>
            </div>
          </div>
          <CharacterActionsMenu />
        </div>
      </div>
    </div>
  )
}
