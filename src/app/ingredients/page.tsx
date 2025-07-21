import { Suspense } from 'react'
import { IngredientsContainer } from '@/components/containers/ingredients-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default function IngredientsPage() {
  return (
    <main className={pageMain}>
      <h1 className='text-3xl font-bold mb-4 mr-auto'>Ingredients</h1>
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
