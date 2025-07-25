import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const data = await characterService.findCharactersByUserId(session?.user?.id)
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const newCharacter = await characterService.createCharacter(
    data,
    session?.user?.id,
  )

  if (!newCharacter) {
    return NextResponse.json(
      { error: 'Failed to create character' },
      { status: 500 },
    )
  }
  return NextResponse.json(newCharacter)
}
