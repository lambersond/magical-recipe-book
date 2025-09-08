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
          <footer className='py-4 text-sm text-text-secondary/50 text-center mt-auto bg-page z-10 flex gap-1 justify-center'>
            <p>Adventurer&apos;s Cookbook</p>
            <p>•</p>
            <Link href='/roadmap' className='text-link hover:underline'>
              Roadmap
            </Link>
            <p className='hidden'>•</p>
            <Link
              href='https://feedback.cookbook.illagria.com'
              className='text-link hover:underline hidden'
            >
              Feedback
            </Link>
          </footer>
        </ModalProvider>
      </SessionProvider>
    </div>
  )
}
