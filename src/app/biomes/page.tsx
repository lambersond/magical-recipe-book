import { Suspense } from 'react'
import { BiomesContainer } from '@/components/containers/biomes-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default function BiomesPage() {
  return (
    <main className={pageMain}>
      <h1 className='text-3xl font-bold mb-4 mr-auto'>Biomes</h1>
      <Suspense
        fallback={<MagicalBookLoader loadingText='Loading biomes list...' />}
      >
        <BiomesContainer />
      </Suspense>
    </main>
  )
}
