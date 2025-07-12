import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export function middleware(request: NextRequest) {
  const { nextUrl, headers: inHeaders } = request
  const { pathname } = nextUrl

  const headers = new Headers(inHeaders)
  headers.set('x-current-path', pathname)
  headers.set('x-current-host', inHeaders.get('host') || '')
  headers.set(
    'x-current-protocol',
    inHeaders.get('x-forwarded-proto') || 'http',
  )
  return NextResponse.next({ headers })
}

export default auth(req => {
  const { nextUrl } = req
  const isAuthenticated = !!req?.auth?.user

  if (!isAuthenticated) {
    return Response.redirect(new URL('/api/auth/signin', nextUrl))
  }
})

export const config = {
  matcher: [
    '/api/((?!mock).*)',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
