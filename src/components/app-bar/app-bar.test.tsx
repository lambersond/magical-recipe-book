import { render } from '@test-utils'
import { AppBar } from './app-bar'

jest.mock('./auth', () => ({
  Auth: () => <div>Auth Component</div>,
}))

describe('components/app-bar', () => {
  it('should should match snapshot', () => {
    expect(render(<AppBar />).asFragment()).toMatchSnapshot()
  })

  it('should go to home page when clicked', () => {
    const { getByTestId } = render(<AppBar />)
    const link = getByTestId('app-bar__home-link')
    expect(link).toHaveAttribute('href', '/')
  })
})
