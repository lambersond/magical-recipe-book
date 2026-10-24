/* eslint-disable unicorn/no-null */
import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { sendingStoneLinkSchema } from '@/schemas/sending-stone'
import { sendingStoneService } from '@/server/sending-stone'

type Context = { params: Promise<{ id: string }> }

function answer(
  outcome: Awaited<ReturnType<typeof sendingStoneService.linkCharacter>>,
) {
  if (!outcome.ok) {
    return NextResponse.json(
      { error: outcome.error },
      { status: outcome.status },
    )
  }
  return NextResponse.json(outcome.result)
}

/** Links the character to Sending Stone with its player's link code. */
export const PUT = withUser(
  async (req: NextRequest, { params }: Context, userId: string) => {
    const { id } = await params
    const parsed = sendingStoneLinkSchema.safeParse(
      await req.json().catch(() => {}),
    )

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 },
      )
    }
    return answer(
      await sendingStoneService.linkCharacter(id, userId, parsed.data.token),
    )
  },
)

/** Unlinks the character from Sending Stone. */
export const DELETE = withUser(
  async (_req: NextRequest, { params }: Context, userId: string) => {
    const { id } = await params
    return answer(await sendingStoneService.linkCharacter(id, userId, null))
  },
)
