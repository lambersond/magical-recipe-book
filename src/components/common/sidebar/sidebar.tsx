'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { SidebarTrigger } from './sidebar-trigger'
import type { SidebarProps } from './types'

export function Sidebar({
  children,
  trigger,
  className = 'w-sm',
  side = 'left',
}: Readonly<SidebarProps>) {
  const [open, setOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const closeSidebar = () => {
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const sideClasses = {
    left: {
      position: 'left-0',
      transform: open ? 'translate-x-0' : '-translate-x-full',
    },
    right: {
      position: 'right-0',
      transform: open ? 'translate-x-0' : 'translate-x-full',
    },
  }

  const currentSide = sideClasses[side]

  return (
    <>
      <SidebarTrigger setOpen={setOpen} trigger={trigger} />
      <div
        ref={sidebarRef}
        data-testid='sidebar'
        className={`fixed top-16 h-full bg-card shadow-lg transform transition-transform z-50 ${currentSide.position} ${currentSide.transform} ${className}`}
      >
        <SidebarContext.Provider
          value={{ onClose: closeSidebar, side, isOpen: open }}
        >
          {children}
        </SidebarContext.Provider>
      </div>
      {open && (
        <div
          data-testid='sidebar__overlay'
          className='fixed inset-0 bg-black/01 z-40'
          onClick={closeSidebar}
        />
      )}
    </>
  )
}

const SidebarContext = createContext<{
  onClose?: VoidFunction
  side?: 'left' | 'right'
  isOpen?: boolean
}>({ isOpen: false })

export const useSidebar = () => useContext(SidebarContext)
