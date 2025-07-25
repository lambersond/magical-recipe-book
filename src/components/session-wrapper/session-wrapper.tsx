'use client'

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
          <header className='min-w-screen fixed top-0 shadow-md z-[10000]'>
            <AppBar />
          </header>
          <div className='h-16 w-screen' />
          {children}
        </ModalProvider>
      </SessionProvider>
    </div>
  )
}
