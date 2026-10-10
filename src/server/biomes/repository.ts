import prisma from '@/clients/prisma'
import type { Prisma, DefaultArgs } from '@/types/db'

export async function getBiomes<
  T extends Prisma.BiomeFindManyArgs<DefaultArgs>,
>(options?: Prisma.SelectSubset<T, Prisma.BiomeFindManyArgs<DefaultArgs>>) {
  return prisma.biome.findMany<T>(options)
}
