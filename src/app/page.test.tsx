import { render } from '@test-utils'
import HomePage from './page'

jest.mock('@/clients/auth-client', () => ({
  signInWithGoogle: jest.fn(),
}))

describe('app/page', () => {
  it.skip('should render page', async () => {
    const { asFragment } = render(<HomePage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
