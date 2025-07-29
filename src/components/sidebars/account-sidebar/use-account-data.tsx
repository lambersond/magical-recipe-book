import { useEffect, useState, useCallback } from 'react'
import { useSidebar } from '@/components/common'

export function useAccountData() {
  const { isOpen } = useSidebar()
  const [loadingState, setLoadingState] = useState<
    'not-loaded' | 'loading' | 'loaded'
  >('not-loaded')

  const [characters, setCharacters] = useState<any[]>([])

  const fetchCharacters = useCallback(async () => {
    try {
      setLoadingState('loading')
      const res = await fetch('/api/characters?details=lite', {
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
      setLoadingState('loaded')
    }
  }, [])

  useEffect(() => {
    if (loadingState === 'not-loaded' && isOpen) {
      setLoadingState('loading')
      fetchCharacters()
    } else if (loadingState === 'loaded' && !isOpen) {
      setLoadingState('not-loaded')
    }
  }, [isOpen, loadingState, fetchCharacters])

  return {
    characters,
  }
}
