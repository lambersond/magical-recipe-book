import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'

export const POST = withUser(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
    userId: string,
  ) => {
    const { id } = await params
    const data = await req.json()

    const character = await characterService.logForagingResults(
      id,
      data,
      userId,
    )
    return NextResponse.json(character)
  },
)
