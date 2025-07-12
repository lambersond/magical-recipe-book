/**
 * @jest-environment node
 */

import { GET } from './route'

describe('app/api/env', () => {
  it('should return env', async () => {
    process.env.AUTH_KEYCLOAK_ID = 'auth_12345_client'
    process.env.ISSE_ROLE = 'isse'
    process.env.ADMIN_ROLE = 'admin'

    const response = await GET()
    const data = await response.json()

    expect(data.keycloakClientId).toBe('auth_12345_client')
    expect(data.roles.isse).toBe('isse')
    expect(data.roles.admin).toBe('admin')
  })

  it('should return empty strings when not set', async () => {
    delete process.env.AUTH_KEYCLOAK_ID
    delete process.env.ISSE_ROLE
    delete process.env.ADMIN_ROLE

    const response = await GET()
    const data = await response.json()

    expect(data.keycloakClientId).toBe('')
    expect(data.roles.isse).toBe('')
    expect(data.roles.admin).toBe('')
  })
})
