import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { NewCharacterCard } from '@/components/cards'
import { UserContainer } from '@/components/containers/user-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default async function UserPage() {
  const session = await auth()

  if (!session?.user?.id) {
    notFound()
  }

  return (
    <main className={pageMain}>
      <Suspense
        fallback={
          <div className={pageMain}>
            <MagicalBookLoader loadingText='Loading user...' />
          </div>
        }
      >
        <div className='mb-4'>
          <h1 className='text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            Your Characters
          </h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
          <UserContainer userId={session.user.id} />
          <NewCharacterCard />
        </div>
      </Suspense>
    </main>
  )
}
