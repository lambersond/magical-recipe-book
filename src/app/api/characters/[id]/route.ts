import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'

type Context = { params: Promise<{ id: string }> }

export const PUT = withUser(
  async (req: NextRequest, { params }: Context, userId: string) => {
    const { id } = await params
    const data = await req.json()

    const updatedCharacter = await characterService.updateCharacter(
      data,
      userId,
      id,
    )

    if (!updatedCharacter) {
      return NextResponse.json(
        { error: 'Failed to update character' },
        { status: 500 },
      )
    }
    return NextResponse.json(updatedCharacter)
  },
)

export const DELETE = withUser(
  async (_req: NextRequest, { params }: Context, userId: string) => {
    const { id } = await params

    const deletedCharacter = await characterService.deleteCharacterById(
      id,
      userId,
    )

    if (!deletedCharacter) {
      return NextResponse.json(
        { error: 'Failed to delete character' },
        { status: 500 },
      )
    }
    return NextResponse.json({ success: true })
  },
)
