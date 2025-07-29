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
          width={48}
          height={48}
          src={user.image || '/no-image.jpg'}
          fetchPriority='high'
          alt={user.name}
          className='cursor-pointer rounded-full max-h-12'
        />
      }
      className='w-full sm:w-sm shadow-xl'
    >
      <AccountSidebarContent email={user.email} />
    </Sidebar>
  )
}
