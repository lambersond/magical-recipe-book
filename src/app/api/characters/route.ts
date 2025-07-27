import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { characterService } from '@/server/characters'

export async function GET({ nextUrl }: NextRequest) {
  const details = nextUrl.searchParams.get('details') || 'full'
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (details === 'lite') {
    const data = await characterService.getUserCharactersLite(session.user.id)
    return NextResponse.json(data)
  }

  const data = await characterService.findCharactersByUserId(session.user.id)
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
