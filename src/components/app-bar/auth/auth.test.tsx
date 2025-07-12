import { render } from '@test-utils'
import { Auth } from './auth'

const mockUseAuth = jest.fn()

jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => mockUseAuth(),
}))

describe('components/app-bar/auth', () => {
  it('should render login button if not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isEnabled: true,
      isAuthenticated: false,
      signIn: jest.fn(),
      user: { name: 'Guest' },
    })

    const { getByTestId, getByText } = render(<Auth />)

    expect(getByText('Login')).toBeInTheDocument()
    expect(getByTestId('AccountIcon')).toBeInTheDocument()
  })

  it('should render logout button if authenticated', () => {
    mockUseAuth.mockReturnValue({
      isEnabled: true,
      isAuthenticated: true,
      signOut: jest.fn(),
      user: { name: 'User' },
    })

    const { getByText, getByTestId } = render(<Auth />)

    expect(getByText('User')).toBeInTheDocument()
    expect(getByTestId('AccountIcon')).toBeInTheDocument()
  })
})
