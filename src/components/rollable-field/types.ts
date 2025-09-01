type RollResult = [number, string]
type ColorOption = 'primary' | 'secondary' | 'tertiary'

export type RollableFieldProps = {
  topLabel: string
  topLabelColor?: ColorOption
  bottomLabel?: string
  bottomLabelColor?: ColorOption
  number: number
  notation?: string
  onClick: (results: RollResult) => void
}
