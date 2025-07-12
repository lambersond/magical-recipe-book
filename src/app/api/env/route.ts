import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    keycloakClientId: process.env.AUTH_KEYCLOAK_ID || '',
    roles: {
      isse: process.env.ISSE_ROLE || '',
      admin: process.env.ADMIN_ROLE || '',
    },
  })
}
