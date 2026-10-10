import { NextResponse } from 'next/server'
import { biomeService } from '@/server/biomes'

export async function GET() {
  return NextResponse.json(await biomeService.getBiomeOptions())
}
