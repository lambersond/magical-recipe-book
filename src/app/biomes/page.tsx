import { Suspense } from 'react'
import { BiomesContainer } from '@/components/containers/biomes-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default function BiomesPage() {
  return (
    <main className={pageMain}>
      <Suspense
        fallback={<MagicalBookLoader loadingText='Loading biomes list...' />}
      >
        <BiomesContainer />
      </Suspense>
    </main>
  )
}
