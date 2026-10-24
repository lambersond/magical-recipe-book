import { screen, useUser, waitFor } from '@test-utils'
import { AccountSidebarContent } from './account-sidebar-content'
import { authClient } from '@/clients/auth-client'

const router = { push: jest.fn(), refresh: jest.fn() }

jest.mock('next/navigation', () => ({ useRouter: () => router }))
jest.mock('@/clients/auth-client', () => ({
  authClient: { signOut: jest.fn() },
}))
jest.mock('./use-account-data', () => ({
  useAccountData: () => ({ characters: [] }),
}))
jest.mock('@/components/cards', () => ({
  CharacterCard: () => <div />,
  NewCharacterCard: () => <div />,
}))
jest.mock('@/components/common', () => ({
  SidebarItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

describe('components/sidebars/account-sidebar/account-sidebar-content', () => {
  it('should sign out and go home', async () => {
    jest.mocked(authClient.signOut).mockResolvedValue({} as any)
    const { user } = useUser(<AccountSidebarContent email='a@b.c' />)

    await user.click(screen.getByRole('button', { name: 'Sign Out' }))

    expect(authClient.signOut).toHaveBeenCalled()
    await waitFor(() => expect(router.push).toHaveBeenCalledWith('/'))
    expect(router.refresh).toHaveBeenCalled()
  })
})
