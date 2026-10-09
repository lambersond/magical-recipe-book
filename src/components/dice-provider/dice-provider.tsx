'use client'

import { type ReactNode, createContext, useEffect, useState } from 'react'
import { DiceRenderer } from '@lambersond/3d-dice-core'

export const DiceRendererCtx = createContext<DiceRenderer | undefined>(
  undefined,
)

/**
 * Holds one shared 3D dice renderer for the app. The renderer is built lazily
 * by the first `useDice` consumer to mount, so pages that never roll dice don't
 * load the 3D engine. Dice assets are served from `/3d-dice/`, copied there by
 * the `postinstall` script.
 */
export function DiceProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [renderer] = useState(() => new DiceRenderer())

  useEffect(() => () => renderer.dispose(), [renderer])

  return <DiceRendererCtx value={renderer}>{children}</DiceRendererCtx>
}
