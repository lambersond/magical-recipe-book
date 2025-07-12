import { Suspense } from 'react'
import { BiomesContainer } from '@/components/containers/biomes-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'

export default function BiomesPage() {
  return (
    <main className='pt-8 pb-20 sm:p-20 flex flex-col items-center gap-4'>
      <Suspense
        fallback={<MagicalBookLoader loadingText='Loading biomes list...' />}
      >
        <BiomesContainer />
      </Suspense>
    </main>
  )
}
