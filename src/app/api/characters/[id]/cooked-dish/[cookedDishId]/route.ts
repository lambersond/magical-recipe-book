import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { cookedDishService } from '@/server/cooked-dish'

export const DELETE = withUser(
  async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string; cookedDishId: string }> },
    userId: string,
  ) => {
    const { id, cookedDishId } = await params
    const cookedDishDeleted =
      await cookedDishService.deleteCookedDishByIdCharacterIdAndUserId(
        cookedDishId,
        id,
        userId,
      )
    return NextResponse.json(cookedDishDeleted)
  },
)

export const POST = withUser(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string; cookedDishId: string }> },
    userId: string,
  ) => {
    const { id, cookedDishId } = await params
    const data = await req.json()

    const cookedDishUpdated =
      await cookedDishService.updateCookedDishByIdCharacterIdAndUserId({
        cookedDishId,
        characterId: id,
        userId,
        data,
      })
    return NextResponse.json(cookedDishUpdated)
  },
)
