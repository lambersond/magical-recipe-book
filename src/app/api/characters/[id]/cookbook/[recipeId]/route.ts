import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { commonIngredientsSchema } from '@/schemas/common-ingredients'
import { characterService } from '@/server/characters'

/** Renames a known recipe's common ingredients in this character's cookbook. */
export const PATCH = withUser(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string; recipeId: string }> },
    userId: string,
  ) => {
    const { id, recipeId } = await params
    const parsed = commonIngredientsSchema.safeParse(
      await req.json().catch(() => {}),
    )

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 },
      )
    }

    const result = await characterService.updateCookbookRecipeCommonIngredients(
      id,
      userId,
      recipeId,
      parsed.data.mundaneIngredients,
    )

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      )
    }
    return NextResponse.json(result.recipe)
  },
)
