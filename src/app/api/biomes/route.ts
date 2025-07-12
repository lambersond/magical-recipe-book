import { NextResponse } from 'next/server'
import { biomeService } from '@/server/biomes'

export async function GET() {
  const biomes = await biomeService.getAllBiomes()
  return NextResponse.json(biomes)
}
