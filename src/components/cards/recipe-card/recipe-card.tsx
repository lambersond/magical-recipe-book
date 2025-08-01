import clsx from 'classnames'
import { Card } from '@/components/common'
import { RecipeOld } from '@/types'
import { getDCColor } from '@/utils/rarity'

export function RecipeCard({ ...recipe }: Readonly<RecipeOld>) {
  const dcTagClasses = clsx(
    'px-3 py-1 rounded-full text-sm font-semibold',
    getDCColor(recipe.difficulty),
  )
  return (
    <Card>
      <div className='mb-4'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='text-xl font-bold text-text-primary flex-1'>
            {recipe.name}
          </h3>
          <div className={dcTagClasses}>DC {recipe.difficulty}</div>
        </div>
        <p className='text-text-secondary text-sm leading-relaxed'>
          {recipe.description}
        </p>
      </div>
      <div className='mb-6'>
        <h4 className='font-semibold text-text-secondary'>Ingredients</h4>
        <div className='text-sm text-text-secondary mb-1'>
          • Mundane:{' '}
          <span className='italic'>
            {recipe.mundaneIngredients.map(ingredient => ingredient).join(', ')}
          </span>
        </div>
        <div className='text-sm text-text-secondary'>
          • Magical:{' '}
          <span className='italic'>
            {recipe?.magicalIngredients?.map?.(i => i.name).join(', ')}
          </span>
        </div>
      </div>
      <div className='space-y-3'>
        <div className='bg-success/10 border-l-4 border-green-500 text-success p-4 rounded-lg'>
          <h5 className='font-semibold mb-2 flex items-center'>
            <span className='mr-2 text-3xl'>✨</span>
            Divine
          </h5>
          <p className='text-sm mb-2'>{recipe.boonText}</p>
          {!!recipe.magicalIngredients?.length && (
            <div className='border-t border-green-200 pt-2 mt-2'>
              <p className='text-xs font-medium mb-1'>Bonuses:</p>
              {recipe.magicalIngredients.map((i, index) => (
                <p key={index} className='text-xs'>
                  • {i.boon}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className='bg-error/10 border-l-4 border-red-500 text-error p-4 rounded-lg'>
          <h5 className='font-semibold mb-2 flex items-center'>
            <span className='mr-2 text-3xl'>💀</span>
            Disastrous
          </h5>
          <p className='text-sm mb-2'>{recipe.baneText}</p>
          {!!recipe.magicalIngredients?.length && (
            <div className='border-t pt-2 mt-2'>
              <p className='text-xs font-medium mb-1'>Ingredient Penalties:</p>
              {recipe.magicalIngredients.map((i, index) => (
                <p key={index} className='text-xs'>
                  • {i.bane}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
