'use client'

import { getStyles } from './utils'
import { useDice } from '@/hooks/dice'
import { processDiceExpression } from '@/utils/dice'
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
    const processor = processDiceExpression(`${notation} + ${number}`)
    const rollResults = await roll(processor.dicePatterns)
    const results = processor.calculate(rollResults)
    onClick(results)
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
