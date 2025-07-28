import { RarityChip } from '../chips'
import { makeStyles } from './utils'
import type { MagicalIngredientProps } from './types'

export function MagicalIngredient(props: Readonly<MagicalIngredientProps>) {
  const { name, rarity, description } = props
  const styles = makeStyles(rarity)
  return (
    <div className={styles.wrapperClasses}>
      <div className='flex justify-between items-center'>
        <span className='font-semibold'>{name}</span>
        <RarityChip rarity={rarity} />
      </div>
      <p className='text-xs opacity-85 mt-1'>{description}</p>
    </div>
  )
}
