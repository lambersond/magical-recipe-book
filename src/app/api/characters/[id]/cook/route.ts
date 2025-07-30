import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'
import type { CookedDishStatus } from '@/types'

export const POST = withUser(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: Promise<{
        id: string
        status: CookedDishStatus
        isConsumed?: boolean
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
