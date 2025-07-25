'use client'

import Image from 'next/image'
import { useAuthOptions } from './use-options'
import { Menu, Popover } from '@/components/common'
import { AccountIcon } from '@/components/common/icons'

export function AuthOptions({
  user,
}: {
  user: { name: string; image?: string }
}) {
  const options = useAuthOptions()

  return (
    <Popover
      content={<Menu options={options} />}
      placement='bottom-end'
      asChild
    >
      <div className='flex items-center gap-4 cursor-pointer'>
        <p className='hidden md:block text-lg'>{user.name}</p>
        {user.image ? (
          <Image
            width={32}
            height={32}
            className='rounded-full'
            src={user.image}
            alt={user.name}
          />
        ) : (
          <AccountIcon className='size-10' />
        )}
      </div>
    </Popover>
  )
}
