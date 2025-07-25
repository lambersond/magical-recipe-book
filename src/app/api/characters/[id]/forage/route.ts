import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const data = await req.json()
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const character = await characterService.logForagingResults(
    id,
    data,
    session.user.id,
  )
  return NextResponse.json(character)
}
