import prisma from '@/clients/prisma'
import type { Prisma } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/client'

export async function getBiomes(
  options?: Prisma.BiomeFindManyArgs<DefaultArgs>,
) {
  return prisma.biome.findMany(options)
}
