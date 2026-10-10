import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { forageBiomeSchema } from '@/schemas/foraging'
import { characterService } from '@/server/characters'

/** Forages a biome with the character's Survival check result. */
export const POST = withUser(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
    userId: string,
  ) => {
    const { id } = await params
    const parsed = forageBiomeSchema.safeParse(await req.json().catch(() => {}))

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 },
      )
    }

    const outcome = await characterService.forageBiome(
      id,
      userId,
      parsed.data.biomeId,
      parsed.data.roll,
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
