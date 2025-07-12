'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSidebar } from '../common'

export function MenuSidebarLink({
  href,
  imgSrc,
  altText,
  text,
}: {
  href: string
  imgSrc: string
  altText: string
  text: string
}) {
  const { onClose } = useSidebar()
  return (
    <Link
      href={href}
      onClick={onClose}
      className='relative overflow-hidden rounded-r-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-h-12'
    >
      <Image
        width={380}
        height={48}
        src={imgSrc}
        alt={altText}
        loading='lazy'
        className='opacity-40 overflow-hidden hover:opacity-100 transition-opacity duration-300'
      />
      <p className='absolute top-0 left-0 w-full h-full rounded-r-lg flex items-center justify-center text-primary text-lg font-bold bg-black/50 transition-all duration-300 hover:text-white hover:opacity-70'>
        {text}
      </p>
    </Link>
  )
}
