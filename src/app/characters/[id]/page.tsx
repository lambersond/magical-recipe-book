import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { CharacterContainer } from '@/components/containers/character-container'
import { MagicalBookLoader } from '@/components/magical-book-loader'
import { pageMain } from '@/utils/styles'

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()

  if (!session?.user?.id) {
    notFound()
  }
  return (
    <main>
      <Suspense
        fallback={
          <div className={pageMain}>
            <MagicalBookLoader loadingText='Loading character...' />
          </div>
        }
      >
        <CharacterContainer id={id} userId={session.user.id} />
      </Suspense>
    </main>
  )
}
