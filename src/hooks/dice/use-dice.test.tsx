import { renderHook } from '@test-utils'
import { useDice } from './use-dice'
import { DiceRendererCtx } from '@/components/dice-provider'
import type { DiceRenderer } from '@lambersond/3d-dice-core'
import type { ReactNode } from 'react'

const D20 = { pools: [{ sides: 20 as const, count: 1 }], modifier: 3 }

function setup(renderer: Partial<DiceRenderer>) {
  return renderHook(() => useDice(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <DiceRendererCtx value={renderer as DiceRenderer}>
        {children}
      </DiceRendererCtx>
    ),
  })
}

describe('hooks/dice/use-dice', () => {
  let consoleError: jest.SpyInstance

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
    jest.useRealTimers()
  })

  it('should throw if not wrapped in a DiceProvider', () => {
    expect(() => renderHook(() => useDice())).toThrow(
      'useDice must be used within a DiceProvider',
    )
  })

  it('should start building the renderer on mount', () => {
    const ensure = jest.fn()
    setup({ ensure, isReady: false })

    expect(ensure).toHaveBeenCalled()
  })

  it('should animate the dice to land on the rolled result', async () => {
    const roll = jest.fn().mockResolvedValue([])
    const { result } = setup({ ensure: jest.fn(), isReady: true, roll })

    const rolled = await result.current.roll(D20)
    const [die] = rolled.pools[0].kept

    expect(rolled.total).toBe(die + 3)
    expect(die).toBeGreaterThanOrEqual(1)
    expect(die).toBeLessThanOrEqual(20)
    expect(roll).toHaveBeenCalledWith(`1d20@${die}`, {
      removal: { style: 'shrink', dwellMs: 2000 },
    })
  })

  it('should still resolve the roll when the renderer is not ready', async () => {
    const roll = jest.fn()
    const { result } = setup({ ensure: jest.fn(), isReady: false, roll })

    const rolled = await result.current.roll(D20)

    expect(rolled.total).toBe(rolled.pools[0].kept[0] + 3)
    expect(roll).not.toHaveBeenCalled()
  })

  it('should still resolve the roll when the animation fails', async () => {
    const roll = jest.fn().mockRejectedValue(new Error('context lost'))
    const { result } = setup({ ensure: jest.fn(), isReady: true, roll })

    const rolled = await result.current.roll(D20)

    expect(rolled.total).toBe(rolled.pools[0].kept[0] + 3)
    expect(consoleError).toHaveBeenCalledWith(
      'Dice animation failed',
      expect.any(Error),
    )
  })

  it('should stop waiting on an animation that never settles', async () => {
    jest.useFakeTimers()
    const roll = jest.fn().mockReturnValue(new Promise(() => {}))
    const { result } = setup({ ensure: jest.fn(), isReady: true, roll })

    const pending = result.current.roll(D20)
    await jest.advanceTimersByTimeAsync(30_000)
    const rolled = await pending

    expect(rolled.total).toBe(rolled.pools[0].kept[0] + 3)
    expect(consoleError).toHaveBeenCalledWith(
      'Dice animation failed',
      expect.objectContaining({ message: 'Timed out after 30000ms' }),
    )
  })
})
