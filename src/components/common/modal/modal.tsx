'use client'

import { useRef, useEffect, useState } from 'react'
import clsx from 'classnames'
import { IconButton } from '../buttons'
import { CloseIcon } from '../icons/close'
import type { ModalProps } from './types'

export function Modal({
  children,
  headerClassName = '',
  isOpen,
  onClose,
  title,
  width = 'w-sm md:w-md',
}: Readonly<ModalProps>) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(52)

  useEffect(() => {
    if (!headerRef.current) return

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }

    updateHeaderHeight()

    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    resizeObserver.observe(headerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [isOpen, headerClassName])

  if (!isOpen) return

  const headerClassNames = clsx(
    'flex justify-between items-center p-3',
    headerClassName,
  )

  return (
    <div className='fixed inset-0 flex items-center justify-center z-1200'>
      <summary
        className='absolute inset-0 bg-black opacity-75'
        data-testid='modal__backdrop'
        onClick={onClose}
      />
      <div
        data-testid='modal'
        className={`relative bg-paper max-w-2xl ${width} z-1000 overflow-hidden shadow-lg h-full min-w-full sm:min-w-sm  sm:rounded-xl sm:h-fit`}
      >
        <div className={headerClassNames} ref={headerRef}>
          <p className='text-2xl font-bold'>{title}</p>
          <IconButton color='transparent' Icon={CloseIcon} onClick={onClose} />
        </div>
        <div
          style={{
            maxHeight: `calc(100vh - ${headerHeight}px)`,
          }}
          className='overflow-y-auto p-3'
        >
          {children}
        </div>
      </div>
    </div>
  )
}
