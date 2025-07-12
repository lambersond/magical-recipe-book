import Image from 'next/image'
import { Menu, Popover } from '@/components/common'
import { CogIcon } from '@/components/common/icons/cog'

export function Options() {
  const options = [
    {
      key: 'general',
      showHeader: false,
      options: [
        {
          label: 'Mechanics',
          icon: <CogIcon className='size-6' />,
          onClick: () => console.warn('Go To Mechanics Page'),
        },
      ],
    },
  ]
  return (
    <Popover
      content={<Menu options={options} />}
      placement='bottom-start'
      asChild
    >
      <div className='flex items-center gap-4 cursor-pointer'>
        <Image width={48} height={48} src='/logo.png' alt='logo' />
      </div>
    </Popover>
  )
}
