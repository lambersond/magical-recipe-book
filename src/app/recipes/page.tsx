import { Suspense } from 'react'
import { RecipesContainer } from '@/components/containers/recipes-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default function RecipesPage() {
  return (
    <main className={pageMain}>
      <h1 className='text-3xl font-bold mb-4 mr-auto'>Recipes</h1>
      <Suspense
        fallback={<MagicalBookLoader loadingText='Loading recipe list...' />}
      >
        <RecipesContainer />
      </Suspense>
    </main>
  )
}
