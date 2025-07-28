import { Rarity } from './rarity'
import type { Nullish } from './types'
import type {
  Biome as PrismaBiome,
  Character as PrismaCharacter,
  Cookbook as PrismaCookbook,
  ForagedIngredient as PrismaForagedIngredient,
  Ingredient as PrismaIngredient,
  IngredientsPouch as PrismaIngredientsPouch,
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

export type ForagedIngredient = PrismaForagedIngredient & {
  magicalIngredient?: Partial<PrismaIngredient> | null
}

export type Recipe = PrismaRecipe & {
  magicalIngredients?: Partial<PrismaIngredient>[]
}

export type Character = PrismaCharacter & {
  cookbook?: Nullish<Partial<PrismaCookbook>>
  recipes?: Nullish<Partial<PrismaRecipe>[]>
  foragingLog?: Nullish<Partial<ForagedIngredient>[]>
  ingredientsPouch?: Nullish<Partial<PrismaIngredientsPouch>>
  backpack?: Nullish<Partial<PrismaIngredientsPouch>>
}

//------------------
// Character       -
//------------------

export type FullCharacter = {
  id: string
  name: string
  description: string
  image: string
  currentDay: number
  createdAt: Date
  updatedAt: Date

  cookbook: {
    id: string
    image: string
    createdAt: Date
    updatedAt: Date
    characterId: string
    knownRecipes: {
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
        ingredient: {
          id: string
          name: string
          description: string
          rarity: Rarity
          boon: string
          bane: string
        }
      }[]
    }[]
  }

  foragingLog: {
    id: string
    foundOnDay: number
    isExpired: boolean
    isUsed: boolean
    createdAt: Date
    updatedAt: Date
    commonIngredients: number
    magicalIngredient?: {
      id: string
      name: string
      description: string
      rarity: Rarity
      boon: string
      bane: string
    } | null
  }[]

  ingredientsPouch: {
    id: string
    characterId: string
    commonIngredients: number
    createdAt: Date
    updatedAt: Date
    magicalIngredients: {
      id: string
      name: string
      description: string
      rarity: Rarity
      boon: string
      bane: string
      foundOnDay: number
      isExpired: boolean
      isUsed: boolean
      createdAt: Date
      updatedAt: Date
      magicalIngredient: {
        id: string
        name: string
        description: string
        rarity: Rarity
        boon: string
        bane: string
      } | null
    }[]
  }
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
