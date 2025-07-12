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
    <div className='min-h-screen flex flex-col'>
      <SessionProvider>
        <ModalProvider>
          <header className='sticky top-0 shadow-md'>
            <AppBar />
          </header>
          {children}
        </ModalProvider>
      </SessionProvider>
    </div>
  )
}
