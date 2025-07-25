import { LogForagingResults } from '@/types'
import type { ModalProps } from '../types'

export interface GoForagingModalProps extends Omit<ModalProps, 'onClose'> {
  onSubmit(results: LogForagingResults): void
}
