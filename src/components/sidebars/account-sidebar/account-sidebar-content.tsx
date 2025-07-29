'use client'

import { LogOutIcon, SidebarCloseIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useAccountData } from './use-account-data'
import { CharacterCard, NewCharacterCard } from '@/components/cards'
import { SidebarItem } from '@/components/common'

export function AccountSidebarContent({ email }: { email: string }) {
  const { characters } = useAccountData()
  return (
    <div className='flex flex-col gap-4 p-2 pt-0'>
      <section className='flex items-start justify-between border-b border-border sticky top-0 bg-card z-10 pb-4'>
        <div className='flex flex-col'>
          <p className='text-2xl font-bold'>Account</p>
          <p className='text-lg italic text-text-secondary -mt-1'>{email}</p>
        </div>
        <SidebarItem>
          <SidebarCloseIcon className='size-10 p-2 transform rotate-180 hover:bg-black/20 rounded-full cursor-pointer' />
        </SidebarItem>
      </section>
      <section className='border-b border-border pb-4'>
        <p className='text-2xl font-bold mb-2 md:mb-4'>Characters</p>
        {characters.length > 0 && (
          <div className='flex flex-col gap-2 my-2'>
            {characters.map(character => (
              <SidebarItem key={character.id}>
                <CharacterCard
                  details='lite'
                  id={character.id}
                  name={character.name}
                  currentDay={character.currentDay}
                  description={character.description}
                  image={character.image}
                  recipes={character.cookbook?._count.knownRecipes}
                  commonIngredients={
                    character.ingredientsPouch?.commonIngredients
                  }
                  magicalIngredients={
                    character.ingredientsPouch?._count.magicalIngredients
                  }
                  updatedAt={character.updatedAt}
                />
              </SidebarItem>
            ))}
          </div>
        )}
        <SidebarItem>
          <NewCharacterCard variant='small' color='secondary' />
        </SidebarItem>
      </section>
      <section className='hidden border-b border-border pb-4'>
        <p>Account Settings</p>
      </section>
      <section className='p-2'>
        <SidebarItem>
          <button
            onClick={() => signOut({ redirectTo: '/' })}
            className='w-full flex gap-2 cursor-pointer'
          >
            <LogOutIcon className='text-error size-6 mb-2' />
            <p className='text-error font-bold'>Sign Out</p>
          </button>
        </SidebarItem>
      </section>
    </div>
  )
}
