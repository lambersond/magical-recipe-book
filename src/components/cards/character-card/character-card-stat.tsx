import { characterCardStatStyles } from './utils'
import type { CharacterCardStatProps } from './types'

export function CharacterCardStat({
  icon,
  label,
  sublabel,
  value,
  details = 'full',
}: Readonly<CharacterCardStatProps>) {
  const hidden = details === 'lite'
  const styles = characterCardStatStyles(details)

  return (
    <div className={styles.containerClasses}>
      <div className='flex items-center gap-2 text-lg font-thin uppercase text-text-secondary'>
        <span>{icon}</span>
        {!hidden && <p>{label}</p>}
      </div>
      <p className={styles.valueClasses}>{value}</p>
      {!hidden && <p className='text-text-secondary text-sm'>{sublabel}</p>}
    </div>
  )
}
