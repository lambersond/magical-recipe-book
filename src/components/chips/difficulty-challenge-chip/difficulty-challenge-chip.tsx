import clsx from 'classnames'
import { getDCColor } from '@/utils/rarity'

export function DifficultyChallengeChip({
  difficulty,
}: {
  difficulty: number
}) {
  const dcTagClasses = clsx(
    'px-3 py-1 rounded-full text-sm font-semibold min-w-fit before:mr-0.5 sm:before:content-["DC"]',
    getDCColor(difficulty),
  )
  return <span className={dcTagClasses}>{difficulty}</span>
}
