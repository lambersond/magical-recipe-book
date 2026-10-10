import { screen, useUser, waitFor } from '@test-utils'
import { RaritySortMenu } from './rarity-sort-menu'

const trigger = () => screen.getByRole('button', { name: 'Sort by rarity' })

describe('components/rarity-sort-menu', () => {
  it('should open the sort options from the icon button', async () => {
    const { user } = useUser(
      <RaritySortMenu value='default' onChange={jest.fn()} />,
    )
    expect(screen.queryByText('Rarest first')).not.toBeInTheDocument()

    await user.click(trigger())

    expect(
      screen.getByRole('button', { name: 'Default order' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rarest first' })).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Most common first' }),
    ).toBeVisible()
  })

  it('should mark the current sort', async () => {
    const { user } = useUser(
      <RaritySortMenu value='rarest' onChange={jest.fn()} />,
    )

    await user.click(trigger())

    const current = screen.getByRole('button', { name: 'Rarest first' })
    expect(current.querySelector('.lucide-check')).toBeInTheDocument()
    expect(
      screen
        .getByRole('button', { name: 'Default order' })
        .querySelector('.lucide-check'),
    ).not.toBeInTheDocument()
  })

  it('should report the chosen sort and close', async () => {
    const onChange = jest.fn()
    const { user } = useUser(
      <RaritySortMenu value='default' onChange={onChange} />,
    )

    await user.click(trigger())
    await user.click(screen.getByRole('button', { name: 'Most common first' }))

    expect(onChange).toHaveBeenCalledWith('commonest')
    await waitFor(() =>
      expect(screen.queryByText('Most common first')).not.toBeInTheDocument(),
    )
  })

  it('should highlight the icon while sorted', () => {
    useUser(<RaritySortMenu value='rarest' onChange={jest.fn()} />)

    expect(trigger()).toHaveClass('text-primary')
  })
})
