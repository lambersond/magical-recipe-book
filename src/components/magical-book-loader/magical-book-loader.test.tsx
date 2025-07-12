import { render } from '@test-utils'
import { MagicalBookLoader } from './magical-book-loader'

describe('components/magical-book-loader', () => {
  it('matches snapshot', () => {
    const { container } = render(<MagicalBookLoader loadingText='Loading...' />)
    expect(container).toMatchSnapshot()
  })
})
