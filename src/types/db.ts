import type {
  Biome as PrismaBiome,
  Ingredient as PrismaIngredient,
  Recipe as PrismaRecipe,
} from '@prisma/client'

export type Biome = PrismaBiome & {
  ingredientCount?: number
  ingredients?: Partial<PrismaIngredient>[]
}

export type Ingredient = PrismaIngredient & {
  biomes?: Partial<PrismaBiome>[]
}

export type Recipe = PrismaRecipe & {
  magicalIngredients?: Partial<PrismaIngredient>[]
}

export type NewCharacter = {
  name: string
}

export type Character = {
  id: string
  name: string
}
