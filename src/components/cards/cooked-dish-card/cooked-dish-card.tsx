import { ActionButton } from './action-button'
import { BonusesList } from './bonuses-list'
import { StatusChip } from './status-chip'
import {
  deriveCookedDishCardProperties,
  getCookedStatusClasses,
  getDescriptionText,
} from './utils'
import { Card } from '@/components/common'
import type { CoookedDishCardProps } from './types'

export function CookedDishCard({
  currentDay,
  id,
  recipe,
  status,
  cookedOnDay,
  consumedOnDay,
  onConsume,
  onDiscard,
}: Readonly<CoookedDishCardProps>) {
  const descriptionText = getDescriptionText(recipe, status)
  const cookedDishStatusClasses = getCookedStatusClasses(status)
  const { isPrepared, isExpired } = deriveCookedDishCardProperties(
    currentDay,
    cookedOnDay,
    status,
  )

  const boons = recipe.magicalIngredients.map(
    ({ ingredient }) => ingredient.boon,
  )
  const banes = recipe.magicalIngredients.map(
    ({ ingredient }) => ingredient.bane,
  )

  const handleOnConsume = () => {
    onConsume(id)
  }
  const handleOnDiscard = () => {
    onDiscard(id)
  }

  return (
    <Card className='group'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-2xl font-semibold text-text-primary'>
            {recipe.name}
          </p>
          <span className='text-sm text-text-secondary flex gap-2 items-center'>
            <span className={cookedDishStatusClasses}>
              {consumedOnDay ? '' : 'consumed - '}
              {status}
            </span>
            <StatusChip
              cookedOnDay={cookedOnDay}
              consumedOnDay={consumedOnDay}
              currentDay={currentDay}
              isExpired={isExpired}
              isPrepared={isPrepared}
            />
          </span>
        </div>
        <div className='flex gap-2 items-center h-fit transition-opacity duration-200 lg:hidden lg:group-hover:flex'>
          {isPrepared && (
            <ActionButton type='consume' onClick={handleOnConsume} />
          )}
          <ActionButton type='discard' onClick={handleOnDiscard} />
        </div>
      </div>
      <span className='py-3 grid gap-2'>
        <p className='text-text-primary/90'>{descriptionText}</p>
        {isPrepared && !isExpired && (
          <p className='text-sm text-text-tertiary italic'>
            Read to consume - effects unknown until eaten
          </p>
        )}
      </span>
      {isExpired ? (
        <p className='text-text-tertiary text-sm italic mb-4'>
          Dish has spoiled and can no longer be consumed
        </p>
      ) : (
        <span className='flex flex-col mb-4'>
          <BonusesList
            bonuses={boons}
            show={status === 'boon' || isPrepared}
            type='boon'
            isPrepared={isPrepared}
          />
          <BonusesList
            bonuses={banes}
            show={status === 'bane' || isPrepared}
            type='bane'
            isPrepared={isPrepared}
          />
        </span>
      )}
      <p className='text-xs text-text-tertiary font-thin italic'>
        Cooked on Day {cookedOnDay}
      </p>
    </Card>
  )
}
