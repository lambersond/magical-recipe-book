import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { CharacterContainer } from '@/components/containers/character-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { getCurrentUser } from '@/lib/session'
import { pageMain } from '@/utils/styles'

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }
  return (
    <main className='w-screen'>
      <Suspense
        fallback={
          <div className={pageMain}>
            <MagicalBookLoader loadingText='Loading character...' />
          </div>
        }
      >
        <CharacterContainer id={id} userId={user.id} />
      </Suspense>
    </main>
  )
}
