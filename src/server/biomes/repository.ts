import prisma from '@/clients/prisma'
import type { Prisma, DefaultArgs } from '@/types/db'

export async function getBiomes(
  options?: Prisma.BiomeFindManyArgs<DefaultArgs>,
) {
  return prisma.biome.findMany(options)
}
