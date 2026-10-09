import type { RollResult } from '@lambersond/3d-dice-core'

type ColorOption = 'primary' | 'secondary' | 'tertiary'

export type RollableFieldProps = {
  topLabel: string
  topLabelColor?: ColorOption
  bottomLabel?: string
  bottomLabelColor?: ColorOption
  number: number
  notation?: string
  onClick: (result: RollResult) => void
}
