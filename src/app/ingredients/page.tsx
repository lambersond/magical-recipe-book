import { Suspense } from 'react'
import { IngredientsContainer } from '@/components/containers/ingredients-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'

export default function IngredientsPage() {
  return (
    <main className='pt-8 pb-20 sm:p-20 flex flex-col items-center gap-4'>
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
