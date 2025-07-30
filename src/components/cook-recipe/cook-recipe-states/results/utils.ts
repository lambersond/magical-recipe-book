import clsx from 'classnames'
import type { CookingResult } from '../../types'

export function getStyles(type: CookingResult['type']) {
  const titleClasses = clsx(
    {
      'text-success bg-success/10': type === 'success',
      'text-danger bg-danger/10': type === 'failure',
    },
    'text-3xl font-semibold py-3 px-5 rounded-lg text-center',
  )
  return {
    titleClasses,
  }
}
