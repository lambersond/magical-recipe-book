import type { ReactNode } from 'react'

export type ModalProps = {
  children: ReactNode
  headerClassName?: string
  title: string
  isOpen: boolean
  onClose: VoidFunction
  width?: string
}
