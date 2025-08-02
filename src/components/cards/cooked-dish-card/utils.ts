import clsx from 'classnames'
import type { CookedDishRecipe, CookedDishStatus } from '@/types'

export function bonusesListClasses(isPrepared: boolean, type: 'boon' | 'bane') {
  const containerClasses = clsx('border-l-2 pl-2 py-2 rounded-l-lg', {
    'border-success bg-success/10': type === 'boon',
    'border-danger bg-danger/10': type === 'bane',
  })

  const titleClasses = clsx(
    {
      'text-success/80': type === 'boon',
      'text-danger/80': type === 'bane',
      'before:content-["Potential"] flex gap-1': isPrepared,
    },
    'font-semibold capitalize',
  )

  const itemClasses = clsx(
    {
      'text-success/80': type === 'boon',
      'text-danger/80': type === 'bane',
    },
    'text-sm',
  )

  return {
    containerClasses,
    itemClasses,
    titleClasses,
  }
}

export function deriveStatusChipDetails(
  isExpired: boolean,
  isPrepared: boolean,
  cookedOnDay: number,
  consumedOnDay: number | null,
  currentDay: number,
) {
  let text = ''
  let value = ''
  let chipClasses = ''

  if (isExpired) {
    text = 'Spoiled on Day'
    value = (cookedOnDay + 7).toString()
    chipClasses = 'before:content-["💀"] bg-danger/10 text-danger'
  } else if (isPrepared) {
    const daysRemaining = 7 - (currentDay - cookedOnDay)
    text = 'Expires '
    value =
      daysRemaining === 0
        ? 'Today!'
        : `in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`
    chipClasses = clsx('before:content-["⏰"]', {
      'bg-danger/10 text-danger': daysRemaining <= 1,
      'bg-warning/10 text-warning': daysRemaining > 1 && daysRemaining <= 3,
      'bg-success/10 text-success': daysRemaining > 3,
    })
  } else if (consumedOnDay) {
    text = 'Consumed on Day'
    value = consumedOnDay.toString()
    chipClasses = 'before:content-["🍴"] bg-info/10 text-info'
  }

  const containerClasses = clsx(
    'px-3 py-1 rounded-full text-sm flex items-center before:mr-1',
    chipClasses,
  )

  return {
    text,
    value,
    containerClasses,
  }
}

export function actionButtonClasses(type: 'consume' | 'discard') {
  return clsx(
    'px-3 py-1 text-lg font-semibold rounded items-center transition-colors flex items-center gap-1 cursor-pointer',
    {
      'bg-success/80 hover:bg-success text-text-primary md:after:content-["Consume"]':
        type === 'consume',
      'bg-danger/80 hover:bg-danger text-text-primary md:after:content-["Discard"]':
        type === 'discard',
    },
  )
}

export function deriveCookedDishCardProperties(
  currentDay: number,
  cookedOnDay: number,
  status: CookedDishStatus,
) {
  const isPrepared = status === 'prepared'
  const isExpired = currentDay > cookedOnDay + 7

  return {
    isPrepared,
    isExpired,
  }
}

export function getDescriptionText(
  recipe: CookedDishRecipe,
  status: CookedDishStatus,
) {
  if (['boon', 'bane'].includes(status)) {
    return recipe[`${status as 'boon' | 'bane'}Text`]
  }

  return recipe.description
}

export function getCookedStatusClasses(status: CookedDishStatus) {
  return clsx(
    {
      'before:content-["🍽️"]': status === 'prepared',
      'before:content-["✨"]': status === 'boon',
      'before:content-["🤤"]': status === 'success',
      'before:content-["🤢"]': status === 'failure',
      'before:content-["💀"]': status === 'bane',
    },
    'flex gap-1 bg-gray-700 text-text-secondary text-sm rounded-full py-1 px-3 capitalize',
  )
}
