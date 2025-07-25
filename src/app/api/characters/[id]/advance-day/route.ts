import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'

export async function PUT(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const character = await characterService.advanceDay(id, session.user.id)
  return NextResponse.json(character)
}
