import { type NextRequest, NextResponse } from 'next/server'
import { withUser } from '@/lib/auth-handlers'
import { characterService } from '@/server/characters'

export const GET = withUser(async (_req: NextRequest, _, userId: string) => {
  const characterNames =
    await characterService.getUserCharacterNamesByUserId(userId)
  return NextResponse.json(characterNames)
})
