import type { Rarity } from './rarity'
import type {
  Biome as PrismaBiome,
  Ingredient as PrismaIngredient,
  Recipe as PrismaRecipe,
} from '@prisma/client'

export type { DefaultArgs } from '@prisma/client/runtime/client'
export type { Prisma } from '@prisma/client'

export type Biome = PrismaBiome & {
  ingredientCount?: number
  ingredients?: Partial<PrismaIngredient>[]
}

export type Ingredient = PrismaIngredient & {
  biomes?: Partial<PrismaBiome>[]
}
export type RecipeOld = PrismaRecipe & {
  magicalIngredients?: Partial<PrismaIngredient>[]
}

export type MagicalIngredient = {
  id: string
  name: string
  description: string
  rarity: Rarity
  boon: string
  bane: string
}

export type Recipe = {
  id: string
  name: string
  image: string
  description: string
  difficulty: number
  boonText: string
  baneText: string
  createdAt: Date
  updatedAt: Date
  mundaneIngredients: string[]
  magicalIngredients: {
    ingredient: MagicalIngredient
  }[]
}

export type Cookbook = {
  id: string
  image: string
  createdAt: Date
  updatedAt: Date
  characterId: string
  knownRecipes: Recipe[]
}

export type ForagedIngredient = {
  id: string
  foundOnDay: number
  isExpired: boolean
  isUsed: boolean
  createdAt: Date
  updatedAt: Date
  commonIngredients: number
  magicalIngredient?: MagicalIngredient | null
}

export type IngredientsPouch = {
  id: string
  characterId: string
  commonIngredients: number
  createdAt: Date
  updatedAt: Date
  magicalIngredients: ForagedIngredient[]
}

export type FullCharacter = {
  id: string
  name: string
  description: string
  image: string
  currentDay: number
  createdAt: Date
  updatedAt: Date
  cookbook: Cookbook
  foragingLog: ForagedIngredient[]
  ingredientsPouch: IngredientsPouch
}

export type EditableCharacter = {
  id?: string
  name: string
  description?: string
}

export type LogForagingResults = {
  quantity: number
  isMagical: boolean
  magicalIngredientId?: string
}

export type LearnRecipe = {
  recipeId: string
}
