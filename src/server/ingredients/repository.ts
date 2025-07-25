import prisma from '@/clients/prisma'
import type { Prisma, DefaultArgs } from '@/types/db'

export async function getIngredients(
  options?: Prisma.IngredientFindManyArgs<DefaultArgs>,
) {
  return prisma.ingredient.findMany(options)
}
