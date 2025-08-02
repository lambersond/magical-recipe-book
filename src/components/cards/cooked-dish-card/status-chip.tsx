import { deriveStatusChipDetails } from './utils'

export function StatusChip({
  cookedOnDay,
  consumedOnDay,
  currentDay,
  isExpired,
  isPrepared,
}: {
  cookedOnDay: number
  consumedOnDay: number | null
  currentDay: number
  isExpired: boolean
  isPrepared: boolean
}) {
  const { text, value, containerClasses } = deriveStatusChipDetails(
    isExpired,
    isPrepared,
    cookedOnDay,
    consumedOnDay,
    currentDay,
  )

  if (!text) return

  return (
    <span className={containerClasses}>
      <span>
        {text} {value}
      </span>
    </span>
  )
}
