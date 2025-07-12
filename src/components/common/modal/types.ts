import type { ReactNode } from 'react'

export type ModalProps = {
  children: ReactNode
  title: string
  isOpen: boolean
  onClose: VoidFunction
  width?: string
}
