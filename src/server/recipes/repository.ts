import prisma from '@/clients/prisma'
import type { Prisma } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/client'

export async function getRecipes(
  options?: Prisma.RecipeFindManyArgs<DefaultArgs>,
) {
  return prisma.recipe.findMany(options)
}
