import { NextResponse } from 'next/server'
import { isSendingStoneEnabled } from '@/server/sending-stone/config'

export async function GET() {
  return NextResponse.json({
    featureFlags: {
      isAuthEnabled:
        process.env.AUTH_GOOGLE_ENABLED?.toLowerCase() === 'true' || false,
      isDatabaseEnabled: (process.env.DATABASE_URL?.length || 0) > 0,
      isSendingStoneEnabled: isSendingStoneEnabled(),
    },
  })
}
