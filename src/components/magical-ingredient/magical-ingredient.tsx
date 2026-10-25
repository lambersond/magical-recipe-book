import { RarityChip } from '../chips'
import { getStyles } from './utils'
import type { MagicalIngredientProps } from './types'

export function MagicalIngredient(props: Readonly<MagicalIngredientProps>) {
  const { name, rarity, description, count = 0 } = props
  const styles = getStyles(rarity)
  return (
    <div className={styles.containerClasses}>
      <div className='flex justify-between items-center'>
        <span className='font-semibold'>{name}</span>
        <RarityChip rarity={rarity} />
      </div>
      {count > 1 && (
        <p className='text-xs font-semibold mt-1'>You have {count}</p>
      )}
      <p className='text-xs opacity-85 mt-1'>{description}</p>
    </div>
  )
}
