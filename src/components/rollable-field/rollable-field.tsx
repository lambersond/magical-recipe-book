'use client'

import { parseRollExpression } from '@lambersond/3d-dice-core'
import { getStyles } from './utils'
import { useDice } from '@/hooks/dice'
import type { RollableFieldProps } from './types'

export function RollableField({
  topLabel,
  topLabelColor = 'primary',
  bottomLabel,
  bottomLabelColor = 'secondary',
  number,
  notation = '1d20',
  onClick,
}: Readonly<RollableFieldProps>) {
  const { roll } = useDice()
  const styles = getStyles({ topLabelColor, bottomLabelColor, number })

  const handleClick = async () => {
    const parsed = parseRollExpression(notation)
    if (!parsed.ok) {
      throw new Error(`Invalid roll notation "${notation}": ${parsed.error}`)
    }
    const result = await roll({
      ...parsed.request,
      modifier: parsed.request.modifier + number,
    })
    onClick(result)
  }

  return (
    <div className='flex flex-col items-center space-y-1 w-fit'>
      <span className={styles.topLabelClasses}>{topLabel}</span>
      <button className={styles.numberClasses} onClick={handleClick}>
        {Math.abs(number)}
      </button>
      <span className={styles.bottomLabelClasses}>{bottomLabel}</span>
    </div>
  )
}
