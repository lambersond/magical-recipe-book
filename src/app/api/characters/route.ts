import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'

export const GET = withUser(
  async ({ nextUrl }: NextRequest, _context: unknown, userId: string) => {
    const details = nextUrl.searchParams.get('details') || 'full'

    if (details === 'lite') {
      const data = await characterService.getUserCharactersLite(userId)
      return NextResponse.json(data)
    }

    const data = await characterService.findCharactersByUserId(userId)
    return NextResponse.json(data)
  },
)

export const POST = withUser(
  async (req: NextRequest, _context: unknown, userId: string) => {
    const data = await req.json()
    const newCharacter = await characterService.createCharacter(data, userId)

    if (!newCharacter) {
      return NextResponse.json(
        { error: 'Failed to create character' },
        { status: 500 },
      )
    }
    return NextResponse.json(newCharacter)
  },
)
