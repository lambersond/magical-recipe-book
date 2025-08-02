import { BonusesListClasses } from './types'
import { bonusesListClasses } from './utils'

export function BonusesList({
  bonuses,
  isPrepared,
  show = false,
  type,
}: Readonly<BonusesListClasses>) {
  if (!show) return

  const styles = bonusesListClasses(isPrepared, type)

  return (
    <div className={styles.containerClasses}>
      <p className={styles.titleClasses}>{type}s:</p>
      <ul className='list-disc text-text-primary pl-7 mb-2'>
        {bonuses.map((bonus, index) => (
          <li key={index} className={styles.itemClasses}>
            {bonus}
          </li>
        ))}
      </ul>
    </div>
  )
}
