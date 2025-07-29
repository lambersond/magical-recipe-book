'use client'

import Image from 'next/image'
import { AccountSidebarContent } from './account-sidebar-content'
import { Sidebar } from '@/components/common'

export function AccountSidebar({
  user,
}: {
  user: { name: string; image?: string; email: string }
}) {
  return (
    <Sidebar
      side='right'
      trigger={
        <Image
          width={40}
          height={40}
          src={user.image || '/logo.png'}
          alt={user.name}
          className='cursor-pointer rounded-full'
        />
      }
      className='w-full sm:w-sm'
    >
      <AccountSidebarContent email={user.email} />
    </Sidebar>
  )
}
