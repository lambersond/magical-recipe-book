import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'

export const PUT = withUser(
  async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
    userId: string,
  ) => {
    const { id } = await params
    const character = await characterService.advanceDay(id, userId)
    return NextResponse.json(character)
  },
)
