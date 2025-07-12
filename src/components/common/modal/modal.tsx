'use client'

import { IconButton } from '../buttons'
import { CloseIcon } from '../icons/close'
import type { ModalProps } from './types'

export function Modal({
  children,
  isOpen,
  onClose,
  title,
  width = 'w-sm md:w-md',
}: Readonly<ModalProps>) {
  if (!isOpen) return

  return (
    <div className='fixed inset-0 flex items-center justify-center z-1200'>
      <summary
        className='absolute inset-0 bg-black opacity-75'
        data-testid='modal__backdrop'
        onClick={onClose}
      />
      <div
        data-testid='modal'
        className={`relative bg-paper rounded-lg max-w-2xl ${width} p-3 z-1000`}
      >
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold'>{title}</p>
          <IconButton color='transparent' Icon={CloseIcon} onClick={onClose} />
        </div>
        <div
          style={{ maxHeight: 'calc(100vh - 52px' }}
          className='max-h-["100vh_-_52px"] overflow-y-auto'
        >
          {children}
        </div>
      </div>
    </div>
  )
}
