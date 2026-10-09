import { headers } from 'next/headers'
import { Nullish } from '@/types'

export async function extractHeaders() {
  const headerList = await headers()
  const protocol = headerList.get('x-current-protocol')
  const host = headerList.get('x-current-host')
  const headerMap: {
    protocol?: Nullish<string>
    host?: Nullish<string>
    pathname?: Nullish<string>
    api?: Nullish<string>
  } = {
    protocol,
    host,
    pathname: headerList.get('x-current-path'),
    api: `${protocol}://${host}/api`,
  }

  return headerMap
}
