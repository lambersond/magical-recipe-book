import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { UserContainer } from '@/components/containers/user-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { getCurrentUser } from '@/lib/session'
import { pageMain } from '@/utils/styles'

export default async function UserPage() {
  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  return (
    <main style={{ alignItems: 'baseline' }} className={pageMain}>
      <Suspense
        fallback={
          <div className={pageMain}>
            <MagicalBookLoader loadingText='Loading user data...' />
          </div>
        }
      >
        <div>
          <h1 className='text-4xl font-bold mb-4 text-text-primary'>
            Your Characters
          </h1>
          <UserContainer userId={user.id} />
        </div>
      </Suspense>
    </main>
  )
}
