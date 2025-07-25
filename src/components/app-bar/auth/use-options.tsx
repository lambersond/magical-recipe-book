import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { IconButton, type GroupOption } from '@/components/common'
import { AddCharacterIcon, LogoutIcon } from '@/components/common/icons'
import { useAuth } from '@/hooks/use-auth'
import { useModals } from '@/hooks/use-modals'
import type { Character } from '@/types'

export function useAuthOptions() {
  const { openModal } = useModals()
  const { signOut } = useAuth()
  const router = useRouter()

  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch characters function
  const fetchCharacters = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/characters', {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error('Failed to fetch characters')
      }
      const charactersData = await res.json()
      setCharacters(charactersData)
    } catch (error) {
      console.error('Error fetching characters:', error)
      setCharacters([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle character creation
  const handleAddCharacter = useCallback(
    async (character: any) => {
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

        // Add the new character to the local state
        setCharacters(prev => [...prev, newCharacter])

        // Navigate to the new character
        router.push(`/characters/${newCharacter.id}`)
      } catch (error) {
        console.error('Error creating character:', error)
        throw error
      }
    },
    [router],
  )

  // Load characters on mount
  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters])

  // Memoize the options to prevent unnecessary re-renders
  const options: GroupOption[] = [
    {
      label: 'Characters',
      icon: (
        <IconButton
          Icon={AddCharacterIcon}
          color='transparent'
          size='sm'
          showBorder={false}
          onClick={() =>
            openModal('AddCharacterModal', {
              onSubmit: handleAddCharacter,
            })
          }
        />
      ),
      key: 'characters',
      showHeader: true,
      emptyText: isLoading ? 'Loading characters...' : 'No characters found',
      options: characters.map(character => ({
        label: character.name,
        onClick: () => router.push(`/characters/${character.id}`),
      })),
    },
    {
      label: 'Account',
      key: 'account',
      options: [
        {
          label: 'Logout',
          onClick: () => signOut(),
          icon: <LogoutIcon className='size-6' />,
          divider: true,
        },
      ],
    },
  ]

  return options
}
