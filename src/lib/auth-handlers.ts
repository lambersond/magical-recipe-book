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
