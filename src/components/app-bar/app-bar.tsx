import { MenuSidebar } from '../sidebars/menu-sidebar'
import { Auth } from './auth'

export function AppBar() {
  return (
    <nav className='flex items-center justify-between max-w-screen bg-appbar p-2 py-3 md:p-6 h-16'>
      <MenuSidebar />
      <Auth />
    </nav>
  )
}
