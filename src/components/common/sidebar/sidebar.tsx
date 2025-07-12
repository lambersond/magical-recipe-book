'use client'

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { SidebarProps } from './types'

export function Sidebar({
  children,
  trigger,
  className = 'w-sm',
}: Readonly<SidebarProps>) {
  const [open, setOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const closeSidebar = () => {
    setOpen(false)
  }

  const handleTriggerClick = () => setOpen(o => !o)

  const triggerElement = cloneElement(
    trigger as React.ReactElement,
    {
      onClick: (e: React.MouseEvent) => {
        const originalOnClick = ((trigger as React.ReactElement).props as any)
          .onClick
        originalOnClick?.(e)
        handleTriggerClick()
      },
      'data-testid': 'sidebar__button',
    } as React.HTMLAttributes<HTMLButtonElement>,
  )

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

  return (
    <>
      {triggerElement}
      <div
        ref={sidebarRef}
        data-testid='sidebar'
        className={`fixed top-16 left-0 h-full bg-tertiary shadow-lg transform transition-transform ${className} ${open ? 'translate-x-0' : '-translate-x-full'} z-5000`}
      >
        <SidebarContext.Provider value={{ onClose: closeSidebar }}>
          {children}
        </SidebarContext.Provider>
      </div>
      {open && (
        <div
          data-testid='sidebar__overlay'
          className='fixed inset-0 bg-black/0 z-40'
          onClick={closeSidebar}
        />
      )}
    </>
  )
}

const SidebarContext = createContext<{
  onClose?: VoidFunction
}>({})

export const useSidebar = () => useContext(SidebarContext)
