import { diceRollMock, render, screen, useClick, waitFor } from '@test-utils'
import { RollableField } from './rollable-field'

const rollResult = {
  id: 'roll-1',
  at: 0,
  pools: [{ sides: 20, count: 1, rolls: [[14]], kept: [14] }],
  modifier: 3,
  total: 17,
}

describe('components/rollable-field', () => {
  beforeEach(() => {
    diceRollMock.mockResolvedValue(rollResult)
  })

  it('should show the modifier without its sign', () => {
    render(<RollableField topLabel='Cooking' number={-2} onClick={jest.fn()} />)

    expect(screen.getByText('Cooking')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('2')
  })

  it('should roll a d20 plus the modifier by default', async () => {
    const onClick = jest.fn()
    const click = useClick(
      <RollableField topLabel='Proficiency' number={3} onClick={onClick} />,
    )

    await click(screen.getByRole('button'))

    expect(diceRollMock).toHaveBeenCalledWith({
      pools: [{ sides: 20, count: 1 }],
      modifier: 3,
      advantage: undefined,
      exploding: false,
    })
    await waitFor(() => expect(onClick).toHaveBeenCalledWith(rollResult))
  })

  it('should add the modifier to a custom notation', async () => {
    const click = useClick(
      <RollableField
        topLabel='Cooking'
        number={-1}
        notation='2d6 + 1 adv'
        onClick={jest.fn()}
      />,
    )

    await click(screen.getByRole('button'))

    expect(diceRollMock).toHaveBeenCalledWith({
      pools: [{ sides: 6, count: 2 }],
      modifier: 0,
      advantage: 'adv',
      exploding: false,
    })
  })
})
