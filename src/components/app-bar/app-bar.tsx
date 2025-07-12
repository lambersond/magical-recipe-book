import Link from 'next/link'
import { MenuSidebar } from '../menu-sidebar'
import { Auth } from './auth'

export function AppBar() {
  return (
    <nav className='flex items-center justify-between max-w-screen bg-appbar p-2 py-3 md:p-6 h-16'>
      <div className='flex items-center flex-shrink-0 text-white md:-ml-3 gap-2'>
        <MenuSidebar />
        <Link
          href='/'
          data-testid='app-bar__home-link'
          className='hidden md:block text-4xl italic'
        >
          The Adventurer&apos;s Cookbook
        </Link>
      </div>
      <Auth />
    </nav>
  )
}
