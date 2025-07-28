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
    const { recipeId } = await req.json()
    const character = await characterService.addRecipeToCharacterCookbook(
      id,
      recipeId,
      userId,
    )
    return NextResponse.json(character)
  },
)
