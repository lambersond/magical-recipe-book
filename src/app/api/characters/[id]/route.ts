import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const data = await req.json()
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const updatedCharacter = await characterService.updateCharacter(
    data,
    session.user.id,
    id,
  )

  if (!updatedCharacter) {
    return NextResponse.json(
      { error: 'Failed to update character' },
      { status: 500 },
    )
  }
  return NextResponse.json(updatedCharacter)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const deletedCharacter = await characterService.deleteCharacterById(
    id,
    session.user.id,
  )

  if (!deletedCharacter) {
    return NextResponse.json(
      { error: 'Failed to delete character' },
      { status: 500 },
    )
  }
  return NextResponse.json({ success: true })
}
