'use client'

import { LogIn } from 'lucide-react'
import { AccountSidebar } from '@/components/sidebars/account-sidebar'
import { useAuth } from '@/hooks/use-auth'

export function Auth() {
  const { isAuthenticated, signIn, user } = useAuth()

  if (!isAuthenticated) {
    return (
      <button
        className='px-6 py-2 bg-secondary/80 hover:bg-secondary rounded-2xl text-text-primary text-xl font-semibold flex gap-2 items-center cursor-pointer'
        onClick={() => signIn('google')}
      >
        Sign In
        <LogIn className='size-6' />
      </button>
    )
  }

  return <AccountSidebar user={user} />
}
