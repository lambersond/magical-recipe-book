import { diceRollMock, screen, useUser, waitFor } from '@test-utils'
import { describeRoll, SurvivalCheck } from './survival-check'
import type { RollResult } from '@lambersond/3d-dice-core'

const result = (overrides: Partial<RollResult> = {}): RollResult => ({
  id: 'roll-1',
  at: 0,
  pools: [{ sides: 20, count: 1, rolls: [[14]], kept: [14] }],
  modifier: 0,
  total: 14,
  ...overrides,
})

describe('components/modals/go-foraging-modal/survival-check', () => {
  describe('describeRoll', () => {
    it('should list each die and the bonus', () => {
      expect(
        describeRoll(
          result({
            pools: [
              { sides: 4, count: 1, rolls: [[3]], kept: [3] },
              { sides: 20, count: 1, rolls: [[14]], kept: [14] },
            ],
            modifier: 2,
          }),
        ),
      ).toBe('1d4 (3) + 1d20 (14) + 2')
    })

    it('should show a penalty as subtraction', () => {
      expect(describeRoll(result({ modifier: -1 }))).toBe('1d20 (14) - 1')
    })

    it('should show both d20s on advantage', () => {
      expect(
        describeRoll(
          result({
            pools: [{ sides: 20, count: 1, rolls: [[9, 14]], kept: [14] }],
            advantage: 'adv',
          }),
        ),
      ).toBe('1d20 adv (9/14 → 14)')
    })
  })

  it('should start with a d20 that cannot be removed', () => {
    useUser(<SurvivalCheck onRolled={jest.fn()} />)

    expect(screen.getByText('1d20')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Remove a d20' }),
    ).not.toBeInTheDocument()
  })

  it('should add and remove aid dice', async () => {
    const { user } = useUser(<SurvivalCheck onRolled={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Add a d4' }))
    await user.click(screen.getByRole('button', { name: 'Add a d4' }))
    expect(screen.getByText('2d4')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove a d4' }))
    expect(screen.getByText('1d4')).toBeInTheDocument()
  })

  it('should roll the dice, advantage, and bonus, then report the total', async () => {
    diceRollMock.mockResolvedValue(
      result({
        pools: [
          { sides: 20, count: 1, rolls: [[9, 14]], kept: [14] },
          { sides: 4, count: 1, rolls: [[3]], kept: [3] },
        ],
        modifier: 2,
        advantage: 'adv',
        total: 19,
      }),
    )
    const onRolled = jest.fn()
    const { user } = useUser(<SurvivalCheck onRolled={onRolled} />)

    await user.click(screen.getByRole('button', { name: 'Add a d4' }))
    await user.click(screen.getByRole('button', { name: 'Advantage' }))
    await user.type(screen.getByLabelText('Bonus'), '2')
    await user.click(screen.getByRole('button', { name: 'Roll' }))

    expect(diceRollMock).toHaveBeenCalledWith({
      // the tray keeps dice in the order they were added
      pools: [
        { sides: 20, count: 1 },
        { sides: 4, count: 1 },
      ],
      modifier: 2,
      advantage: 'adv',
      exploding: false,
    })
    await waitFor(() =>
      expect(onRolled).toHaveBeenCalledWith(
        19,
        '1d20 adv (9/14 → 14) + 1d4 (3) + 2',
      ),
    )
  })
})
