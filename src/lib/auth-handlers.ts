import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

type AuthenticatedHandler<T = any> = (
  req: NextRequest,
  context: T,
  userId: string,
) => Promise<NextResponse>

export function withUser<T = any>(handler: AuthenticatedHandler<T>) {
  return async (req: NextRequest, context: T) => {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req, context, session.user.id)
  }
}

export function isSelf(userId: string, resourceUserId: string) {
  // TODO: Remove once campaigns are implemented
  const tempCampaignWorkaround = userId === 'cmditppdp0000jw04n9llvg85'
  return userId === resourceUserId || tempCampaignWorkaround
}
