import prisma from '@/clients/prisma'
import type { Prisma } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/client'

export async function getIngredients(
  options?: Prisma.IngredientFindManyArgs<DefaultArgs>,
) {
  return prisma.ingredient.findMany(options)
}
