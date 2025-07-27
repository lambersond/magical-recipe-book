import { render } from '@test-utils'
import HomePage from './page'

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

describe('app/page', () => {
  it.skip('should render page', async () => {
    const { asFragment } = render(<HomePage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
