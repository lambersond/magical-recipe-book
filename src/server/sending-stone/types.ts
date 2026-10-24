import type { IngredientChange } from '@/schemas/dish-changes'
import type { CookedDishStatus } from '@/types'

/**
 * A change as sent: an ingredient's, with any dice already rolled, once for
 * the dish, so that every character it's applied to gets the same.
 */
export type DishChange =
  | Exclude<IngredientChange, { type: 'maxHitPoints' }>
  | {
      type: 'maxHitPoints'
      /** The hit points gained, or lost below 0. */
      value: number
      /** The dice it was rolled from, such as `3+1d6`, where it was rolled. */
      formula?: string
    }

/** What the cooked dish does to whoever the Gamemaster applies it to. */
export type DishEffect = {
  /** Such as "Ashen Root Stew (Boon)". */
  name: string
  /** Each magical ingredient's boon or bane, as players read it. */
  ingredients: { name: string; text: string }[]
  duration: { seconds: number }
  /** A character has one dish's effect at a time: a new one replaces it. */
  stacks: false
  changes: DishChange[]
}

/** A cooked dish as sent to Sending Stone for the Gamemaster's game. */
export type SendingStoneDish = {
  version: 1
  dish: {
    /** The cooked dish's id. The same dish is never sent twice. */
    id: string
    recipe: string
    status: Exclude<CookedDishStatus, 'prepared'>
    /** Boon and bane carry an effect; a standard dish only its message. */
    outcome: 'boon' | 'bane' | 'standard'
    cookedOnDay: number
    consumedOnDay: number | null
  }
  cook: { name: string }
  /** The recipe's boon, bane or standard text, for the chat card. */
  message: string
  effect: DishEffect | null
}
