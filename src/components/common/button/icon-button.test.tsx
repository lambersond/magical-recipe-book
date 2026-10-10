import { render, screen, useUser } from '@test-utils'
import { Check, Copy } from 'lucide-react'
import { IconButton } from './icon-button'

describe('components/common/button/icon-button', () => {
  it('should call onClick when clicked', async () => {
    const onClick = jest.fn()
    const { user } = useUser(<IconButton icon={Copy} onClick={onClick} />)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should show its tooltip on hover', async () => {
    const { user } = useUser(<IconButton icon={Copy} tooltip='Copy link' />)

    await user.hover(screen.getByRole('button'))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Copy link')
  })

  it('should swap to the action icon once the click resolves', async () => {
    const { user, container } = useUser(
      <IconButton icon={Copy} actionIcon={Check} tooltip='Copy' />,
    )
    expect(container.querySelector('.lucide-copy')).toBeInTheDocument()

    await user.click(screen.getByRole('button'))

    expect(container.querySelector('.lucide-check')).toBeInTheDocument()
  })

  it('should apply the intent color', () => {
    render(<IconButton icon={Copy} intent='danger' />)

    expect(screen.getByRole('button')).toHaveClass('text-danger')
  })
})
