import { render } from '@test-utils'
import { MagicalForagingEntryCard } from './magical-foraging-entry-card'
import { RARITY_LABELS } from '@/constants/rarity'

describe('components/cards/magical-foraging-entry-card', () => {
  it('renders with default props', () => {
    const { getByText } = render(<MagicalForagingEntryCard day={1} />)

    expect(getByText('Free Range Air')).toBeInTheDocument()
    expect(getByText('Day 1')).toBeInTheDocument()
    expect(getByText(RARITY_LABELS.common)).toBeInTheDocument()
    expect(getByText('Available')).toBeInTheDocument()
  })

  it('renders with custom found item', () => {
    const { getByText } = render(
      <MagicalForagingEntryCard day={2} found='Magical Mushroom' />,
    )

    expect(getByText('Magical Mushroom')).toBeInTheDocument()
  })

  it('renders with expired status', () => {
    const { getByText } = render(
      <MagicalForagingEntryCard day={5} isExpired={true} />,
    )

    expect(getByText('Expired')).toBeInTheDocument()
  })

  it('renders with used status', () => {
    const { getByText } = render(
      <MagicalForagingEntryCard day={6} isUsed={true} />,
    )

    expect(getByText('Used')).toBeInTheDocument()
  })

  it('prioritizes used status over expired status', () => {
    const { getByText, queryByText } = render(
      <MagicalForagingEntryCard day={7} isExpired={true} isUsed={true} />,
    )

    expect(getByText('Used')).toBeInTheDocument()
    expect(queryByText('Expired')).not.toBeInTheDocument()
  })
})
