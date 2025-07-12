'use client'

import Image from 'next/image'
import { Menu, Popover } from '@/components/common'
import { IconButton } from '@/components/common/buttons'
import { AccountIcon, LogoutIcon } from '@/components/common/icons'
import { useAuth } from '@/hooks/use-auth'

export function Auth() {
  const { isAuthenticated, signIn, signOut, user } = useAuth()

  const options = [
    {
      label: 'Logout',
      onClick: () => signOut(),
      icon: <LogoutIcon className='size-6' />,
    },
  ]

  return (
    <>
      {isAuthenticated ? (
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
      ) : (
        <IconButton
          onClick={() => signIn('google')}
          Icon={AccountIcon}
          color='primary'
          size='lg'
          showBorder
          className=''
          text={<p className='text-xl mr-4 font-bold'>Login</p>}
        />
      )}
    </>
  )
}
