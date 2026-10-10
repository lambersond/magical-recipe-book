import { render, screen } from '@test-utils'
import { CircularLoader } from './circular-loader'

describe('components/common/loaders/circular-loader', () => {
  it('should announce its label', () => {
    render(<CircularLoader label='Loading recipes' />)

    expect(screen.getByLabelText('Loading recipes')).toBeInTheDocument()
  })

  it('should size the spinner', () => {
    render(<CircularLoader size='lg' />)

    expect(screen.getByLabelText('Loading…')).toHaveClass('h-12', 'w-12')
  })
})
