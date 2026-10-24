import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { sendingStoneService } from '@/server/sending-stone'

/**
 * Sends a cooked dish to the character's game through Sending Stone, for the
 * Gamemaster to apply. Only where SENDING_STONE_ENABLED is "true".
 */
export const POST = withUser(
  async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string; cookedDishId: string }> },
    userId: string,
  ) => {
    const { id, cookedDishId } = await params
    const outcome = await sendingStoneService.sendCookedDish(
      id,
      cookedDishId,
      userId,
    )

    if (!outcome.ok) {
      return NextResponse.json(
        { error: outcome.error },
        { status: outcome.status },
      )
    }
    return NextResponse.json(outcome.result)
  },
)
