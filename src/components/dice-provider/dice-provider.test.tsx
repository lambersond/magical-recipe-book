import { use } from 'react'
import { DiceRenderer } from '@lambersond/3d-dice-core'
import { render, screen } from '@test-utils'
import { DiceProvider, DiceRendererCtx } from './dice-provider'

jest.mock('@lambersond/3d-dice-core', () => ({
  DiceRenderer: jest.fn(() => ({ ensure: jest.fn(), dispose: jest.fn() })),
}))

const MockDiceRenderer = jest.mocked(DiceRenderer)

let seen: DiceRenderer | undefined

function Probe() {
  seen = use(DiceRendererCtx)
  return <p>child</p>
}

describe('components/dice-provider', () => {
  beforeEach(() => {
    seen = undefined
  })

  it('should provide one renderer to its children across re-renders', () => {
    const { rerender } = render(
      <DiceProvider>
        <Probe />
      </DiceProvider>,
    )
    const first = seen
    rerender(
      <DiceProvider>
        <Probe />
      </DiceProvider>,
    )

    expect(screen.getByText('child')).toBeInTheDocument()
    expect(first).toBe(MockDiceRenderer.mock.results[0].value)
    expect(seen).toBe(first)
    expect(MockDiceRenderer).toHaveBeenCalledTimes(1)
  })

  it('should leave building the renderer to its first consumer', () => {
    render(
      <DiceProvider>
        <Probe />
      </DiceProvider>,
    )

    expect(seen?.ensure).not.toHaveBeenCalled()
  })

  it('should dispose the renderer on unmount', () => {
    const { unmount } = render(
      <DiceProvider>
        <Probe />
      </DiceProvider>,
    )
    unmount()

    expect(seen?.dispose).toHaveBeenCalledTimes(1)
  })
})
