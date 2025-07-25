'use client'

import { AuthOptions } from './auth-options'
import { IconButton } from '@/components/common/buttons'
import { AccountIcon } from '@/components/common/icons'
import { useAuth } from '@/hooks/use-auth'

export function Auth() {
  const { isAuthenticated, signIn, user, isEnabled, status } = useAuth()

  if (!isEnabled || status === 'loading') {
    return
  }

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

  return <AuthOptions user={user} />
}
