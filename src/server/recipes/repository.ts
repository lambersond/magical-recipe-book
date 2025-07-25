import prisma from '@/clients/prisma'
import type { Prisma, DefaultArgs } from '@/types/db'

export async function getRecipes(
  options?: Prisma.RecipeFindManyArgs<DefaultArgs>,
) {
  return prisma.recipe.findMany(options)
}
