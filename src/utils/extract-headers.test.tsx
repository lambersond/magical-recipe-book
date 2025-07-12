/**
 * @jest-environment node
 */

import { extractHeaders } from './extract-headers'

jest.mock('next/headers', () => ({
  headers: () =>
    new Headers({
      'x-current-protocol': 'http',
      'x-current-host': 'localhost',
      'x-current-path': '/applications/NextJS',
    }),
}))

describe('utils/extract-headers', () => {
  it('should extract headers correctly', async () => {
    const headers = await extractHeaders()

    expect(headers).toEqual({
      protocol: 'http',
      host: 'localhost',
      pathname: '/applications/NextJS',
      api: 'http://localhost/api',
    })
  })
})
