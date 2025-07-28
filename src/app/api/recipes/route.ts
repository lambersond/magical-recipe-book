import { NextResponse } from 'next/server'
import { recipeService } from '@/server/recipes'

export async function GET() {
  const data = await recipeService.getAllRecipes()
  return NextResponse.json(data)
}
