/**
 * @jest-environment node
 */

import { getBiomeIngredients, getBiomeOptions } from './service'
import { prismaMock } from '@/utils/test-utils-node'

describe('server/biomes/service', () => {
  it('should list biomes with their ingredient counts', async () => {
    prismaMock.biome.findMany.mockResolvedValue([
      { id: 'b1', name: 'Forests', image: '🌲', _count: { ingredients: 9 } },
    ] as any)

    await expect(getBiomeOptions()).resolves.toEqual([
      { id: 'b1', name: 'Forests', image: '🌲', ingredientCount: 9 },
    ])
  })

  it("should return a biome's ingredients", async () => {
    const moss = { id: 'moss', name: 'Cave Moss', rarity: 'common' }
    prismaMock.biome.findMany.mockResolvedValue([
      { ingredients: [{ ingredient: moss }] },
    ] as any)

    await expect(getBiomeIngredients('b1')).resolves.toEqual([moss])
    expect(prismaMock.biome.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'b1' } }),
    )
  })

  it('should return no ingredients for an unknown biome', async () => {
    prismaMock.biome.findMany.mockResolvedValue([])

    await expect(getBiomeIngredients('missing')).resolves.toEqual([])
  })
})
