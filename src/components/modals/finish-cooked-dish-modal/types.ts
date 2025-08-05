import type { ModalProps } from '../types'
import type { CookedDish } from '@/types'

export interface FinishCookedDishModalProps
  extends Omit<ModalProps, 'onClose'> {
  characterId: string
  cookedDish: CookedDish
  onCook: (data: CookedDish) => void
}
