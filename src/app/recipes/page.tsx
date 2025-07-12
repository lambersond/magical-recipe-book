import { Suspense } from 'react'
import { RecipesContainer } from '@/components/containers/recipes-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'

export default function RecipesPage() {
  return (
    <main className='pt-8 pb-20 sm:p-20 flex flex-col items-center gap-4'>
      <Suspense
        fallback={<MagicalBookLoader loadingText='Loading recipe list...' />}
      >
        <RecipesContainer />
      </Suspense>
    </main>
  )
}
