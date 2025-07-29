'use client'

import { IconButton } from '@/components/common/buttons'
import { AccountIcon } from '@/components/common/icons'
import { AccountSidebar } from '@/components/sidebars/account-sidebar'
import { useAuth } from '@/hooks/use-auth'

export function Auth() {
  const { isAuthenticated, signIn, user } = useAuth()

  if (!isAuthenticated) {
    return (
      <IconButton
        onClick={() => signIn('google')}
        Icon={AccountIcon}
        color='primary'
        size='lg'
        showBorder
        className=''
        text={<p className='text-xl mr-4 font-bold'>Login</p>}
      />
    )
  }

  return <AccountSidebar user={user} />
}
