import { render, screen, useUser } from '@test-utils'
import { RaritySortSelect } from './rarity-sort-select'

describe('components/rarity-sort-select', () => {
  it('should show the current sort', () => {
    render(<RaritySortSelect value='rarest' onChange={jest.fn()} />)

    expect(screen.getByLabelText('Sort by rarity')).toHaveDisplayValue(
      'Rarest first',
    )
  })

  it('should report the chosen sort', async () => {
    const onChange = jest.fn()
    const { user } = useUser(
      <RaritySortSelect value='default' onChange={onChange} />,
    )

    await user.selectOptions(
      screen.getByLabelText('Sort by rarity'),
      'Most common first',
    )

    expect(onChange).toHaveBeenCalledWith('commonest')
  })
})
