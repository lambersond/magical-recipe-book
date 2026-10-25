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

    const outcome = await characterService.logForagingResults(id, data, userId)

    if (!outcome.ok) {
      return NextResponse.json(
        { error: outcome.error },
        { status: outcome.status },
      )
    }
    return NextResponse.json(outcome.result)
  },
)
