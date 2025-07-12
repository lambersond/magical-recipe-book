import type {
  Biome as PrismaBiome,
  Ingredient as PrismaIngredient,
} from '@prisma/client'

export type Biome = PrismaBiome & {
  ingredientCount?: number
  ingredients?: Partial<PrismaIngredient>[]
}

export type Ingredient = PrismaIngredient & {
  biomes?: Partial<PrismaBiome>[]
}

export type NewCharacter = {
  name: string
}

export type Character = {
  id: string
  name: string
}
