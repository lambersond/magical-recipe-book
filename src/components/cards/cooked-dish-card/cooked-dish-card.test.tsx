import { render, screen, useUser } from '@test-utils'
import { CookedDishCard } from './cooked-dish-card'
import type { CookedDishStatus } from '@/types'

const recipe = {
  name: 'Ember Stew',
  description: 'A warming stew.',
  difficulty: 14,
  boonText: 'The stew sings.',
  baneText: 'The stew sulks.',
  magicalIngredients: [
    {
      ingredient: {
        name: 'Snowmilk',
        boon: 'Resistance to cold damage.',
        bane: 'Vulnerability to cold damage.',
      },
    },
  ],
}

function card({
  status = 'boon' as CookedDishStatus,
  currentDay = 3,
  sentAt = undefined as string | undefined,
  onSend = jest.fn(),
  isSendingOn = true,
  isSending = false,
} = {}) {
  return (
    <CookedDishCard
      id='dish-1'
      status={status}
      cookedOnDay={3}
      // eslint-disable-next-line unicorn/no-null
      consumedOnDay={status === 'prepared' ? null : 3}
      sentAt={sentAt}
      recipe={recipe}
      currentDay={currentDay}
      onConsume={jest.fn()}
      onDiscard={jest.fn()}
      onSend={isSendingOn ? onSend : undefined}
      isSending={isSending}
    />
  )
}

const sendButton = () =>
  screen.queryByRole('button', { name: 'Send to Foundry' })

describe('components/cards/cooked-dish-card', () => {
  it.each(['boon', 'bane', 'success', 'failure'] as const)(
    'should offer to send an eaten %s dish',
    status => {
      render(card({ status }))

      expect(sendButton()).toBeInTheDocument()
    },
  )

  it('should send the dish', async () => {
    const onSend = jest.fn()
    const { user } = useUser(card({ onSend }))

    await user.click(sendButton()!)

    expect(onSend).toHaveBeenCalledWith('dish-1')
  })

  it('should hold the button while the dish is sending', () => {
    render(card({ isSending: true }))

    expect(sendButton()).toBeDisabled()
  })

  it.each([
    ['sending is off', { isSendingOn: false }],
    ['the dish is only prepared', { status: 'prepared' as const }],
    ['the dish has spoiled', { currentDay: 11 }],
    ['the dish was sent', { sentAt: '2026-10-24T12:00:00.000Z' }],
  ])('should not offer to send when %s', (_, props) => {
    render(card(props))

    expect(sendButton()).not.toBeInTheDocument()
  })

  it('should say when the dish was sent', () => {
    render(card({ sentAt: '2026-10-24T12:00:00.000Z' }))

    expect(screen.getByText('sent to Foundry')).toBeInTheDocument()
  })
})
