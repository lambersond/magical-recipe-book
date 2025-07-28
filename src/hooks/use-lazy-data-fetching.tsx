import { useState, useEffect, useCallback } from 'react'

type LoadingState = 'not-loaded' | 'loading' | 'loaded'

interface UseLazyDataOptions<T, R> {
  url: string
  enabled: boolean
  transform?: (data: T[]) => R[]
}

export function useLazyDataFetching<T = any, R = T>({
  url,
  enabled,
  transform,
}: UseLazyDataOptions<T, R>) {
  const [data, setData] = useState<R[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>('not-loaded')

  const fetchData = useCallback(async () => {
    try {
      setLoadingState('loading')
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }
      const rawData = await response.json()
      const transformedData = transform ? transform(rawData) : rawData

      setData(transformedData)
    } catch (error) {
      console.error('Error fetching:', error)
      setData([])
    } finally {
      setLoadingState('loaded')
    }
  }, [])

  useEffect(() => {
    if (loadingState === 'not-loaded' && enabled) {
      setLoadingState('loading')
      fetchData()
    } else if (loadingState === 'loaded' && !enabled) {
      setLoadingState('not-loaded')
    }
  }, [enabled, loadingState, fetchData])

  return data
}
