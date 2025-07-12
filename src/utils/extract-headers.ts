import { headers } from 'next/headers'
import { Nullish } from '@/types'

export async function extractHeaders() {
  const headerList = await headers()
  const headerMap: {
    protocol?: Nullish<string>
    host?: Nullish<string>
    pathname?: Nullish<string>
    api?: Nullish<string>
  } = {}

  headerMap.protocol = headerList.get('x-current-protocol')
  headerMap.host = headerList.get('x-current-host')
  headerMap.pathname = headerList.get('x-current-path')
  headerMap.api = `${headerMap.protocol}://${headerMap.host}/api`

  return headerMap
}
