/* eslint-disable unicorn/no-null */
import { executeRoll, parseRollExpression } from '@lambersond/3d-dice-core'
import { DISH_EFFECT_DURATION_SECONDS } from '@/constants/dish-changes'
import {
  type IngredientChange,
  ingredientChangesSchema,
} from '@/schemas/dish-changes'
import type { DishChange, DishEffect, SendingStoneDish } from './types'
import type { CookedDishStatus } from '@/types'

/** A cooked dish, as read to send it. */
export type DishToSend = {
  id: string
  status: string
  cookedOnDay: number
  consumedOnDay: number | null
  recipe: {
    name: string
    description: string | null
    boonText: string | null
    baneText: string | null
    magicalIngredients: {
      ingredient: {
        name: string
        boon: string
        bane: string
        boonChanges: unknown
        baneChanges: unknown
      }
    }[]
  }
}

/**
 * A cooked dish as Sending Stone is sent it: the recipe's text for its
 * outcome, and for a boon or bane, the effect its magical ingredients have.
 * Dice in a change are rolled here, once.
 * @param rng - Rolls the dice; Math.random unless a test fixes them.
 */
export function buildDish(
  cookedDish: DishToSend,
  cook: string,
  rng: () => number = Math.random,
): SendingStoneDish {
  const status = cookedDish.status as Exclude<CookedDishStatus, 'prepared'>
  const outcome = status === 'boon' || status === 'bane' ? status : 'standard'
  const { recipe } = cookedDish

  return {
    version: 1,
    dish: {
      id: cookedDish.id,
      recipe: recipe.name,
      status,
      outcome,
      cookedOnDay: cookedDish.cookedOnDay,
      consumedOnDay: cookedDish.consumedOnDay,
    },
    cook: { name: cook },
    message: messageFor(recipe, outcome),
    effect: outcome === 'standard' ? null : effectFor(recipe, outcome, rng),
  }
}

/** The text the cookbook shows for a dish of this outcome. */
function messageFor(
  recipe: DishToSend['recipe'],
  outcome: SendingStoneDish['dish']['outcome'],
) {
  if (outcome === 'boon') return recipe.boonText ?? recipe.description ?? ''
  if (outcome === 'bane') return recipe.baneText ?? recipe.description ?? ''
  return recipe.description ?? ''
}

function effectFor(
  recipe: DishToSend['recipe'],
  outcome: 'boon' | 'bane',
  rng: () => number,
): DishEffect {
  const ingredients = recipe.magicalIngredients.map(
    ({ ingredient }) => ingredient,
  )

  return {
    name: `${recipe.name} (${outcome === 'boon' ? 'Boon' : 'Bane'})`,
    ingredients: ingredients.map(ingredient => ({
      name: ingredient.name,
      text: ingredient[outcome],
    })),
    duration: { seconds: DISH_EFFECT_DURATION_SECONDS },
    stacks: false,
    changes: ingredients.flatMap(ingredient =>
      ingredientChangesSchema
        .parse(ingredient[`${outcome}Changes`])
        .map(change => rolled(change, rng)),
    ),
  }
}

function rolled(change: IngredientChange, rng: () => number): DishChange {
  if (change.type !== 'maxHitPoints' || !('roll' in change)) return change

  const parsed = parseRollExpression(change.roll)
  if (!parsed.ok) {
    throw new Error(`Can't roll ${change.roll}: ${parsed.error}`)
  }
  const { total } = executeRoll(parsed.request, { rng })
  return {
    type: 'maxHitPoints',
    value: change.sign * total,
    formula: change.roll,
  }
}
