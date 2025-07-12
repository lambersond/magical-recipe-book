import { render } from '@test-utils'
import HomePage from './page'

describe('app/page', () => {
  it.skip('should render page', async () => {
    const { asFragment } = render(<HomePage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
