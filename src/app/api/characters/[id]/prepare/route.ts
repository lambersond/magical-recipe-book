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
        recipeId?: string
      }>
    },
    userId: string,
  ) => {
    const { id } = await params
    const { recipeId } = await req.json()

    const character = await characterService.cookRecipe(
      id,
      userId,
      recipeId,
      'prepared',
      true,
    )
    return NextResponse.json(character)
  },
)
