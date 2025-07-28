'use client'

import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'
import { AppBar } from '../app-bar'
import { ModalProvider } from '../modals/modal-provider'

export function SessionWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <SessionProvider>
        <ModalProvider>
          <header className='min-w-screen fixed top-0 shadow-md z-[1100]'>
            <AppBar />
          </header>
          <div className='h-16 w-screen' />
          <div className='flex flex-col items-center'>{children}</div>
          <footer className='py-4 text-sm text-text-secondary/50 text-center mt-auto bg-page z-10'>
            Adventurer&apos;s Cookbook © 2025 • Built for those who like to eat
            well and adventurer •{' '}
            <Link href='/roadmap' className='text-link hover:underline'>
              Roadmap
            </Link>
          </footer>
        </ModalProvider>
      </SessionProvider>
    </div>
  )
}
