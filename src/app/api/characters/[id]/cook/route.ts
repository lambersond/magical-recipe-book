import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'

export const POST = withUser(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: Promise<{
        id: string
      }>
    },
    userId: string,
  ) => {
    const { id } = await params
    const { recipeId, status, isConsumed } = await req.json()

    const character = await characterService.cookRecipe(
      id,
      userId,
      recipeId,
      status,
      isConsumed,
    )
    return NextResponse.json(character)
  },
)
