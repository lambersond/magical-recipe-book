'use client'

import { use, useCallback, useEffect } from 'react'
import {
  executeRoll,
  toDiceBoxNotation,
  type RemovalOptions,
  type RollRequest,
  type RollResult,
} from '@lambersond/3d-dice-core'
import { DiceRendererCtx } from '@/components/dice-provider'

// How long the dice rest on the table before shrinking away
const REMOVAL: RemovalOptions = { style: 'shrink', dwellMs: 2000 }
// A stuck animation must never hold back a roll's result
const ANIMATION_TIMEOUT_MS = 30_000

/**
 * Rolls dice with the shared 3D renderer from `DiceProvider`. The result is
 * computed first and the dice are animated to land on it, so a roll still
 * resolves (without animation) while the renderer is loading or if WebGL is
 * unavailable.
 */
export function useDice() {
  const renderer = use(DiceRendererCtx)

  if (!renderer) {
    throw new Error('useDice must be used within a DiceProvider')
  }

  useEffect(() => {
    renderer.ensure()
  }, [renderer])

  const roll = useCallback(
    async (request: RollRequest): Promise<RollResult> => {
      const result = executeRoll(request)

      if (renderer.isReady) {
        try {
          await withTimeout(
            renderer.roll(toDiceBoxNotation(result), { removal: REMOVAL }),
            ANIMATION_TIMEOUT_MS,
          )
        } catch (error) {
          console.error('Dice animation failed', error)
        }
      }

      return result
    },
    [renderer],
  )

  return { roll }
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}
