import { Suspense } from 'react'
import { IngredientsContainer } from '@/components/containers/ingredients-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default function IngredientsPage() {
  return (
    <main className={pageMain}>
      <Suspense
        fallback={
          <MagicalBookLoader loadingText='Loading ingredients list...' />
        }
      >
        <IngredientsContainer />
      </Suspense>
    </main>
  )
}
