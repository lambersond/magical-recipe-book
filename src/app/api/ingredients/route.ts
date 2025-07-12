import { NextResponse } from 'next/server'
import { ingredientsService } from '@/server/ingredients'

export async function GET() {
  const data = await ingredientsService.getAllIngredients()
  return NextResponse.json(data)
}
