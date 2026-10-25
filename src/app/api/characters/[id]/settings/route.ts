import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterSettingsSchema } from '@/schemas/character-settings'
import { characterService } from '@/server/characters'

/** Changes the character's mode, or whether it sends dishes to Foundry. */
export const PUT = withUser(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
    userId: string,
  ) => {
    const { id } = await params
    const parsed = characterSettingsSchema.safeParse(
      await req.json().catch(() => {}),
    )

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 },
      )
    }

    const outcome = await characterService.updateCharacterSettings(
      id,
      userId,
      parsed.data,
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
