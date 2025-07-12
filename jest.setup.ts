import '@testing-library/jest-dom'
import { PrismaClient } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'

// create one shared deep‐mock for all tests
export const prismaMock = mockDeep<PrismaClient>()

// jest will replace any import of { PrismaClient } with this mock
jest.mock('@prisma/client', () => {
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => prismaMock),
  }
})

// Set up the testing environment variables
process.env.GITLAB_GRAPHQL_API = 'https://gitlab.com/api/graphql'
process.env.GITLAB_REST_API = 'https://gitlab.com/api/v4'
process.env.BOE_PROJECT_ID = '42'
process.env.GITLAB_API_TOKEN = 'fake-token'
process.env.BOE_PROJECT_PATH = 'boe'
process.env.AUTH_KEYCLOAK_ID = ''
process.env.USE_MOCK_INVENTORY = 'false'

globalThis.fetch = jest.fn()
/**
 * A simple mockFetch function that returns a Promise<Response>.
 * @param status The status code of the response
 * @param responseData The data that is passed in response
 * @returns void
 */
export function mockFetch({ status = 200, responseData = {} } = {}) {
  globalThis.fetch = jest.fn(() => {
    return Promise.resolve({
      status,
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(responseData),
      headers: new Headers(),
      redirected: false,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: () => {},
      // eslint-disable-next-line unicorn/no-null
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(responseData),
    } as Response)
  })
}

export function mockManyFetch(
  responses: Array<{ status?: number; responseData?: any }> = [
    { status: 200, responseData: {} },
  ],
) {
  const fetchMock = jest.fn<Promise<Response>, [RequestInfo, RequestInit?]>()

  // for each config, queue up one mock response
  for (const { status = 200, responseData = {} } of responses) {
    const res: Partial<Response> = {
      status,
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(responseData),
      text: () =>
        typeof responseData === 'string'
          ? Promise.resolve(responseData)
          : Promise.resolve(JSON.stringify(responseData)),
      headers: new Headers(),
      redirected: false,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: () => ({}) as Response,
      body: undefined,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
    }
    fetchMock.mockResolvedValueOnce(res as Response)
  }

  globalThis.fetch = fetchMock as any
  return fetchMock
}
