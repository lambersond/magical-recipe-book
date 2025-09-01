import type { Rarity } from './rarity'
import type {
  Biome as PrismaBiome,
  Ingredient as PrismaIngredient,
  Recipe as PrismaRecipe,
} from '@prisma/client'

export type { DefaultArgs } from '@prisma/client/runtime/client'
export type { Prisma } from '@prisma/client'

export type CookedDishStatus =
  | 'prepared'
  | 'success'
  | 'boon'
  | 'failure'
  | 'bane'

export type CookedDishMagicalIngredient = {
  ingredient: {
    name: string
    boon: string
    bane: string
  }
}

export type CookedDishRecipe = {
  name: string
  description: string
  difficulty: number
  boonText: string
  baneText: string
  magicalIngredients: CookedDishMagicalIngredient[]
}
export type CookedDish = {
  id: string
  status: CookedDishStatus
  cookedOnDay: number
  consumedOnDay: number | null
  recipe: CookedDishRecipe
}

export type Biome = {
  id: string
  name: string
  description: string
  image: string
  ingredients: {
    ingredient: {
      id: string
      name: string
      description: string
      boon: string
      bane: string
      rarity: Rarity
    }
  }[]
}

export type Ingredient = PrismaIngredient & {
  rarity: Rarity
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

export type Backpack = {
  updatedAt: Date
  cookedDishes: any[] // TODO: Define cooked dish type
  infusedItems: any[] // TODO: Define infused item type
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
  backpack: Backpack
  abilities: CharacterAbilities
}

export type CharacterAbilities = {
  characterId: string
  cookingAbility: number
  hasCookingTools: boolean
  proficiency: number
}

export type EditableCharacter = {
  id?: string
  name: string
  description?: string
  abilities: {
    hasCookingTools: boolean
    cookingAbility?: number
    proficiency?: number
  }
}

export type LogForagingResults = {
  quantity: number
  isMagical: boolean
  magicalIngredientId?: string
}

export type LearnRecipe = {
  recipeId: string
}
